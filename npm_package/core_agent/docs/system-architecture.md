# CodeBullet System Architecture

## Core Components

### 1. Project Context Management

The system maintains project context through several key components:

#### File Tree Management (`project-file-tree.js`)
- Builds a tree representation of the project directory
- Handles gitignore patterns
- Provides utilities for flattening the tree and getting file paths
- Tracks recently read files

#### Project Files Handler (`project-files.js`) 
- Core file operations and caching
- Manages project root directory
- Handles file reading/writing with size limits
- Tracks changes between file versions
- Integrates with git for change detection

### 2. Code Analysis

#### Abstract Syntax Tree (AST) Processing (`code-map/parse.js`)
- Uses tree-sitter for parsing multiple languages
- Extracts identifiers and function calls
- Generates token scores based on:
  - File depth in directory structure
  - Number of external references
  - Lines of code
- Caches parse results for performance

#### Language Support (`code-map/languages.js`)
- Configures parsers for multiple languages:
  - TypeScript/JavaScript
  - Python
  - Java
  - C#
  - C/C++
  - Rust
  - Ruby
  - Go
  - PHP
- Loads appropriate tree-sitter queries for each language
- Handles file extension mapping

### 3. Chat & Context Management

#### Chat Storage (`chat-storage.js`)
- Maintains conversation history
- Tracks file versions over time
- Handles undo/redo of file changes
- Manages chat metadata and timestamps

#### Worker Script Context (`worker-script-project-context.js`)
- Runs heavy initialization in separate thread
- Builds initial file context
- Manages file token scoring

### 4. Tools System

#### Tool Handlers (`tool-handlers.js`)
The system provides several tools:

1. `find_files`: Search for relevant files using natural language
   - Uses token scores to rank results
   - Considers file paths and content

2. `read_files`: Direct file access
   - Size-limited file reading
   - Caching for performance

3. `code_search`: Pattern-based code search
   - Uses ripgrep for fast searching
   - Supports regex patterns
   - Respects gitignore

4. `run_terminal_command`: Execute shell commands
   - Timeout protection
   - Working directory management
   - Command output capture

5. `scrape_web_page`: Web content retrieval
   - Caches results
   - Content truncation
   - URL extraction and validation

### 5. WebSocket Communication

#### WebSocket Client (`websockets/websocket-client.js`)
- Handles real-time communication
- Automatic reconnection
- Message timeout handling
- Subscription management

#### Schema Validation (`websockets/websocket-schema.js`)
- Defines message formats
- Validates incoming/outgoing messages
- Type definitions for actions

### 6. Utilities

#### File Operations (`util/file.js`)
- File block creation/parsing
- Search/replace block handling
- Directory management
- Path validation

#### Promise Utilities (`util/promise.js`)
- Retry mechanism with exponential backoff
- Concurrent request limiting
- Async operation helpers

## Key Features

1. **Context Preservation**
   - Maintains file version history
   - Tracks changes between responses
   - Preserves git status

2. **Intelligent File Access**
   - Caches frequently accessed files
   - Size limits for large files
   - Respects gitignore patterns

3. **Code Understanding**
   - AST-based code analysis
   - Cross-reference tracking
   - Token importance scoring

4. **Real-time Communication**
   - WebSocket-based updates
   - Automatic reconnection
   - Message validation

5. **Tool Integration**
   - File system operations
   - Code search capabilities
   - Web content integration
   - Terminal command execution

## Flow of Operation

1. Initial context building:
   - Load project structure
   - Parse gitignore rules
   - Initialize language parsers

2. For each interaction:
   - Update file context
   - Process code changes
   - Track file versions
   - Execute necessary tools
   - Validate changes

3. Context maintenance:
   - Cache management
   - File version tracking
   - Change detection
   - Token score updates

This architecture enables the system to maintain context across interactions while providing powerful code analysis and modification capabilities.
