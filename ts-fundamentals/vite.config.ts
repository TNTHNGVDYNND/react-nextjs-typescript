import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

// - Uses new URL() for proper URL parsing instead of brittle endsWith string matching
// - Scoped to only serve files inside src/lessons/ — can no longer access arbitrary .ts files like vite.config.ts
// - Early return pattern for cleaner control flow
export default defineConfig({
  plugins: [
    {
      name: 'serve-raw-source',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url || !req.headers.host) {
            next();
            return;
          }

          let parsed: URL;
          try {
            parsed = new URL(req.url, `http://${req.headers.host}`);
          } catch {
            next();
            return;
          }

          if (!parsed.searchParams.has('raw')) {
            next();
            return;
          }

          const root = server.config.root;
          const filePath = path.resolve(root, parsed.pathname.slice(1));

          // Only serve .ts files inside src/lessons/
          const lessonsDir = path.resolve(root, 'src/lessons');
          if (
            filePath.endsWith('.ts') &&
            filePath.startsWith(lessonsDir + path.sep) &&
            fs.existsSync(filePath)
          ) {
            const content = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
            return;
          }

          next();
        });
      },
    },
  ],
});
