import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: parseInt(process.env.PORT || "5174") || 5174,
//   },
// });
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  };
});
