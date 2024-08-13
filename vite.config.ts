import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kblocks",
  server: {
    port: 5175,
    host: true,
  },
  plugins: [react()],
});
