# Daipendency MCP Server

Model Context Protocol (MCP) server for [Daipendency](https://github.com/daipendency/daipendency).

## Install

Use `npx -y @daipendency/mcp` to run this MCP server with stdio.

## API

### Tools

#### `get_dependency_docs`

Extract narrative and API documentation for a dependency of a local project.

Parameters:

- `name`: The name of the dependency to extract documentation for.
- `dependant_path`: The path to the dependant project.

This is equivalent to [`daipendency extract-dep`](https://github.com/daipendency/daipendency#daipendency-extract-dep-extract-the-documentation-of-a-dependency).

## Architectural Decisions

Although Daipendency itself is implemented in Rust,
this project is implemented in TypeScript so that we could use one of the official, feature-rich MCP SDKs.
This required implementing [JS bindings for Daipendency](https://github.com/daipendency/daipendency-js).
