module.exports = {
    root: true,
    env: {
        node: true,
        "vue/setup-compiler-macros": true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
        "plugin:storybook/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
            "off",
            {
                argsIgnorePattern: "^_",
            },
        ],
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                semi: true,
                useTabs: false,
                tabWidth: 2,
                trailingComma: "all",
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: "avoid",
                endOfLine: "auto",
            },
        ],
    },
};