"""
Image Prediction Flask Backend
-------------------------------
Endpoint: POST /predict-image
  - Accepts a multipart/form-data file field named 'image'
  - Runs YOLO detection to check if the image contains a mobile phone
  - Returns JSON: { "is_phone": bool, "confidence": float, "method": "yolo", "status": str }

YOLO Classes (from training):
  cls 0 → Mobile phone (intact)
  cls 1 → Cracked screen

Run:
  python app.py
The server starts on http://localhost:5000
"""

import os
import uuid
import tempfile

from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

# ─── App Setup ────────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the React frontend

# ─── Load YOLO Model ──────────────────────────────────────
# Path is relative to this script's directory.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "runs", "detect", "train", "weights", "best.pt")

print(f"[INFO] Loading YOLO model from: {MODEL_PATH}")
try:
    model = YOLO(MODEL_PATH)
    print("[INFO] Model loaded successfully.")
except Exception as e:
    print(f"[ERROR] Failed to load YOLO model: {e}")
    model = None


# ─── Helper ───────────────────────────────────────────────
def run_yolo_prediction(image_path: str) -> dict:
    """
    Run YOLO on the given image path.
    Returns a dict with is_phone, confidence, status, method.
    """
    results = model(image_path, verbose=False)
    boxes = results[0].boxes

    if len(boxes) == 0:
        return {
            "is_phone": False,
            "confidence": 0.0,
            "status": "No mobile detected",
            "method": "yolo",
        }

    # Find the detection with the highest confidence
    best_conf = 0.0
    best_cls = -1
    for box in boxes:
        conf = float(box.conf[0])
        cls  = int(box.cls[0])
        if conf > best_conf:
            best_conf = conf
            best_cls  = cls

    # cls 0 = intact phone, cls 1 = cracked screen
    if best_cls == 1:
        status = "Cracked screen detected"
    else:
        status = "Mobile detected"

    return {
        "is_phone": True,
        "confidence": round(best_conf, 4),
        "status": status,
        "method": "yolo",
    }


# ─── Routes ───────────────────────────────────────────────
@app.route("/predict-image", methods=["POST"])
def predict_image():
    """
    POST /predict-image
    Expects: multipart/form-data with field 'image' (any image file)
    Returns: JSON with is_phone, confidence, status, method
    """
    # Validate model loaded
    if model is None:
        return jsonify({"error": "YOLO model not loaded. Check server logs."}), 500

    # Validate file present
    if "image" not in request.files:
        return jsonify({"error": "No image field in request. Send a file with key 'image'."}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename. Please upload a real image file."}), 400

    # Save to a temporary file so YOLO can read it
    suffix = os.path.splitext(file.filename)[-1] or ".jpg"
    tmp_path = os.path.join(tempfile.gettempdir(), f"eco_pred_{uuid.uuid4().hex}{suffix}")

    try:
        file.save(tmp_path)
        result = run_yolo_prediction(tmp_path)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    finally:
        # Clean up the temp file regardless of success/failure
        try:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        except OSError:
            pass


@app.route("/health", methods=["GET"])
def health():
    """Quick health-check to confirm the server is running."""
    return jsonify({"status": "ok", "model_loaded": model is not None}), 200


# ─── Entry Point ──────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
