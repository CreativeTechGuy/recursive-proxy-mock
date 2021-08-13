# Contributing

## Reporting issues or suggesting features

-   First [search the open issues](https://github.com/CreativeTechGuy/recursive-proxy-mock/issues) to see if someone has already created a similar issue
-   If you find an existing issue, sit tight. Please do not comment just to say "+1" or "me too".
-   If your issue is unique, [file a new issue here](https://github.com/CreativeTechGuy/recursive-proxy-mock/issues/new/choose).

## Getting started

**BEFORE YOU START**: Please create an issue that documents your change before you submit a PR.

1. Fork the repository
1. Install dependencies by running `npm install`
1. Run `npm run release` to ensure the package builds successfully without any changes
1. Write the code for your feature/fix
1. Write tests for the change - ensuring that every code branch is effectively tested
1. Update the documentation as necessary
1. Run `npm run release` before committing to ensure the code passes all tests/linters/etc
1. Commit your changes following the [Commit message conventions](#commit-message-conventions) below
1. Submit a PR for review

## Commit message conventions

We are following the Conventional Commits format as popularized by [the Angular commit format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format). This is enforced by [commitlint](https://github.com/conventional-changelog/commitlint) and used to automatically publish new versions with [semantic-release](https://github.com/semantic-release/semantic-release).

At a minimum, every commit message should include following:

```
<type>: <short summary>
```

You can optionally include a body or footer if there's additional information that's important to add to the commit message:

```
<type>: <short summary>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### type

Must be one of the following:

-   `fix`: Bug fix (PATCH version)
-   `perf`: Performance improvement (PATCH version)
-   `feat`: New feature (MINOR version)
-   `refactor`: Changes source code without affecting functionality in any way (no new version)
-   `docs`: Update documentation only (no new version)
-   `test`: Add/update/fix test (no new version)

### short summary

A brief description of the change. Use the imperative, present tense: "fix" not "fixed" nor "fixes".

### body

Additional information to expand on the short summary

### footer

If the change is a breaking change, be sure to start this section with `BREAKING CHANGE: <breaking change summary>` and go on to summarize the migration instructions.
