export default {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    rules: {
        "no-console": "warn",
        "no-restricted-exports": [
            "error",
            {
                restrictDefaultExports: {
                    direct: true,
                    named: true,
                    defaultFrom: true,
                    namedFrom: true,
                    namespaceFrom: true,
                },
            },
        ],
        "no-restricted-syntax": [
            "error",
            { selector: "TSInterfaceDeclaration", message: "Please use the 'type' keyword instead." },
        ],
        quotes: ["warn", "double", { avoidEscape: true }],
    },
};
