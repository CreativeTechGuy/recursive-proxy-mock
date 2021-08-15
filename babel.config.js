const packageJSON = require("./package.json");

const transformRuntimeVersion = packageJSON.devDependencies["@babel/plugin-transform-runtime"];

module.exports = (api) => {
    const isTest = api.env("test");
    const config = {
        plugins: [
            [
                "@babel/transform-runtime",
                {
                    corejs: 3,
                    version: transformRuntimeVersion,
                },
            ],
        ],
        presets: [],
    };
    if (isTest) {
        config.presets.push(
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
            ]
        );
    } else {
        config.presets.push([
            "@babel/env",
            {
                bugfixes: true,
                useBuiltIns: false,
                shippedProposals: true,
            },
        ]);
    }
    return config;
};
