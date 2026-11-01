import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * Dev: `npm run dev` runs Vite normally.
 * Build: `npm run build` embeds CSS and JavaScript in one dist/index.html.
 */
export default defineConfig({
  // Avoid leaving the unused Vite scaffold assets in dist/.
  publicDir: false,
  plugins: [react(), viteSingleFile()],
});
