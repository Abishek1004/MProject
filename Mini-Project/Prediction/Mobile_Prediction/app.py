from flask import Flask, request, jsonify
from src.predict import predict_price

from PIL import Image
import io
import numpy as np
import cv2

# Pretrained detector for presence check.
# Uses pretrained YOLO weights (no training needed for this validation).
from ultralytics import YOLO

app = Flask(__name__)

_yolo = YOLO("yolov8n.pt")
_names = _yolo.model.names if hasattr(_yolo, "model") and hasattr(_yolo.model, "names") else _yolo.names
# YOLO class IDs we accept as "device-like"
# - "cell phone" covers mobile
# - "laptop" is used as a proxy for tablet images (YOLO commonly detects tablets as laptops)
# - "tv" is used as a proxy for phone screen close-ups (YOLO often maps screens to "tv")
_allowed_ids = set()
_allowed_labels = {"cell phone", "cellphone", "laptop", "tv"}
for k, v in _names.items():
    label = str(v).strip().lower()
    if label in _allowed_labels:
        _allowed_ids.add(int(k))


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    price = predict_price(data)

    return jsonify({
        "predicted_price": price
    })


@app.route("/predict-image", methods=["POST"])
def predict_image():
    if "image" not in request.files:
        return jsonify({"is_phone": False, "confidence": 0.0, "error": "image missing"}), 400

    file = request.files["image"]
    if not file or not file.filename:
        return jsonify({"is_phone": False, "confidence": 0.0, "error": "empty file"}), 400

    # Load image bytes
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    # Detect phone/tablet-like object.
    # Increase robustness for close-ups (cracked screens) by:
    # - lowering detection cutoff
    # - increasing inference image size
    detect_conf_threshold = 0.05
    accept_conf_threshold = 0.05
    results = _yolo.predict(
        source=np.array(img),
        conf=detect_conf_threshold,
        imgsz=960,
        verbose=False,
    )
    is_phone = False
    best_conf = 0.0

    if results and len(results) > 0:
        r = results[0]
        if r.boxes is not None and len(r.boxes) > 0 and len(_allowed_ids) > 0:
            for cls, conf in zip(r.boxes.cls, r.boxes.conf):
                cls_id = int(cls.item())
                conf_val = float(conf.item())
                if cls_id in _allowed_ids:
                    best_conf = max(best_conf, conf_val)

    # Decide using the best allowed-class confidence first.
    is_phone = best_conf >= accept_conf_threshold
    method = "yolo" if is_phone else "none"

    # Fallback heuristic:
    # If YOLO does not find allowed classes (common for close-up/cropping or stylized images),
    # try to detect a large rectangular phone-like region using edges/contours.
    # This increases acceptance for cracked-screen images.
    if not is_phone:
        try:
            img_np = np.array(img)
            gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
            gray = cv2.GaussianBlur(gray, (5, 5), 0)
            edges = cv2.Canny(gray, 30, 120)

            # Dilate edges to connect fragmented lines (helps for cracks).
            kernel = np.ones((3, 3), np.uint8)
            edges = cv2.dilate(edges, kernel, iterations=1)

            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            h, w = gray.shape[:2]
            img_area = float(h * w) if (h and w) else 1.0

            best_rect_score = 0.0
            for cnt in contours:
                area = cv2.contourArea(cnt)
                if area <= 0:
                    continue

                area_ratio = area / img_area
                if area_ratio < 0.03:  # must cover some meaningful part of image
                    continue

                # Use rotated rectangle fit to handle stylized/tilted phone images.
                rect = cv2.minAreaRect(cnt)  # ((cx, cy), (rw, rh), angle)
                (_, _), (rw, rh), _ = rect
                if rw <= 0 or rh <= 0:
                    continue

                aspect = rw / float(rh) if rh > 0 else 0.0
                if aspect < 0.35 or aspect > 2.8:
                    continue

                cx, cy = rect[0]
                center_dx = abs(cx - (w / 2.0)) / (w / 2.0)
                center_dy = abs(cy - (h / 2.0)) / (h / 2.0)
                if not (center_dx < 0.45 and center_dy < 0.45):
                    continue

                # Score by area ratio (simpler + robust)
                best_rect_score = max(best_rect_score, area_ratio)

            # If we found a plausible phone-like rectangle, accept it.
            if best_rect_score > 0.05:
                is_phone = True
                # Provide a synthetic confidence so UI can still show a number.
                best_conf = max(best_conf, 0.20)
                method = "heuristic"
        except Exception:
            # If heuristic fails, keep YOLO result (false)
            pass
    return jsonify({"is_phone": bool(is_phone), "confidence": float(best_conf), "method": method})

if __name__ == "__main__":
    app.run(port=5001, debug=True)