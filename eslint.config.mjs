import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: ["node_modules/**", ".next/**", "legacy-static/**", "data/**"],
  },
];

export default config;
