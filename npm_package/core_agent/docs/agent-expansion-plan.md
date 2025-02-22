# Agent Expansion Plan: Modular Agent Generation

## Overview
This plan details the steps to expand the current agent into a modular platform that:
- Supports a common BaseAgent shared across use cases.
- Dynamically customizes an agent based on its given prompt.
- Selects the appropriate LLM for the task.
- Customizes its template configuration.
- Triggers training on Groq servers.
- Packages the agent for immediate testing.

## Modules to Create/Modify

### 1. BaseAgent Module (src/base-agent.ts)
Create a BaseAgent class with common properties and methods:

- Properties:
  - llm: string — The selected LLM (e.g., "gpt-4" or "gpt-3.5").
  - template: object — Base template details for the agent.
  - trainingConfig: object — Configuration for training on Groq servers.
  - packageConfig: object — Details required for packaging the agent.

- Methods:
  - chooseLLM(prompt: string): string  
    • Analyze the prompt and choose an appropriate LLM.

  - customizeTemplate(templateName: string, params: object): object  
    • Load the base template and apply customization based on input parameters.

  - async trainOnGroqServer(trainingInput: object): Promise<void>  
    • Send a training request to the Groq server, handling async responses and errors.

  - packageAgent(): void  
    • Bundle the agent (e.g., compile or create a deployable package) for immediate testing.

Pseudo-code snippet:
--------------------------------------------------
class BaseAgent {
  constructor(llm, template, trainingConfig, packageConfig) {
    this.llm = llm;
    this.template = template;
    this.trainingConfig = trainingConfig;
    this.packageConfig = packageConfig;
  }
  
  static chooseLLM(prompt) {
    // Example: if prompt contains "advanced", use gpt-4; otherwise, use gpt-3.5.
    return prompt.includes("advanced") ? "gpt-4" : "gpt-3.5";
  }
  
  customizeTemplate(templateName, params) {
    // Load and modify the template using params.
    // Return the customized template configuration.
  }
  
  async trainOnGroqServer(trainingInput) {
    // Implement API call to Groq server.
    // Handle response and errors.
  }
  
  packageAgent() {
    // Bundle the agent for testing (e.g., generate a deployable package).
  }
}
--------------------------------------------------

### 2. Agent Generator Module (src/agent-generator.ts)
Create a module that exports a function to generate agents from prompts.

Steps:
1. Use BaseAgent.chooseLLM(prompt) to determine the LLM.
2. Select and load an appropriate template based on the prompt (using a helper such as loadTemplateForPrompt).
3. Initialize a new BaseAgent instance with default training and packaging configurations.
4. Customize the template via BaseAgent.customizeTemplate.
5. Trigger the training process with trainOnGroqServer.
6. Package the agent using packageAgent.
7. Return the fully configured agent.

Pseudo-code snippet:
--------------------------------------------------
async function generateAgentFromPrompt(prompt) {
  const selectedLLM = BaseAgent.chooseLLM(prompt);
  const template = loadTemplateForPrompt(prompt); // Pseudocode: maps prompt to a template
  const defaultTrainingConfig = { /* default training parameters */ };
  const defaultPackageConfig = { /* packaging details */ };
  
  const agent = new BaseAgent(selectedLLM, template, defaultTrainingConfig, defaultPackageConfig);
  
  // Customize the template based on prompt-specific params.
  agent.customizeTemplate(template.name, { /* customization params extracted from prompt */ });
  
  // Wait for training to complete.
  await agent.trainOnGroqServer({ /* training input based on prompt */ });
  
  // Package the agent for testing.
  agent.packageAgent();
  
  return agent;
}
--------------------------------------------------

### 3. Configuration and Templates
- Create a configuration file (e.g., agent-config.json) to map prompt keywords to LLM choices and template associations.
- Organize agent templates in a dedicated directory (e.g., templates/agents/).

### 4. Testing and Packaging
- Develop a test suite (e.g., tests/agent-generator.test.ts) to verify:
  - The correctness of LLM selection via prompt analysis.
  - Successful template customization.
  - Proper functioning of training and packaging steps.
- Integrate these tests into your CI/CD pipeline for automated validation.

## Integration Considerations
- Update package.json if new dependencies (e.g., an HTTP client for Groq server API calls) are required.
- Ensure that asynchronous operations in training are correctly handled to avoid race conditions.
- Maintain clear separation of concerns: BaseAgent deals with core functionality while the agent generator orchestrates the overall process.

This implementation plan provides a clear roadmap for enhancing the agent to dynamically generate customized agents, ensuring ease of use and expanded functionality.
