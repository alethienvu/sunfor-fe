import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';
const { visualizer } = require('rollup-plugin-visualizer');

const resolvePath = (dir: string) => {
  return path.resolve(__dirname, 'src', dir);
};

export default defineConfig({
  // This base to deploy githubPage only 
  // (https://vitejs.dev/guide/static-deploy.html#github-pages)
  base: `/${packageJson.name}/`,
  plugins: [vue()],
  resolve: {
    alias: {
      assets: resolvePath('assets'),
      core: resolvePath('core'),
      store: resolvePath('store'),
      modules: resolvePath('modules'),
      layouts: resolvePath('layouts'),
      router: resolvePath('router'),
      components: resolvePath('components'),
      utils: resolvePath('utils'),
      services: resolvePath('services'),
      types: resolvePath('types'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks(id) {
          if (id.includes('element-plus')) {
            return 'elm';
          }
          if (id.includes('src')) {
            return 'src';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {}
});
