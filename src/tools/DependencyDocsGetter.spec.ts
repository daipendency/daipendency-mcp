import { afterEach, describe, expect, it } from 'vitest';
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { dependencyDocsGetter } from './DependencyDocsGetter.js';
import { Library } from '@daipendency/core';
import { vi } from 'vitest';

vi.mock('@daipendency/core');

describe('DependencyDocsGetter.callback', () => {
  const callbackExtra: RequestHandlerExtra = {
    signal: AbortSignal.timeout(1000),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load dependency by name and dependant path', async () => {
    await dependencyDocsGetter.callback(
      { name: 'react', dependant_path: '/path/to/dependant' },
      callbackExtra,
    );

    expect(Library.loadDependency).toHaveBeenCalledWith(
      'react',
      '/path/to/dependant',
    );
  });

  it('should return Markdown documentation', async () => {
    const result = await dependencyDocsGetter.callback(
      { name: 'react', dependant_path: '/path/to/dependant' },
      callbackExtra,
    );

    expect(result).toEqual({
      content: [{ type: 'text', text: '## Documentation' }],
    });
  });
});
