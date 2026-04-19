import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Load dataset
df = pd.read_csv("data/mobile_dataset_pro_10000.csv")


# 🔥 Create realistic price (you don’t have actual price column)
def calculate_price(row):
    base = 5000

    # performance
    base += row["ram_gb"] * 1500
    base += row["storage_gb"] * 20
    base += row["battery_power"] * 2

    # brand impact
    if row["brand"] == "Apple":
        base += 15000
    elif row["brand"] == "Samsung":
        base += 8000

    # age depreciation
    base -= row["age_years"] * 3000

    # defects reduce price
    if row["front_glass_status"] != "no defect":
        base -= 2000
    if row["back_glass_status"] != "no defect":
        base -= 1500
    if row["display_defect"] != "no defect":
        base -= 3000
    if row["body_defect"] != "no defect":
        base -= 1000
    if row["faults"] != "none":
        base -= 2500

    return max(base, 2000)


# 🔥 Create target column
df["price"] = df.apply(calculate_price, axis=1)

# Drop old target
df = df.drop("price_range", axis=1)

# One-hot encoding
df = pd.get_dummies(df)

# Split
X = df.drop("price", axis=1)
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)

# Save
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/model.pkl")
joblib.dump(X.columns.tolist(), "model/columns.pkl")

print("✅ Regression model trained!")