import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "src/generated/**",
      "prisma/migrations/**",
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "next-env.d.ts"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // next/core-web-vitals ships jsx-a11y but leaves these off. Each rule below
    // maps to a defect class found in the accessibility audit: unlabelled form
    // fields, and aria attributes on elements that don't support them.
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "jsx-a11y/label-has-associated-control": [
        "error",
        { assert: "either", depth: 3 },
      ],
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
];

export default eslintConfig;
