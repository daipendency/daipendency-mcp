import { dependencyDocsGetter } from './DependencyDocsGetter.js';
import type { Tool } from './Tool.js';

export const ALL_TOOLS: Tool<any>[] = [dependencyDocsGetter];
