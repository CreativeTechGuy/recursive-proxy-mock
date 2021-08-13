/*
    ESLint Rule Documentation Sites
        https://eslint.org/docs/rules/
        https://github.com/benmosher/eslint-plugin-import
        https://github.com/jest-community/eslint-plugin-jest
        https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
*/

module.exports = {
    plugins: ["@typescript-eslint", "jest", "import"],
    extends: ["eslint:recommended"],
    env: {
        es6: true,
        node: true,
    },
    reportUnusedDisableDirectives: true,
    parser: "@babel/eslint-parser",
    parserOptions: {
        sourceType: "module",
        requireConfigFile: false,
    },
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                sourceType: "module",
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
            files: ["*.ts"],
            rules: {
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",
                "no-array-constructor": "off",
                "@typescript-eslint/no-array-constructor": "error",
                "no-invalid-this": "off",
                "@typescript-eslint/no-invalid-this": "error",
                "no-loss-of-precision": "off",
                "@typescript-eslint/no-loss-of-precision": "error",
                "no-shadow": "off",
                "@typescript-eslint/no-shadow": "error",
                "no-throw-literal": "off",
                "@typescript-eslint/no-throw-literal": "error",
                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": "error",
                "@typescript-eslint/unbound-method": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/consistent-type-assertions": [
                    "warn",
                    {
                        assertionStyle: "as",
                        objectLiteralTypeAssertions: "never",
                    },
                ],
                "@typescript-eslint/consistent-type-imports": "warn",
                "@typescript-eslint/explicit-function-return-type": [
                    "error",
                    {
                        allowTypedFunctionExpressions: true,
                    },
                ],
                "@typescript-eslint/explicit-member-accessibility": "warn",
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/no-confusing-void-expression": "error",
                "@typescript-eslint/no-implicit-any-catch": [
                    "error",
                    {
                        allowExplicitAny: false,
                    },
                ],
                "@typescript-eslint/no-invalid-void-type": "error",
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
                "@typescript-eslint/no-unnecessary-condition": "warn",
                "@typescript-eslint/no-unnecessary-qualifier": "warn",
                "@typescript-eslint/no-unnecessary-type-constraint": "warn",
                "@typescript-eslint/non-nullable-type-assertion-style": "warn",
                "@typescript-eslint/prefer-for-of": "warn",
                "@typescript-eslint/prefer-optional-chain": "warn",
                "@typescript-eslint/prefer-readonly": "warn",
                "@typescript-eslint/prefer-ts-expect-error": "warn",
                "@typescript-eslint/prefer-string-starts-ends-with": "warn",
                "@typescript-eslint/require-array-sort-compare": "error",
                "@typescript-eslint/unified-signatures": "warn",
                "@typescript-eslint/array-type": "warn",
                "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
                "@typescript-eslint/member-delimiter-style": "warn",
                "@typescript-eslint/method-signature-style": "warn",
                "@typescript-eslint/naming-convention": [
                    "warn",
                    {
                        selector: "default",
                        format: ["camelCase"],
                    },
                    {
                        selector: ["function", "enumMember", "property"],
                        format: ["camelCase", "PascalCase"],
                    },
                    {
                        selector: "variable",
                        modifiers: ["const"],
                        format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                    },
                    {
                        selector: "typeProperty",
                        format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    },
                ],
                "@typescript-eslint/no-extraneous-class": "error",
                "@typescript-eslint/no-parameter-properties": "error",
                "@typescript-eslint/strict-boolean-expressions": [
                    "error",
                    {
                        allowString: false,
                        allowNumber: false,
                        allowNullableObject: false,
                    },
                ],
            },
        },
        {
            extends: ["plugin:jest/recommended", "plugin:jest/style"],
            files: ["*.test.js", "*.test.ts", "test/**"],
            rules: {
                "jest/no-if": "error",
                "jest/no-test-return-statement": "error",
                "jest/prefer-strict-equal": "error",
                "jest/require-top-level-describe": "error",
                "jest/consistent-test-it": [
                    "warn",
                    {
                        withinDescribe: "test",
                    },
                ],
                "jest/prefer-spy-on": "warn",
                "jest/lowercase-name": ["warn", { ignoreTopLevelDescribe: true }],
                "@typescript-eslint/naming-convention": "off",
            },
        },
    ],
    rules: {
        "no-loss-of-precision": "error",
        "no-template-curly-in-string": "error",
        "no-unsafe-optional-chaining": "error",
        "array-callback-return": "error",
        "consistent-return": "error",
        curly: "warn",
        "default-param-last": "error",
        eqeqeq: "error",
        "no-constructor-return": "error",
        "no-empty-function": "warn",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-return-assign": "warn",
        "no-script-url": "error",
        "no-self-compare": "warn",
        "no-sequences": "warn",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "warn",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-return": "warn",
        "prefer-promise-reject-errors": "error",
        radix: "error",
        "require-await": "error",
        "wrap-iife": ["warn", "inside"],
        "no-shadow": "error",
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-multi-assign": "warn",
        "no-new-object": "error",
        "no-useless-computed-key": "warn",
        "no-useless-rename": "warn",
        "no-var": "error",
        "prefer-const": "warn",
        "prefer-numeric-literals": "warn",
        "prefer-object-spread": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "prefer-template": "warn",
        "import/no-duplicates": "warn",
        "import/order": [
            "warn",
            {
                groups: ["builtin", "external", ["parent", "sibling", "internal", "index"]],
                pathGroups: [
                    {
                        pattern: "~/**",
                        group: "internal",
                    },
                    {
                        pattern: "test/**",
                        group: "internal",
                    },
                ],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
                "newlines-between": "never",
            },
        ],
        "no-else-return": "warn",
        "func-names": ["warn", "never"],
        "func-style": ["warn", "declaration"],
        "one-var": ["warn", "never"],
        "operator-assignment": "warn",
        "prefer-arrow-callback": "warn",
        "no-restricted-syntax": [
            "warn",
            {
                selector: "CallExpression[callee.name='String']",
                message: "Don't use the String function. Use .toString() instead.",
            },
            {
                selector: "CallExpression[callee.name='Number']",
                message: "Don't use the Number function. Use parseInt or parseFloat instead.",
            },
            {
                selector: "CallExpression[callee.name='Boolean']",
                message: "Don't use the Boolean function. Use a strict comparison instead.",
            },
        ],
    },
};
