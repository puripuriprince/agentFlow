import weaviate
from typing import List, Dict, Any
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class VectorStore:
    def __init__(self):
        self.client = self._connect_to_weaviate()
        self._create_schema()

    def _connect_to_weaviate(self) -> weaviate.Client:
        """
        Connect to Weaviate instance
        """
        try:
            client = weaviate.Client(
                url=os.getenv("WEAVIATE_URL", "http://localhost:8080"),
                auth_client_secret=weaviate.AuthApiKey(
                    api_key=os.getenv("WEAVIATE_API_KEY", "default-key")
                )
            )
            return client
        except Exception as e:
            logger.error(f"Failed to connect to Weaviate: {e}")
            raise

    def _create_schema(self):
        """
        Create the schema for storing agent data
        """
        schema = {
            "classes": [{
                "class": "Agent",
                "description": "Store agent data and embeddings",
                "vectorizer": "text2vec-transformers",
                "properties": [
                    {
                        "name": "agentId",
                        "dataType": ["string"],
                        "description": "Unique identifier for the agent"
                    },
                    {
                        "name": "description",
                        "dataType": ["text"],
                        "description": "Natural language description of the agent"
                    },
                    {
                        "name": "tools",
                        "dataType": ["text[]"],
                        "description": "List of tool descriptions"
                    }
                ]
            }]
        }
        
        try:
            self.client.schema.create(schema)
            logger.info("Created Weaviate schema")
        except Exception as e:
            logger.warning(f"Schema creation failed (might already exist): {e}")

    def store_agent(self, agent_id: str, description: str, tools: List[Dict[str, Any]]):
        """
        Store agent data in vector database
        """
        try:
            # Convert tools to list of descriptions
            tool_descriptions = [tool["description"] for tool in tools]
            
            # Store in Weaviate
            self.client.data_object.create(
                class_name="Agent",
                data_object={
                    "agentId": agent_id,
                    "description": description,
                    "tools": tool_descriptions
                }
            )
            logger.info(f"Stored agent {agent_id} in vector database")
            
        except Exception as e:
            logger.error(f"Failed to store agent {agent_id}: {e}")
            raise

    def search_similar_agents(self, query: str, limit: int = 5) -> List[Dict]:
        """
        Search for similar agents based on description
        """
        try:
            result = (
                self.client.query
                .get("Agent", ["agentId", "description", "tools"])
                .with_near_text({"concepts": [query]})
                .with_limit(limit)
                .do()
            )
            
            return result["data"]["Get"]["Agent"]
            
        except Exception as e:
            logger.error(f"Failed to search agents: {e}")
            raise

if __name__ == "__main__":
    # Example usage
    vector_store = VectorStore()
    
    # Store example agent
    try:
        vector_store.store_agent(
            agent_id="test_agent_1",
            description="A test agent that processes financial data",
            tools=[
                {"description": "Tool for analyzing market trends"},
                {"description": "Tool for generating trading signals"}
            ]
        )
        print("Successfully stored agent")
    except Exception as e:
        print(f"Failed to store agent: {e}")
    
    # Search for similar agents
    try:
        similar_agents = vector_store.search_similar_agents(
            "agent for financial analysis"
        )
        print(f"Found {len(similar_agents)} similar agents")
    except Exception as e:
        print(f"Failed to search agents: {e}")
