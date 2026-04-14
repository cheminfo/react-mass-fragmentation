import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    snapshotFormat: {
      maxOutputLength: 1e8,
    },
  },
});
