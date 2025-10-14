import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Extend the base configs first
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Add an object to override specific rules to 'warn'
  {
    // The 'rules' key is where you override severities
    rules: {
      // Example: Change 'no-unused-vars' from 'error' (default in some configs) to 'warn'
      "no-unused-vars": "warn",

      // Example: If 'react/display-name' is causing an error, set it to 'warn'
      "react/display-name": "warn",

      // Example: If a Next.js-specific rule is failing the build, change it.
      // (You'd need to know the specific rule causing the error)
      "@next/next/no-img-element": "warn",

      // If you want to change ALL rules that are currently 'error' to 'warn'
      // This is generally NOT recommended as it masks critical issues,
      // but it's possible if you know the exact rules you're overriding.
    },
  },

  // 3. Keep your ignores list last
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;