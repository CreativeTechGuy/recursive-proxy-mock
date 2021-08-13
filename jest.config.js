module.exports = {
    clearMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["text-summary", "lcov"],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 99,
            lines: 99,
            statements: 95,
        },
    },
    errorOnDeprecated: true,
    moduleNameMapper: {
        "test/(.*)$": "<rootDir>/test/$1",
        "~/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
    globalTeardown: "<rootDir>/test/teardown.ts",
    timers: "fake",
    verbose: true,
};
