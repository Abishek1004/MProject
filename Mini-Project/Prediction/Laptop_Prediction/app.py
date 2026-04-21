from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import predict_price
import os

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Expected fields: Brand, Model, Base_Price, Original_Charger, Valid_Bill, Display, Body_Condition, Faults
        price = predict_price(data)
        
        return jsonify({
            "predicted_price": price
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    # Running on port 5002 as planned
    app.run(host='0.0.0.0', port=5002, debug=True)
