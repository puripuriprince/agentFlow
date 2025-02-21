import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DataIngestion:
    def __init__(self, storage_dir="data/raw"):
        self.storage_dir = storage_dir
        os.makedirs(storage_dir, exist_ok=True)
        
    def scrape_website(self, url: str) -> dict:
        """
        Scrape data from a website using BeautifulSoup
        """
        try:
            logger.info(f"Scraping website: {url}")
            response = requests.get(url, headers={'User-Agent': 'AgentForge Bot 1.0'})
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract relevant data (customize based on website structure)
            data = {
                "title": soup.title.string if soup.title else "",
                "text_content": soup.get_text(separator=' ', strip=True),
                "links": [a.get('href') for a in soup.find_all('a', href=True)],
                "timestamp": datetime.now().isoformat()
            }
            
            # Save raw data
            self._save_raw_data(data, f"web_scrape_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
            
            return data
            
        except Exception as e:
            logger.error(f"Error scraping website {url}: {str(e)}")
            raise

    def fetch_public_api(self, api_url: str, params: dict = None) -> dict:
        """
        Fetch data from a public API
        """
        try:
            logger.info(f"Fetching data from API: {api_url}")
            response = requests.get(api_url, params=params)
            response.raise_for_status()
            
            data = response.json()
            
            # Save raw data
            self._save_raw_data(data, f"api_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
            
            return data
            
        except Exception as e:
            logger.error(f"Error fetching from API {api_url}: {str(e)}")
            raise

    def _save_raw_data(self, data: dict, filename: str):
        """
        Save raw data to local storage
        """
        filepath = os.path.join(self.storage_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        logger.info(f"Saved raw data to {filepath}")

if __name__ == "__main__":
    # Example usage
    ingestion = DataIngestion()
    
    # Example website scraping
    try:
        data = ingestion.scrape_website("https://example.com")
        print("Successfully scraped website data")
    except Exception as e:
        print(f"Failed to scrape website: {e}")
    
    # Example API fetching
    try:
        api_data = ingestion.fetch_public_api(
            "https://api.example.com/data",
            params={"limit": 100}
        )
        print("Successfully fetched API data")
    except Exception as e:
        print(f"Failed to fetch API data: {e}")
