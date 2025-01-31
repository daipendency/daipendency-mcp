# Daipendency MCP Server

JavaScript implementation of a Model Context Protocol (MCP) server for [Daipendency](https://github.com/daipendency/daipendency).

## API

### Tools

#### `get_dependency_docs`

Extract documentation and public API for a dependency of a local project.

Parameters:

- `name`: The name of the dependency to extract documentation for.
- `dependant_path`: The path to the dependant project.

This is equivalent to [`daipendency extract-dep`](https://github.com/daipendency/daipendency#daipendency-extract-dep-extract-the-documentation-of-a-dependency-in-a-crate).

## Usage

Register the server in your MCP configuration file. For example:

```json
{
  "mcpServers": {
    "daipendency": {
      "command": "npx",
      "args": ["-y", "daipendency-mcp"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```
