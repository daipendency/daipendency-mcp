import { Library } from '@daipendency/core';
import { z } from 'zod';

import { Tool } from './Tool.js';

const dependencyDocsGetterParameters = {
  name: z.string({
    description:
      'The name of the dependency for which to extract documentation',
  }),
  dependant_path: z.string({
    description: 'The absolute path to the dependant project',
  }),
} as const;

async function extractDependencyDocs(
  name: string,
  dependant_path: string,
): Promise<string> {
  const dependency = await Library.loadDependency(name, dependant_path);
  return dependency.generateMarkdownDocumentation();
}

export const dependencyDocsGetter: Tool<typeof dependencyDocsGetterParameters> =
  {
    name: 'dependency_docs_getter',
    description:
      'Extract all the documentation and public API for a dependency of a local project',
    parameters: dependencyDocsGetterParameters,
    callback: async ({ name, dependant_path }) => {
      const docs = await extractDependencyDocs(name, dependant_path);
      return {
        content: [{ type: 'text', text: docs }],
      };
    },
  };
