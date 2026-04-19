import os
import shutil
import random

image_dir = "Dataset/images/train"
label_dir = "Dataset/labels/train"

val_image_dir = "Dataset/images/val"
val_label_dir = "Dataset/labels/val"

os.makedirs(val_image_dir, exist_ok=True)
os.makedirs(val_label_dir, exist_ok=True)

images = os.listdir(image_dir)
random.shuffle(images)

split = int(len(images) * 0.2)  # 20%
val_images = images[:split]

for img in val_images:
    label = img.replace(".jpg", ".txt")

    shutil.move(os.path.join(image_dir, img), os.path.join(val_image_dir, img))
    shutil.move(os.path.join(label_dir, label), os.path.join(val_label_dir, label))

print("✅ Split completed!")
print("Total images:", len(images))