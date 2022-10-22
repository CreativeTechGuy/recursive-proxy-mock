module.exports = {
    "*": "prettier --write --ignore-unknown --loglevel warn",
    "*.{js,ts,json,md}": "cspell --no-progress --no-must-find-files",
    "*.{js,ts}": "eslint --max-warnings 0 --fix",
    "README.md": "npm run readme-toc",
};
