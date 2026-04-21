import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# =========================
# PATH SETUP
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

data_path = os.path.join(BASE_DIR, "data", "tablets.csv")
model_path = os.path.join(BASE_DIR, "model", "model.pkl")

os.makedirs(os.path.dirname(model_path), exist_ok=True)

# =========================
# LOAD DATA
# =========================
df = pd.read_csv(data_path)

# =========================
# CLEAN DATA
# =========================
df["Faults"] = df["Faults"].fillna("None")

# =========================
# FEATURE ENGINEERING
# =========================
def count_faults(x):
    if pd.isna(x) or x == "None":
        return 0
    return len(str(x).split("|"))

df["fault_count"] = df["Faults"].apply(count_faults)

# =========================
# FEATURES & TARGET
# =========================
X = df.drop("Final_Price", axis=1)
y = df["Final_Price"]

# =========================
# CATEGORICAL COLUMNS
# =========================
cat_cols = [
    "Brand",
    "Model",
    "Working_Status",
    "Glass_Defect",
    "Display_Defect",
    "Body_Condition",
    "Faults"
]

# =========================
# PREPROCESSING
# =========================
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols)
    ],
    remainder="passthrough"
)

# =========================
# MODEL (GRADIENT BOOST)
# =========================
model = Pipeline([
    ("preprocess", preprocessor),
    ("regressor", GradientBoostingRegressor(
        n_estimators=200,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    ))
])

# =========================
# TRAIN TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# TRAIN
# =========================
model.fit(X_train, y_train)

# =========================
# EVALUATE
# =========================
preds = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, preds))

# =========================
# SAVE MODEL
# =========================
joblib.dump(model, model_path)

print("Tablet model saved ✅")