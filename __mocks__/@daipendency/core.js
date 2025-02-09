import { vi } from 'vitest';

export const Library = {
  loadDependency: vi.fn().mockImplementation(async (name, path) => ({
    generateMarkdownDocumentation: () => '## Documentation',
  })),
}; 