module.exports = {
    "*": "prettier --write --ignore-unknown",
    "*.{js,ts,json,md}": "cspell --no-must-find-files",
    "*.{js,ts}": "eslint --max-warnings 0 --fix",
    "README.md": "npm run readme-toc",
};
