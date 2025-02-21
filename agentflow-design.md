Agentflow Implementation Plan
==============================

Overview
--------
Agentforge is a service platform that allows users to create intelligent agents using natural language. The system leverages an LLM to generate required tools, gathers training data, and executes model training on the backend using the groq api for compute. Users can deploy these agents in an online sandbox or download model weights to run locally. For advanced customization, a Node-based GUI will be provided in the future. The service is accessible through the website or directly through the npm package in the cli.

ToDo
-------

-Implement firecrawl search in core engine
-Remove all authentification from core, replace links to deprecated server with openrouter deepseek-r1


Agent create flow should be like so:

1. the user prompts the creation of an agent as they want
2. the engine searches for the best AI model to serve as a base and any corresponding data
3. the engine creates the right tools for the job
4. the package trains the agent with the tools on the right dataset so that it delivers exactly what the user wanted