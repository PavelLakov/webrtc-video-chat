import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // same as 0.0.0.0 (LAN accessible)
    port: 5173,
    strictPort: true,
  },
});
