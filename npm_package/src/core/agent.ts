import { AgentOptions, AgentContext, AgentResponse, Message } from '../types';
import { Logger, LogLevel } from '../utils/logger';

export class Agent {
  private options: AgentOptions;
  private context: AgentContext;
  private logger: Logger;

  constructor(options: AgentOptions = {}) {
    this.options = options;
    this.context = {
      messages: []
    };
    this.logger = new Logger(options.logging);
  }

  async processMessage(message: string): Promise<AgentResponse> {
    this.logger.debug('Processing message', { message });

    const userMessage: Message = {
      role: 'user',
      content: message
    };
    
    this.context.messages.push(userMessage);
    
    try {
      // TODO: Implement actual processing logic
      const response: AgentResponse = {
        content: "Default response - implementation pending",
        metadata: {
          timestamp: new Date().toISOString()
        }
      };

      this.context.messages.push({
        role: 'assistant',
        content: response.content
      });

      this.logger.info('Message processed successfully', { response });
      return response;
    } catch (error) {
      this.logger.error('Error processing message', { error });
      throw error;
    }
  }

  getContext(): AgentContext {
    return this.context;
  }

  clearContext(): void {
    this.logger.debug('Clearing context');
    this.context.messages = [];
  }

  addSystemMessage(content: string): void {
    this.logger.debug('Adding system message', { content });
    this.context.messages.push({
      role: 'system',
      content
    });
  }
}
