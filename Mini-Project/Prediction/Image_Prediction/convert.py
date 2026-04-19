import xml.etree.ElementTree as ET
import os

# 📂 Path to your XML files
xml_folder = "Dataset/Mobile_image/annotations"

# 📂 Output folder for YOLO labels
output_folder = "Dataset/labels"

os.makedirs(output_folder, exist_ok=True)

# 🏷️ Class mapping — add more labels here as needed
class_map = {
    "cracked_screen": 0,
    "broken_battery": 1,
    "water_damage": 2,
}

# 🔁 Loop through all files (including subfolders)
for root_dir, dirs, files in os.walk(xml_folder):
    for xml_file in files:
        if xml_file.endswith(".xml"):
            xml_path = os.path.join(root_dir, xml_file)

            tree = ET.parse(xml_path)
            root = tree.getroot()

            # ✅ Guard against missing <size> tag
            size = root.find('size')
            if size is None:
                print(f"⚠️ Skipping {xml_file}: no <size> tag found")
                continue

            # ✅ Guard against missing <width> or <height> sub-tags
            width_tag = size.find('width')
            height_tag = size.find('height')
            if width_tag is None or height_tag is None:
                print(f"⚠️ Skipping {xml_file}: missing <width> or <height> in <size>")
                continue

            w = float(width_tag.text)
            h = float(height_tag.text)

            if w == 0 or h == 0:
                print(f"⚠️ Skipping {xml_file}: invalid dimensions (0x0)")
                continue

            # ✅ Preserve subfolder structure to avoid filename collisions
            relative_path = os.path.relpath(root_dir, xml_folder)
            out_dir = os.path.join(output_folder, relative_path)
            os.makedirs(out_dir, exist_ok=True)

            txt_filename = xml_file.replace(".xml", ".txt")
            txt_path = os.path.join(out_dir, txt_filename)

            with open(txt_path, "w") as f:
                for obj in root.findall('object'):

                    # ✅ Guard against missing <name> tag
                    name_tag = obj.find('name')
                    if name_tag is None or name_tag.text is None:
                        print(f"⚠️ Skipping object in {xml_file}: missing <name> tag")
                        continue
                    label = name_tag.text

                    # ✅ Use class_map dict instead of hardcoded if-else
                    if label in class_map:
                        class_id = class_map[label]
                    else:
                        print(f"⚠️ Unknown label '{label}' in {xml_file} — skipping object")
                        continue

                    # ✅ Guard against missing <bndbox> tag
                    box = obj.find('bndbox')
                    if box is None:
                        print(f"⚠️ Skipping object '{label}' in {xml_file}: missing <bndbox>")
                        continue

                    # ✅ Guard against missing coordinate sub-tags
                    xmin_tag = box.find('xmin')
                    ymin_tag = box.find('ymin')
                    xmax_tag = box.find('xmax')
                    ymax_tag = box.find('ymax')

                    if any(tag is None for tag in [xmin_tag, ymin_tag, xmax_tag, ymax_tag]):
                        print(f"⚠️ Skipping object '{label}' in {xml_file}: incomplete <bndbox> coordinates")
                        continue

                    xmin = float(xmin_tag.text)
                    ymin = float(ymin_tag.text)
                    xmax = float(xmax_tag.text)
                    ymax = float(ymax_tag.text)

                    # 📐 Convert to YOLO format
                    x_center = ((xmin + xmax) / 2) / w
                    y_center = ((ymin + ymax) / 2) / h
                    width = (xmax - xmin) / w
                    height = (ymax - ymin) / h

                    f.write(f"{class_id} {x_center} {y_center} {width} {height}\n")

print("✅ ALL XML FILES CONVERTED SUCCESSFULLY!")