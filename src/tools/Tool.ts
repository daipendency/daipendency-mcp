import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ToolParameters } from './ToolParameters.js';

export interface Tool<Params extends ToolParameters> {
  name: string;
  description: string;
  parameters: Params;
  callback: ToolCallback<Params>;
}
