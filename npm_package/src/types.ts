// Core types for the agent system

export interface AgentOptions {
  logging?: boolean;
  // Add more configuration options as needed
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AgentContext {
  messages: Message[];
  metadata?: Record<string, unknown>;
}

export interface AgentResponse {
  content: string;
  metadata?: Record<string, unknown>;
}
