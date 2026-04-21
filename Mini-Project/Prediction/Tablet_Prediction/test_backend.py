import requests
import json

url = "http://localhost:5003/predict"
payload = {
    "Brand": "Samsung",
    "Model": "Galaxy Tab S 7",
    "Base_Price": 60000,
    "Working_Status": "Working",
    "Glass_Defect": "Minor Scratches",
    "Display_Defect": "No Defect",
    "Body_Condition": "Minor Scratches",
    "Faults": "Battery Faulty|WiFi Faulty"
}

try:
    response = requests.post(url, json=payload)
    print(response.status_code)
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
