import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model", "model.pkl"))
columns = joblib.load(os.path.join(BASE_DIR, "model", "columns.pkl"))

def predict_price(data):
    df = pd.DataFrame([data])

    df = pd.get_dummies(df)
    df = df.reindex(columns=columns, fill_value=0)

    prediction = model.predict(df)

    return int(prediction[0])   # ₹ value