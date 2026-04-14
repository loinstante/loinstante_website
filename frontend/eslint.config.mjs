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
  ]),
  {
    rules: {
      "react/display-name": "off",
      "react/no-direct-mutation-state": "off",
      "react/no-unescaped-entities": "off",
      "react/no-render-return-value": "off",
      "react/no-string-refs": "off",
      "react/require-render-return": "off",
      "react/jsx-key": "off",
      "react/prop-types": "off",
    },
  },
]);

export default eslintConfig;
