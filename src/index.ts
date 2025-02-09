#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ALL_TOOLS } from './tools/index.js';
import packageJson from '../package.json' assert { type: 'json' };
import type { Tool } from './tools/Tool.js';
import type { ToolParameters } from './tools/ToolParameters.js';

const INSTRUCTIONS = `Extract narrative and API documentation from dependencies.

Only Rust projects are currently supported.
`;

async function runServer() {
  const server = new McpServer({
    name: 'Daipendency',
    version: packageJson.version,
    instructions: INSTRUCTIONS,
  });

  for (const tool of ALL_TOOLS as Tool<ToolParameters>[]) {
    server.tool(
      tool.name,
      tool.description,
      tool.parameters,
      wrapCallbackError(tool.callback),
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

function wrapCallbackError<
  Params extends ToolParameters,
  Callback extends Tool<Params>['callback'],
>(callback: Callback): Callback {
  return ((args, extra) => {
    try {
      return callback(args, extra);
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : String(error),
          },
        ],
        isError: true,
      } as const;
    }
  }) as Callback;
}

await runServer();
