import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
    include: /\.[jt]sx?$/,
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'tests/testSetup.ts',
    globals: true,
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
      exclude: ['**/node_modules/**'],
    },
  },
});
