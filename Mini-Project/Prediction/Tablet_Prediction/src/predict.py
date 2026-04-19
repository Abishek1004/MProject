import joblib
import pandas as pd
import os

# =========================
# PATH
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, "model", "model.pkl")

# =========================
# LOAD MODEL
# =========================
model = joblib.load(model_path)

def count_faults(x):
    if pd.isna(x) or x == "None":
        return 0
    return len(str(x).split("|"))

def predict_price(data):
    """
    Predict tablet price based on input data.
    Expected Fields: Brand, Model, Base_Price, Working_Status, Glass_Defect, Display_Defect, Body_Condition, Faults
    """
    df = pd.DataFrame([data])
    
    # Feature Engineering
    df["Faults"] = df["Faults"].fillna("None")
    df["fault_count"] = df["Faults"].apply(count_faults)
    
    # Predict
    prediction = model.predict(df)
    
    return int(prediction[0])

# =========================
# TEST
# =========================
if __name__ == '__main__':
    test_data = {
        "Brand": "Samsung",
        "Model": "Galaxy Tab S 7",
        "Base_Price": 60000,
        "Working_Status": "Working",
        "Glass_Defect": "Minor Scratches",
        "Display_Defect": "No Defect",
        "Body_Condition": "Minor Scratches",
        "Faults": "Battery Faulty|WiFi Faulty"
    }
    print("Predicted Tablet Price: ₹", predict_price(test_data))