import sys
from ultralytics import YOLO

model = YOLO("runs/detect/train/weights/best.pt")

# Input
if len(sys.argv) > 1:
    image_path = sys.argv[1]
else:
    image_path = input("Enter image path: ")

results = model(image_path)

if len(results[0].boxes) == 0:
    print("❌ No mobile detected")
else:
    for box in results[0].boxes:
        cls = int(box.cls)

        if cls == 0:
            print("📱 Mobile detected")
        elif cls == 1:
            print("📱💥 Cracked screen detected")