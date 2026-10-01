import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        inicio: resolve(projectRoot, 'html/index.html'),
        projetos: resolve(projectRoot, 'html/projetos.html'),
        cadastro: resolve(projectRoot, 'html/cadastro.html')
      }
    }
  }
});