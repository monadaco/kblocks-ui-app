import { defineConfig } from "vite";
import { dependencies } from './package.json';

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kblocks",
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
  }
});
