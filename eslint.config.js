import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      globals: { ...js.environments.browser.globals }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": "error",
      "lines-between-class-members": ["error", "always"]
    }
  },
   "prettier" 
];
