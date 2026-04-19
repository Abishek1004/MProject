import requests
import json

url = "http://localhost:5002/predict"
payload = {
    "Brand": "Dell",
    "Model": "XPS 13",
    "Base_Price": 95000,
    "Original_Charger": "Yes",
    "Valid_Bill": "Yes",
    "Display": "Minor Scratches",
    "Body_Condition": "Minor Scratches",
    "Faults": "WiFi Faulty|Battery Faulty"
}

try:
    response = requests.post(url, json=payload)
    print(response.status_code)
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
