# External Integration Points in Core Agent

## LLM Integration Points
- `client.js` makes API calls to process messages and get responses
- Uses quota management system for API rate limiting
- Handles different response formats and streaming

## Code Analysis
- `languages.js` integrates with tree-sitter for code parsing
- Makes calls to language-specific parsers:
  - TypeScript/JavaScript
  - Python
  - Java
  - C#
  - C/C++
  - Ruby
  - Go
  - PHP
  - Rust

## External Tool Integration
- `tool-handlers.js` manages external tool calls for:
  - Web scraping
  - Browser automation
  - File system operations
  - Terminal command execution
  - Code search functionality

## Web Integration
- `web-scraper.js` makes HTTP requests to:
  - Fetch documentation
  - Scrape web content
  - Handle API responses

## Browser Automation
- `browser-runner.js` interfaces with:
  - Puppeteer for browser control
  - Screenshot capture
  - Console log collection
  - Network request monitoring

## Database Calls
- `db/index.js` handles:
  - User data storage
  - Usage tracking
  - Conversation history
  - Project metadata

## Authentication/Authorization
- `credentials.js` manages:
  - API key validation
  - User authentication
  - Service authorization

## Billing Integration
- `billing/quota-manager.js` interfaces with:
  - Usage tracking services
  - Payment processing
  - Rate limiting

## Project Management
- `project-files.js` interacts with:
  - Git repositories
  - File system
  - Code search tools (ripgrep)

## WebSocket Communication
- `websockets/` handles:
  - Real-time updates
  - Streaming responses
  - Client notifications

## Key External Services
Most significant external calls are to:
1. LLM APIs for processing messages
2. Tree-sitter for code parsing
3. External web services for documentation
4. Database for persistence
5. Browser automation tools
6. Git and filesystem operations
