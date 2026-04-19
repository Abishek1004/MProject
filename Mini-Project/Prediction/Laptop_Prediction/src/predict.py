import joblib
import pandas as pd
import os

# =========================
# PATH SETUP
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, "model", "model.pkl")

# =========================
# LOAD MODEL
# =========================
# Load the full pipeline (preprocessor + regressor)
model = joblib.load(model_path)

def count_faults(x):
    if pd.isna(x) or x == "None":
        return 0
    return len(str(x).split("|"))

def predict_price(data):
    """
    Predict laptop price based on input data.
    Expects data to be a dict with: Brand, Model, Base_Price, Original_Charger, Valid_Bill, Display, Body_Condition, Faults
    """
    df = pd.DataFrame([data])
    
    # Feature Engineering
    df["Faults"] = df["Faults"].fillna("None")
    df["fault_count"] = df["Faults"].apply(count_faults)
    
    # Predict using the loaded pipeline
    prediction = model.predict(df)
    
    return int(prediction[0])

# =========================
# TEST (If run directly)
# =========================
if __name__ == '__main__':
    test_data = {
        "Brand": "Dell",
        "Model": "XPS 13",
        "Base_Price": 95000,
        "Original_Charger": "Yes",
        "Valid_Bill": "Yes",
        "Display": "Minor Scratches",
        "Body_Condition": "Minor Scratches",
        "Faults": "WiFi Faulty|Battery Faulty"
    }
    print("Predicted Price: ₹", predict_price(test_data))