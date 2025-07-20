import cssImportsPlugin from "./dynamic-imports-plugin.mjs";
import { context } from "esbuild";
import { argv } from "node:process";

const watch = argv.includes("--watch");

const ctx = await context({
  entryPoints: ["./vendor/cheerios/dumpsterfire-pages/src/js/Application.ts"],
  bundle: true,
  outfile: "public/dist/bundle.js",
  platform: "browser",
  format: "iife",
  absWorkingDir: process.cwd(),
  sourcemap: true,
  target: ["es2015"],
  resolveExtensions: [".ts", ".js", ".json"],
  loader: {
    ".css": "css",
  },
  tsconfig: "./tsconfig.json",
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": '"development"',
  },
  plugins: [cssImportsPlugin()],
});

if (watch) {
  await ctx.watch();
  console.log("Watching...");
} else {
  await ctx.rebuild();
  ctx.dispose();
}
