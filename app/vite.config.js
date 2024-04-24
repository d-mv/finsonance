import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import version from "vite-plugin-package-version";
import { inject, minify } from "./src/lib/vite-parse-html.mjs";

const ENV_VARS_PREFIX = "ENV_";

console.error = (messages, ...rest) => {
  if (messages?.message?.includes("Duplicate atom key")) {
    return;
  }

  console.warn(messages, ...rest);
};

const plugins = [
  inject({
    path: `${__dirname}/index.html`,
  }),
  minify({
    isMinify: true,
  }),
  react(),
  version(),
];

export default defineConfig(({ mode }) => {
  const envs = {
    ...loadEnv(mode, __dirname, ENV_VARS_PREFIX),
    NODE_ENV: mode,
    version: process.env.npm_package_version,
  };

  const wsServer = envs["ENV_API_URL"];
  // .replace("http", "ws");

  const isDevelopment = mode === "development";

  return {
    test: {
      environment: "jsdom",
    },
    globals: true,
    define: {
      envs,
    },
    esbuild: {
      define: {
        global: "globalThis",
      },
    },
    envPrefix: ENV_VARS_PREFIX,
    build: {
      chunkSizeWarningLimit: 100_000, // 100kb
    },
    server: {
      port: 3000,
      host: "127.0.0.1",
      proxy: {
        [`/api/v${envs["ENV_API_VERSION"]}`]: {
          target: envs["ENV_API_URL"],
          changeOrigin: true,
        },
        [`/socket.io`]: {
          target: wsServer,
          changeOrigin: true,
          ws: true,
          // rewrite: path => path.replace(/^\/ws/, "")
        },
      },
    },
    plugins,
    resolve: {
      alias: {
        "@assets": resolve(__dirname, "src", "assets"),
        "@api": resolve(__dirname, "src", "api"),
        "@services": resolve(__dirname, "src", "services"),
        "@components": resolve(__dirname, "src", "shared", "components"),
        "@layouts": resolve(__dirname, "src", "layouts"),
        "@pages": resolve(__dirname, "src", "pages"),
        "@widgets": resolve(__dirname, "src", "widgets"),
        "@shared": resolve(__dirname, "src", "shared"),
        "@store": resolve(__dirname, "src", "shared", "store"),
        "@utils": resolve(__dirname, "src", "shared", "utils"),
      },
    },
  };
});
