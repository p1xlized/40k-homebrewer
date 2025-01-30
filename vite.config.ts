import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import tsconfigPaths from "vite-plugin-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
})
