# Technical Deep Dive: CodeBullet Assistant Architecture

## Tree-sitter Integration

### Overview
The system uses Tree-sitter, a parser generator tool and incremental parsing library, to create abstract syntax trees (ASTs) from source code. This enables sophisticated code analysis and understanding across multiple programming languages.

### Key Components

1. Language Configuration (`languages.js`)
```typescript
const languageConfigs = [
    {
        extensions: ['.ts'],
        queryFile: 'tree-sitter-typescript-tags.scm',
        packageName: 'tree-sitter-typescript',
    },
    // ... configurations for other languages
];
```
Each language has:
- File extensions it handles
- A query file for extracting information
- The corresponding Tree-sitter package

2. Query System (`tree-sitter-queries/*.scm`)
The system uses Tree-sitter query files (.scm) to extract specific information from code:
```scheme
# Example from typescript-tags.scm
(function_declaration name: (identifier) @identifier)
(class_declaration name: (type_identifier) @identifier)
(method_definition name: (property_identifier) @identifier)
```
These queries capture:
- Function declarations
- Class declarations
- Method definitions
- Exports
- Function calls

3. Parsing Implementation (`parse.js`)
```typescript
async function parseTokens(filePath) {
    const languageConfig = await getLanguageConfig(filePath);
    if (languageConfig) {
        const { parser, query } = languageConfig;
        const sourceCode = fs.readFileSync(filePath, 'utf8');
        const tree = parser.parse(sourceCode);
        const captures = query.captures(tree.rootNode);
        // Process and return identifiers and calls
    }
}
```

### How It Works

1. **Language Detection**: The system identifies the programming language based on file extension.

2. **Parser Initialization**: Loads the appropriate Tree-sitter parser and query file for the language.

3. **AST Generation**: Parses source code into an AST using Tree-sitter.

4. **Information Extraction**: Uses .scm query files to extract:
   - Identifiers (function names, class names, etc.)
   - Function calls
   - Relationships between code elements

5. **Token Scoring**: Implements a sophisticated scoring system for tokens:
```typescript
const tokenBaseScore = 0.8 ** depth * Math.sqrt(numLines / (identifiers.length + 1));
```
- Considers file depth in directory structure
- Weights by file size and identifier density
- Adjusts scores based on external references

## Other Notable Technical Features

### 1. Real-time WebSocket Communication
- Implements a robust WebSocket client with:
  - Automatic reconnection
  - Message timeout handling
  - Transaction management
  - Heartbeat mechanism

### 2. Caching System
- Implements multiple caching layers:
  - Web page scraping cache
  - File content cache
  - Parser results cache

### 3. Promise Handling
- Sophisticated async operation management:
```typescript
async function withRetry(operation, options = {}) {
    const { maxRetries = 3, shouldRetry = (error) => error?.type === 'APIConnectionError' } = options;
    // Implements exponential backoff
}
```

### 4. File Management
- Advanced file operations:
  - Directory tree traversal
  - File change detection
  - Search/replace operations with context awareness

### 5. Project Context Management
- Maintains comprehensive project context:
  - File tree structure
  - Git changes
  - Token scores
  - System information
  - Shell configuration

## Technical Innovations

1. **Token Scoring Algorithm**
- Implements a unique approach to code understanding:
  - Considers directory depth (deeper = less important)
  - Weights by code density
  - Factors in external references
  - Uses square root scaling for balanced scoring

2. **Multi-Language Support**
- Unified parsing interface across languages
- Extensible language configuration system
- Consistent query structure across different syntax

3. **Real-time Capabilities**
- WebSocket-based real-time updates
- Efficient change detection and propagation
- Transaction-based communication protocol

4. **Error Resilience**
- Robust error handling in parsing
- Automatic retry mechanisms
- Graceful degradation when services are unavailable

This architecture enables the assistant to:
- Parse and understand code across multiple languages
- Maintain context across conversations
- Handle real-time updates and changes
- Provide accurate code suggestions and modifications
- Scale efficiently with project size

The combination of Tree-sitter for parsing, WebSocket for real-time communication, and the sophisticated token scoring system makes this a remarkably capable code analysis and assistance platform.
