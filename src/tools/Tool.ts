import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ZodRawShape } from 'zod';

export interface Tool<Params extends ZodRawShape> {
  name: string;
  description: string;
  parameters: Params;
  callback: ToolCallback<Params>;
}
