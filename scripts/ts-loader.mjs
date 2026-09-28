// A tiny loader so Node can import the site's TypeScript content files without a build step.
// It strips type annotations with TypeScript's own transpiler and rewrites the "@/" alias.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = process.cwd();

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(root, "src", specifier.slice(2));
    for (const candidate of [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
      try {
        await readFile(candidate);
        return { url: pathToFileURL(candidate).href, shortCircuit: true };
      } catch {
        // try the next one
      }
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".ts") || url.endsWith(".tsx")) {
    const source = await readFile(fileURLToPath(url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.Preserve },
      fileName: url,
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return next(url, context);
}
