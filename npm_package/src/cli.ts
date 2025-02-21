#!/usr/bin/env node

import { Agent } from './core/agent';

function runCLI() {
  const agent = new Agent({ logging: true });
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Use command-line arguments as the message.
    const message = args.join(' ');
    agent.processMessage(message)
      .then(response => {
        console.log(response.content);
      })
      .catch(err => {
        console.error('Error processing message:', err);
        process.exit(1);
      });
  } else {
    // Read from standard input interactively.
    process.stdin.setEncoding('utf8');
    process.stdout.write('Enter message: ');
    process.stdin.on('data', async (data) => {
      const msg = data.toString().trim();
      if (msg.toLowerCase() === 'exit') {
        process.exit(0);
      }
      try {
        const res = await agent.processMessage(msg);
        console.log(res.content);
      } catch (e) {
        console.error('Error processing message:', e);
      }
      process.stdout.write('Enter message: ');
    });
  }
}

runCLI();
