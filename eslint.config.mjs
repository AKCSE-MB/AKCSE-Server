import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  {settings: {
    react: {
      version: "detect",
    },
  }},
  {rules: {
    "react/react-in-jsx-scope": "off",
  }},
  ...tseslint.configs.recommended,
];