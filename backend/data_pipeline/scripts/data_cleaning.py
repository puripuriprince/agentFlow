import pandas as pd
import json
import os
from datetime import datetime
import logging
from typing import Union, List

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DataCleaning:
    def __init__(self, input_dir="data/raw", output_dir="data/processed"):
        self.input_dir = input_dir
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    def clean_data(self, input_path: str) -> pd.DataFrame:
        """
        Clean and normalize data from JSON or CSV files
        """
        try:
            logger.info(f"Cleaning data from: {input_path}")
            
            # Load data based on file type
            if input_path.endswith('.json'):
                df = self._load_json(input_path)
            elif input_path.endswith('.csv'):
                df = pd.read_csv(input_path)
            else:
                raise ValueError("Unsupported file format")

            # Basic cleaning steps
            df = self._basic_cleaning(df)
            
            # Save cleaned data
            output_path = os.path.join(
                self.output_dir,
                f"cleaned_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            )
            df.to_csv(output_path, index=False)
            logger.info(f"Saved cleaned data to {output_path}")
            
            return df
            
        except Exception as e:
            logger.error(f"Error cleaning data from {input_path}: {str(e)}")
            raise

    def _load_json(self, file_path: str) -> pd.DataFrame:
        """
        Load JSON data into a pandas DataFrame
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Handle different JSON structures
        if isinstance(data, list):
            return pd.DataFrame(data)
        elif isinstance(data, dict):
            return pd.DataFrame([data])
        else:
            raise ValueError("Unsupported JSON structure")

    def _basic_cleaning(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Perform basic cleaning operations on the DataFrame
        """
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Handle missing values
        df = df.fillna({
            col: df[col].mode()[0] if df[col].dtype == 'object' else df[col].mean()
            for col in df.columns
        })
        
        # Convert timestamps to datetime
        date_columns = df.select_dtypes(include=['object']).columns
        for col in date_columns:
            try:
                df[col] = pd.to_datetime(df[col])
            except:
                continue
        
        # Remove special characters from string columns
        str_columns = df.select_dtypes(include=['object']).columns
        for col in str_columns:
            df[col] = df[col].str.replace(r'[^\w\s]', '', regex=True)
            
        return df

    def process_directory(self, file_pattern: str = "*.json") -> List[pd.DataFrame]:
        """
        Process all matching files in the input directory
        """
        import glob
        
        cleaned_dfs = []
        for file_path in glob.glob(os.path.join(self.input_dir, file_pattern)):
            try:
                cleaned_df = self.clean_data(file_path)
                cleaned_dfs.append(cleaned_df)
            except Exception as e:
                logger.error(f"Failed to process {file_path}: {e}")
                continue
                
        return cleaned_dfs

if __name__ == "__main__":
    # Example usage
    cleaner = DataCleaning()
    
    # Clean a single file
    try:
        df = cleaner.clean_data("data/raw/example_data.json")
        print("Successfully cleaned data file")
    except Exception as e:
        print(f"Failed to clean data: {e}")
    
    # Process all JSON files in directory
    try:
        dfs = cleaner.process_directory("*.json")
        print(f"Successfully processed {len(dfs)} files")
    except Exception as e:
        print(f"Failed to process directory: {e}")
