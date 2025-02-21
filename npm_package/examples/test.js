// If using TypeScript
//import { Agent } from 'agentflow';

// If using JavaScript
const { Agent } = require('agentflow');

// Create a new agent instance
const agent = new Agent({
  logging: true // Enable logging
});

// Add a system message
agent.addSystemMessage('You are a helpful assistant');

// Process a message
async function test() {
  const response = await agent.processMessage('Hello, how are you?');
  console.log('Agent response:', response);
}

test();