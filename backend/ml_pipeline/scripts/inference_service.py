from fastapi import FastAPI, HTTPException
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
import torch
import logging
from pydantic import BaseModel
from typing import List, Dict
import os
from datetime import datetime

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI(title="AgentForge Inference Service")

# Request/Response models
class InferenceRequest(BaseModel):
    text: str

class InferenceResponse(BaseModel):
    prediction: float
    confidence: float

class ModelService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None
        self.tokenizer = None
        self.pipeline = None
        self.load_model()

    def load_model(self):
        """
        Load the fine-tuned model and tokenizer
        """
        try:
            logger.info(f"Loading model from {self.model_path}")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
            self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
            self.pipeline = pipeline(
                "text-classification",
                model=self.model,
                tokenizer=self.tokenizer,
                device=0 if torch.cuda.is_available() else -1
            )
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise

    async def predict(self, text: str) -> Dict:
        """
        Make predictions using the loaded model
        """
        try:
            # Get prediction
            result = self.pipeline(text)[0]
            
            return {
                "prediction": float(result["score"]),
                "confidence": float(result["score"])  # For classification tasks
            }
        except Exception as e:
            logger.error(f"Prediction failed: {e}")
            raise

# Initialize model service
model_service = None

@app.on_event("startup")
async def startup_event():
    """
    Initialize the model service on startup
    """
    global model_service
    model_path = os.getenv("MODEL_PATH", "models/final")
    try:
        model_service = ModelService(model_path)
    except Exception as e:
        logger.error(f"Failed to initialize model service: {e}")
        raise

@app.post("/predict", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    """
    Endpoint for making predictions
    """
    try:
        result = await model_service.predict(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
