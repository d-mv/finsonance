/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.test.ts'],
    environment: 'node',
    globals: true,
    fileParallelism: true,
    teardownTimeout: 5000,
    pool: 'threads',
    poolOptions: {
      maxThreads: 3,
      useAtomics: true,
    },
    clearMocks: true,
    passWithNoTests: true,
    env: {
      NODE_ENV: 'test',
    },
    coverage: {
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'text', 'text-summary'],
      thresholds: {
        lines: 80,
      },
      reportOnFailure: true,
      exclude: [
        'src/__tests__/**',
        'node_modules/**',
        'src/index.ts',
        'src/server/start.server.ts',
        'src/server/types.server.ts',
        'src/config.ts',
        'src/types.ts',
      ],
      include: ['src/**/*.ts'],
    },
  },
});
