# Agent Builder Plan

This document outlines how to build an agent that specifically builds other agents. The agent will be capable of referencing its own codebase to extract a blueprint for an agent and, based on user-provided instructions, generate a new agent with custom modifications.

## Overview
The proposed "agent builder" extends the core agent system by introducing self-inspection, code transformation, and generation capabilities. In essence, the agent builder will:

• Inspect its own code (e.g., core message processing, context management, logging)  
• Extract an abstract blueprint representing its structure  
• Accept instructions from the user detailing desired modifications or new features  
• Apply these modifications to the extracted blueprint using a codemod engine  
• Reassemble the modified code into a complete, compilable agent  
• Write the new agent’s code to disk and optionally trigger a build/test routine

## Key Components and Interfaces

### 1. Introspection Module
- **Function:** `getSelfBlueprint()`
- **Purpose:** Reads the agent’s source files (e.g., core/agent.ts, utils/logger.ts, types.ts) and produces an abstract representation (e.g., an AST or a structured blueprint).
- **Interface Example:**
  ```typescript
  interface AgentBlueprint {
    modules: {
      [moduleName: string]: {
        filePath: string;
        content: string;
        // Optionally, an AST could be included here for advanced mods.
      }
    }
  }
  function getSelfBlueprint(): AgentBlueprint { /* ... */ }
  ```

### 2. Codemod Engine
- **Function:** `applyModifications(blueprint: AgentBlueprint, instructions: string): AgentBlueprint`
- **Purpose:** Accepts the agent blueprint and modification instructions, performs pattern matching on the codebase, and returns a transformed blueprint.
- **Interface Example:**
  ```typescript
  function applyModifications(blueprint: AgentBlueprint, instructions: string): AgentBlueprint {
    // Parse instructions.
    // Identify injection points in the blueprint.
    // Replace or add code segments accordingly.
    return modifiedBlueprint;
  }
  ```

### 3. Code Generator
- **Function:** `generateAgent(modifiedBlueprint: AgentBlueprint): { [filePath: string]: string }`
- **Purpose:** Assembles the modified blueprint into file contents using code templates. It transforms the abstract representation back into concrete code ready for writing.
- **Interface Example:**
  ```typescript
  function generateAgent(modifiedBlueprint: AgentBlueprint): { [filePath: string]: string } {
    // Traverse the blueprint, fill in templates and placeholders.
    // Return an object mapping file paths to file contents.
    return agentFiles;
  }
  ```

### 4. Build and Integration Module
- **Function:** `buildNewAgent(targetPath: string, agentFiles: { [filePath: string]: string }): string`
- **Purpose:** Writes the generated agent files to a target directory, invokes build tools (e.g., TypeScript compiler, bundlers) to compile code, and optionally runs tests.
- **Interface Example:**
  ```typescript
  function buildNewAgent(targetPath: string, agentFiles: { [filePath: string]: string }): string {
    // Write each file to disk in the target path.
    // Execute build and test commands via a child process.
    return `New agent built successfully in ${targetPath}`;
  }
  ```

## Implementation Steps (Pseudocode Overview)

1. **Self-Inspection:**
   - Use `getSelfBlueprint()` to read and parse the current agent code files from known directories.
   - Example pseudocode:
     ```typescript
     const blueprint = getSelfBlueprint();
     ```

2. **Modification Mechanism:**
   - Parse user-provided instructions to decide on modifications.
   - Use `applyModifications(blueprint, instructions)` to transform the blueprint.
   - Example pseudocode:
     ```typescript
     const modifiedBlueprint = applyModifications(blueprint, "add feature X and improve logging");
     ```

3. **Code Generation:**
   - Generate the new agent code using `generateAgent(modifiedBlueprint)`.
   - Example pseudocode:
     ```typescript
     const agentFiles = generateAgent(modifiedBlueprint);
     ```

4. **Assembly and Build:**
   - Write the generated files to a new project folder.
   - Call `buildNewAgent(targetPath, agentFiles)` to compile the new agent and run tests.
   - Example pseudocode:
     ```typescript
     const resultMessage = buildNewAgent("/path/to/new/agent", agentFiles);
     console.log(resultMessage);
     ```

5. **User Interaction:**
   - The builder agent receives instructions (e.g., through a chat interface or command-line interface).
   - Provide clear feedback on build status, errors, or test results.

## Considerations
- Ensure robust error handling in file I/O, code transformation, and build steps.
- Secure the code generation process to prevent arbitrary code injection.
- Version the generated agents to support iterative improvements and safe rollbacks.
- Integrate logging and real-time user feedback throughout the process.

