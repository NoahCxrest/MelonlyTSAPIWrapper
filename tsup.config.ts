import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: true,
  treeshake: true,
  target: 'es2020',
  outDir: 'dist',
  banner: {
    js: '/* Melonly API Client - Official TypeScript SDK */',
  },
  esbuildOptions(options) {
    options.drop = ['console', 'debugger'];
  },
});