from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle

# ✅ Load trained model using pickle
with open("model2.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "FastAPI ML API is running!"}

# Define input format
class InputData(BaseModel):
    features: list[float]  # Expecting a list of 3 feature values

@app.post("/predict")
def predict(data: InputData):
    features = np.array([data.features])  # Convert input to numpy array
    prediction = model.predict(features)[0]  # Get model prediction
    return {"prediction": int(prediction), "features": data.features}
