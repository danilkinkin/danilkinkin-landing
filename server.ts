/// <reference lib="deno.ns" />

import fs from "node:fs/promises";
import type { Context } from "hono";
import { Hono } from "hono";
import { getServerEnv } from "@utils/helpers/getEnv.ts";
import { serveStatic } from "hono/deno";
import type { ViteDevServer } from "vite";
import type { render as renderPage } from "./src/entry-server.tsx";

// Constants
const isProduction = import.meta.env?.PROD ?? false;
const port = getServerEnv("PORT", 3000);
const base = getServerEnv("BASE_URL", "/");
const apiUrl = getServerEnv("API_URL", "/");

console.log("");
console.log("%cRunning Configuration:", "color: cyan");
console.log("-----------------------");
console.log(
  `Environment: %c${isProduction ? "Production" : "Development"}`,
  "color: yellow",
);
console.log(`Port: %c${port}`, "color: green");
console.log(`Base URL: %c${base}`, "color: green");
console.log(`API URL: %c${apiUrl}`, "color: green");
console.log("-----------------------");
console.log("");

const app = new Hono().basePath(base.slice(0, -1));

let vite: ViteDevServer | undefined;
let render: typeof renderPage;
let template: string;
let ssrManifest: Record<string, string[]> | undefined;

if (isProduction) {
  render = (await import("./src/entry-server.tsx")).render;
  template = await fs.readFile("./dist/client/index.html", "utf-8");
  ssrManifest = JSON.parse(
    await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8"),
  ) as Record<string, string[]>;
} else {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });

  // Preload the ssr module to avoid delay on first request
  console.log("Vite loading ssr module...");
  const start = performance.now();
  await vite.ssrLoadModule("./src/entry-server.tsx");
  const end = performance.now();
  console.log(
    `Vite load ssr module for %c${(end - start).toFixed(2)}ms`,
    "color: green",
  );
}

// If we run in dev mode, we need to read the template and render function
// every time we render a page
const updateDevTemplateAndRender = async (url: string): Promise<void> => {
  if (!vite) throw new Error("Vite dev server is not initialized");

  let templateFile = await fs.readFile("./index.html", "utf-8");
  templateFile = await vite.transformIndexHtml(url, templateFile);
  const mod = await vite.ssrLoadModule("./src/entry-server.tsx");

  template = templateFile;
  render = mod.render;
  ssrManifest = undefined;
};

// Serve HTML
const renderHtml = async (context: Context) => {
  const stats: Array<[string, number]> = [["Start", performance.now()]];
  const url = context.req.url.replace(base, "");
  const path = context.req.path;

  try {
    stats.push(["Preparing", performance.now()]);

    if (!isProduction) await updateDevTemplateAndRender(url);
    stats.push(["Read template", performance.now()]);

    const rendered = await render(path, ssrManifest, stats);

    const html = template
      .replace("<!--app-head-->", rendered.head ?? "")
      .replace("<!--app-body-->", rendered.body ?? "")
      .replace("<!--app-lang-->", rendered.lang ?? "")
      .replace("<!--app-theme-->", rendered.theme ?? "light")
      .replace("<!--app-size-->", rendered.size ?? "large");

    return context.html(html);
  } catch (e) {
    if (!(e instanceof Error)) {
      console.error("Unknown error during ssr render:", e);
      return context.text(String(e), 500);
    }

    if (!isProduction) {
      if (!vite) throw new Error("Vite dev server is not initialized");
      vite.ssrFixStacktrace(e);
    }
    console.error(e.stack);
    return context.text(e.stack || "No stack", 500);
  }
};

// Middleware to ignore special paths.
// In production it's on balancer side, but in development it's annoying
app.use("*", async (c, next) => {
  const ignoredPrefixes = ["/.well-known/"];
  if (ignoredPrefixes.some((prefix) => c.req.path.startsWith(prefix))) {
    return c.text("Not found", 404);
  }
  await next();
});

// Special case for serving the root page. Because we need process index.html, not just serve it.
app.use(base, renderHtml);

if (!isProduction) {
  if (!vite) throw new Error("Vite dev server is not initialized");

  // Connect to Vite dev server
  const { connectToWeb } = await import("@utils/_server/connectToWeb/index.ts");
  const webHandler = connectToWeb(vite.middlewares);

  app.use(async (c, next) => {
    const response = await webHandler(c.req.raw);

    if (!response) await next();
    return response;
  });
} else {
  app.use(
    "/*",
    serveStatic({
      root: "./dist/client",
      precompressed: true,
      rewriteRequestPath: (path) => path.replace(base, "/"),
    }),
  );
}

// Process all pages
app.use("*", renderHtml);

Deno.serve(
  {
    port,
  },
  app.fetch,
);
