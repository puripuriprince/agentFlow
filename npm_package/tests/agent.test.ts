import { Agent } from '../src/core/agent';
import { AgentOptions } from '../src/types';

describe('Agent', () => {
  let agent: Agent;

  beforeEach(() => {
    agent = new Agent();
  });

  it('should create an agent with default options', () => {
    expect(agent).toBeInstanceOf(Agent);
    expect(agent.getContext().messages).toHaveLength(0);
  });

  it('should create an agent with custom options', () => {
    const options: AgentOptions = {
      logging: true
    };
    const customAgent = new Agent(options);
    expect(customAgent).toBeInstanceOf(Agent);
  });

  it('should process a message and return a response', async () => {
    const response = await agent.processMessage('Hello');
    expect(response).toHaveProperty('content');
    expect(response.metadata).toHaveProperty('timestamp');
    expect(agent.getContext().messages).toHaveLength(2); // User message + Assistant response
  });

  it('should clear context when requested', () => {
    agent.processMessage('Hello');
    agent.clearContext();
    expect(agent.getContext().messages).toHaveLength(0);
  });

  it('should add system message to context', () => {
    const systemMessage = 'You are a helpful assistant';
    agent.addSystemMessage(systemMessage);
    const context = agent.getContext();
    expect(context.messages).toHaveLength(1);
    expect(context.messages[0]).toEqual({
      role: 'system',
      content: systemMessage
    });
  });
});
