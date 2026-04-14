import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Plugin to resolve .js imports to .jsx files when .jsx exists
function resolveJsToJsx() {
  return {
    name: 'resolve-js-to-jsx',
    resolveId(source, importer) {
      if (!source.endsWith('.js') || !importer) return null;

      const importerDir = dirname(importer);
      const jsxPath = source.replace(/\.js$/, '.jsx');
      const absoluteJsxPath = resolve(importerDir, jsxPath);

      if (existsSync(absoluteJsxPath)) {
        return absoluteJsxPath;
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [react(), resolveJsToJsx()],
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  test: {
    environment: 'jsdom',
    snapshotFormat: {
      maxOutputLength: 1e8,
    },
  },
});
