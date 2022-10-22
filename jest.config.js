module.exports = {
    clearMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["text-summary", "lcov"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    errorOnDeprecated: true,
    moduleNameMapper: {
        "test/(.*)$": "<rootDir>/test/$1",
        "~/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
    globalTeardown: "<rootDir>/test/teardown.ts",
    fakeTimers: {
        enableGlobally: true,
    },
    verbose: true,
};
