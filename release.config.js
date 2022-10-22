module.exports = {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/github",
            {
                assets: [{ path: "temp/*.tgz", name: "Bundled NPM Library" }],
            },
        ],
    ],
};
