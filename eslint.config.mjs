// Import necessary modules
import globals from "globals";
import js from "@eslint/js"; // ESLint's built-in JS rules
import tseslint from "typescript-eslint"; // TypeScript ESLint plugins and configs
import eslintConfigPrettier from "eslint-config-prettier"; // Turns off ESLint rules that conflict with Prettier

// Define the ESLint configuration array
export default [
  // 1. Configuration for all files (general settings)
  {
    // Files to apply this configuration to
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    // Language options: defines the environment and parser settings
    languageOptions: {
      // Global variables available in the environment (e.g., Node.js globals)
      globals: globals.node,
      // The parser to use for TypeScript files
      parser: tseslint.parser,
      // Parser options, crucial for TypeScript-aware linting
      parserOptions: {
        project: './tsconfig.json', // IMPORTANT: Points ESLint to your tsconfig.json for type-aware rules
        ecmaVersion: 2022, // Or 'latest' for the newest ECMAScript features
        sourceType: 'module', // Indicates that your code uses ES modules (import/export)
      },
    },
  },

  // 2. Extend recommended configurations
  // ESLint's recommended JavaScript rules
  js.configs.recommended,

  // TypeScript ESLint's recommended rules (basic TypeScript checks)
  ...tseslint.configs.recommended,

  // TypeScript ESLint's stylistic rules (enforces consistent style for TS code)
  ...tseslint.configs.stylistic,

  // Optional: Add stricter type-checked rules for higher quality
  // Uncomment these lines when you're comfortable with more strictness.
  // They require `parserOptions.project` to be correctly set.
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked, // Very strict, might be too much initially

  // 3. Custom rules and overrides for TypeScript files
  {
    files: ["**/*.ts"], // Apply these specific rules only to TypeScript files
    rules: {
      // Example: Enforce explicit function return types (can be 'off' initially, then 'warn', then 'error')
      "@typescript-eslint/explicit-function-return-type": "off",

      // Example: Warn about unused variables, but ignore those starting with an underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // Example: Allow empty functions (e.g., for interface implementations)
      "@typescript-eslint/no-empty-function": "off",

      // Example: Enforce naming conventions (e.g., camelCase for variables, PascalCase for types)
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
      ],

      // Add any other custom rules you find useful or are common in your target companies
    },
  },

  // 4. Prettier integration (MUST BE LAST)
  // This turns off all ESLint rules that might conflict with Prettier's formatting.
  // Prettier will handle the formatting, ESLint will handle the code quality.
  eslintConfigPrettier,

  // 5. Ignore files and directories
  {
    ignores: ["dist/", "node_modules/", "*.js"], // Ignore compiled JS files, node_modules, etc.
  },
];