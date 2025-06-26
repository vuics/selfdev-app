import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { defineConfig, loadEnv, } from "vite";
import react from "@vitejs/plugin-react";
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [
      react(),
      devServerPlugin(),
      svgr(),
    ],
    build: {
      sourcemap: true,
      outDir: "build",
    },
  };
});

// Setup HOST, SSL, PORT
// Migration guide: Follow the guides below
// https://vitejs.dev/config/server-options.html#server-host
// https://vitejs.dev/config/server-options.html#server-https
// https://vitejs.dev/config/server-options.html#server-port
function devServerPlugin() {
  return {
    name: "dev-server-plugin",
    config(_, { mode }) {
      const { HOST, PORT, HTTPS, SSL_CRT_FILE, SSL_KEY_FILE } = loadEnv(mode, ".", ["HOST", "PORT", "HTTPS", "SSL_CRT_FILE", "SSL_KEY_FILE"]);
      const https = HTTPS === "true";
      return {
        server: {
          host: HOST || "0.0.0.0",
          port: parseInt(PORT || "3000", 10),
          open: true,
          ...(https &&
            SSL_CRT_FILE &&
            SSL_KEY_FILE && {
            https: {
              cert: readFileSync(resolve(SSL_CRT_FILE)),
              key: readFileSync(resolve(SSL_KEY_FILE)),
            },
          }),
        },
      };
    },
  };
}
