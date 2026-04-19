from PIL import Image
import os

img_path = r'C:\Users\Abishek\.gemini\antigravity\brain\4f9e841a-dbe6-4bec-a415-fcee54b19889\media__1775793389278.png'
dest_dir = r'd:\Ewaste2\Mini-Project\frontend-integrated\src\assets\img'

try:
    img = Image.open(img_path)
    width, height = img.size
    print(f"Image size: {width}x{height}")

    # Phone screen (based on 885x630)
    # The phone is centered around x=135
    phone_crop = img.crop((15, 60, 255, 590))
    phone_crop.save(os.path.join(dest_dir, 'app-screen.png'))
    
    # Laptop screen
    # The laptop screen is on the right, centered around x=730
    laptop_crop = img.crop((650, 190, 880, 470))
    laptop_crop.save(os.path.join(dest_dir, 'laptop-screen.png'))

    print("Cropped images saved as app-screen.png and laptop-screen.png.")
except Exception as e:
    print(f"Error: {e}")
