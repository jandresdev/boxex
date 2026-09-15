import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy static site built by build.py — vendored/generated output,
    // not source we maintain (see docs/superpowers: do not modify dist/).
    "dist/**",
    // One-time CommonJS generator script, run directly with `node`.
    "scripts/generate-country-geo.cjs",
  ]),
]);

export default eslintConfig;
