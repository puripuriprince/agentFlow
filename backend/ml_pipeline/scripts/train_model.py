from transformers import (
    Trainer,
    TrainingArguments,
    AutoModelForSequenceClassification,
    AutoTokenizer,
    DataCollatorWithPadding
)
from datasets import load_dataset, Dataset
import torch
import os
import logging
from typing import Dict, List
import json
from datetime import datetime

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ModelTrainer:
    def __init__(
        self,
        model_name: str = "deepseek-ai/deepseek-coder-1.3b-base",
        output_dir: str = "models"
    ):
        self.model_name = model_name
        self.output_dir = output_dir
        self.tokenizer = None
        self.model = None
        os.makedirs(output_dir, exist_ok=True)

    def prepare_model(self):
        """
        Initialize the model and tokenizer
        """
        try:
            logger.info(f"Loading model and tokenizer: {self.model_name}")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(
                self.model_name,
                num_labels=1  # For regression tasks
            )
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise

    def prepare_dataset(self, data: List[Dict]) -> Dataset:
        """
        Prepare dataset for training
        """
        try:
            # Convert data to dataset format
            dataset = Dataset.from_dict({
                "text": [item["description"] for item in data],
                "label": [item["score"] for item in data]
            })
            
            # Tokenize dataset
            def tokenize_function(examples):
                return self.tokenizer(
                    examples["text"],
                    truncation=True,
                    padding="max_length",
                    max_length=512
                )
            
            tokenized_dataset = dataset.map(
                tokenize_function,
                batched=True,
                remove_columns=dataset.column_names
            )
            
            return tokenized_dataset
            
        except Exception as e:
            logger.error(f"Failed to prepare dataset: {e}")
            raise

    def train(self, training_data: List[Dict], validation_data: List[Dict] = None):
        """
        Train the model on the provided data
        """
        try:
            # Prepare model and tokenizer
            self.prepare_model()
            
            # Prepare datasets
            train_dataset = self.prepare_dataset(training_data)
            if validation_data:
                eval_dataset = self.prepare_dataset(validation_data)
            else:
                eval_dataset = None
            
            # Setup training arguments
            training_args = TrainingArguments(
                output_dir=os.path.join(self.output_dir, f"run_{datetime.now().strftime('%Y%m%d_%H%M%S')}"),
                num_train_epochs=3,
                per_device_train_batch_size=8,
                per_device_eval_batch_size=8,
                warmup_steps=500,
                weight_decay=0.01,
                logging_dir="./logs",
                logging_steps=10,
                evaluation_strategy="epoch" if eval_dataset else "no",
                save_strategy="epoch",
                load_best_model_at_end=True if eval_dataset else False,
            )
            
            # Initialize trainer
            trainer = Trainer(
                model=self.model,
                args=training_args,
                train_dataset=train_dataset,
                eval_dataset=eval_dataset,
                data_collator=DataCollatorWithPadding(self.tokenizer),
            )
            
            # Train the model
            logger.info("Starting training")
            trainer.train()
            
            # Save the final model
            final_output_dir = os.path.join(self.output_dir, "final")
            trainer.save_model(final_output_dir)
            self.tokenizer.save_pretrained(final_output_dir)
            logger.info(f"Model saved to {final_output_dir}")
            
        except Exception as e:
            logger.error(f"Training failed: {e}")
            raise

    def evaluate(self, test_data: List[Dict]) -> Dict:
        """
        Evaluate the model on test data
        """
        try:
            test_dataset = self.prepare_dataset(test_data)
            
            trainer = Trainer(
                model=self.model,
                tokenizer=self.tokenizer,
                eval_dataset=test_dataset
            )
            
            metrics = trainer.evaluate()
            return metrics
            
        except Exception as e:
            logger.error(f"Evaluation failed: {e}")
            raise

if __name__ == "__main__":
    # Example usage
    trainer = ModelTrainer()
    
    # Example training data
    training_data = [
        {"description": "Process financial data and generate insights", "score": 0.8},
        {"description": "Analyze market trends and make predictions", "score": 0.9}
    ]
    
    # Train the model
    try:
        trainer.train(training_data)
        print("Training completed successfully")
    except Exception as e:
        print(f"Training failed: {e}")
