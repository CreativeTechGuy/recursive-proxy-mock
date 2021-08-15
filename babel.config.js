module.exports = (api) => {
    const isTest = api.env("test");
    const config = {
        plugins: [],
        presets: [
            [
                "@babel/env",
                {
                    bugfixes: true,
                    useBuiltIns: "usage",
                    corejs: 3,
                    shippedProposals: true,
                    ...(isTest
                        ? {
                              targets: {
                                  node: "current",
                              },
                          }
                        : {}),
                },
            ],
        ],
    };
    if (isTest) {
        config.presets.push([
            "@babel/typescript",
            {
                allowDeclareFields: true,
                onlyRemoveTypeImports: true,
            },
        ]);
    }
    return config;
};
