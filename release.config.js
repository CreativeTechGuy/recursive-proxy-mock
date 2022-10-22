module.exports = {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/github",
            {
                // eslint-disable-next-line no-template-curly-in-string -- This is a lodash template string
                assets: [{ path: "temp/*.tgz", name: "recursive-proxy-mock-${nextRelease.gitTag}.tgz" }],
            },
        ],
    ],
};
