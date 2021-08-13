module.exports = {
    presets: [
        [
            "@babel/env",
            {
                bugfixes: true,
                useBuiltIns: "usage",
                corejs: 3,
                shippedProposals: true,
            },
        ],
        [
            "@babel/typescript",
            {
                allowDeclareFields: true,
                onlyRemoveTypeImports: true,
            },
        ],
    ],
};
