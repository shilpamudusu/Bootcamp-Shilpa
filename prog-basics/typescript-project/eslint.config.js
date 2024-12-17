import { ESLint } from "eslint";

export default [
  {
    ignores: ["dist"], // Ignore compiled files
  },
  {
    files: ["src/**/*.{ts,js}"], // Target TypeScript and JavaScript files in src/
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // Example TypeScript rule
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
  },
];
