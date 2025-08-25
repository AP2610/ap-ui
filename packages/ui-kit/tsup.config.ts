import path from 'path';
import fg from 'fast-glob';
import { defineConfig } from 'tsup';

const files = fg.sync('src/components/**/index.tsx');

// Build an entry map like { "button/index": "src/components/button/index.tsx", ... }
const entries = Object.fromEntries(
  files.map((p) => {
    // p = "src/components/tabs/tab-panel/index.tsx"
    const rel = path.relative('src/components', path.dirname(p)); // "tabs/tab-panel"
    const key = path.join(rel, 'index').replaceAll(path.sep, '/'); // "tabs/tab-panel/index"
    return [key, p];
  }),
);

// Add the barrel
entries['index'] = 'src/index.ts';

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  entry: entries,
  external: ['react', 'react-dom', 'motion'],
  noExternal: ['@ap/utils'],
  format: ['esm'],
  minify: !options.watch,
  outDir: 'dist',
  sourcemap: true,
  splitting: true,
}));
