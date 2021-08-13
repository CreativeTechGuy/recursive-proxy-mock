import typescript from "@rollup/plugin-typescript";
import ttypescript from "ttypescript";

export default {
    input: "src/index.ts",
    output: {
        file: "./dist/index.js",
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        typescript({
            typescript: ttypescript,
            noEmitOnError: true,
            tsconfig: "./tsconfig.json",
            include: ["./src/**"],
            exclude: ["**/*.test.ts"],
            plugins: [
                { transform: "typescript-transform-paths" },
                { transform: "typescript-transform-paths", afterDeclarations: true },
            ],
        }),
    ],
};
