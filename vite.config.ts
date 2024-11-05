/// <reference types='vite/client' />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log("[vite]", process.env.VITE_BASE_URL);

  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_URL || "/",
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
  });
};
