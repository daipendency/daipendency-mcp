import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createRequire } from 'node:module';
import { Library } from '@daipendency/core';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

const server = new McpServer({
  name: 'Daipendency',
  version: packageJson.version,
  instructions:
    'Extract documentation and public API for a dependency in the current project. Only Rust projects are supported.',
});

async function extractDependencyDocs(
  name: string,
  dependant_path: string,
): Promise<string> {
  const dependency = await Library.loadDependency(name, dependant_path);
  return dependency.generateMarkdownDocumentation();
}

server.tool(
  'get_dependency_docs',
  'Extract documentation and public API for a dependency of a local project.',
  {
    name: z.string({
      description: 'The name of the dependency to extract documentation for.',
    }),
    dependant_path: z.string({
      description: 'The path to the dependant project.',
    }),
  },
  async ({ name, dependant_path }) => {
    const docs = await extractDependencyDocs(name, dependant_path);
    return {
      content: [{ type: 'text', text: docs }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
