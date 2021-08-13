module.exports = {
    "*": "prettier --write --ignore-unknown",
    "*.{js,ts,json,md}": "cspell",
    "*.{js,ts}": "eslint --max-warnings 0 --fix",
    "README.md": "npm run readme-toc",
};
