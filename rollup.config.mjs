import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import ttypescript from "ttypescript";

const typescriptPluginConfig = {
    typescript: ttypescript,
    noEmitOnError: true,
    sourceMap: true,
    sourceRoot: "..",
    tsconfig: "./tsconfig.json",
    include: ["./src/**"],
    exclude: ["**/*.test.ts"],
    plugins: [
        { transform: "typescript-transform-paths" },
        { transform: "typescript-transform-paths", afterDeclarations: true },
    ],
};

export default [
    {
        input: "./src/index.ts",
        output: {
            dir: "./dist/cjs",
            format: "cjs",
            sourcemap: true,
            sourcemapExcludeSources: true,
        },
        plugins: [
            typescript({
                ...typescriptPluginConfig,
                outDir: "./dist/cjs",
                declarationDir: "./dist/cjs",
            }),
            babel({ babelHelpers: "bundled", extensions: [".js", ".ts"] }),
            nodeResolve(),
            commonjs(),
            filesize(),
        ],
    },
    {
        input: "./src/index.ts",
        output: {
            dir: "./dist/esm",
            format: "esm",
            sourcemap: true,
            sourcemapExcludeSources: true,
            preserveModules: true,
        },
        plugins: [
            typescript({
                ...typescriptPluginConfig,
                outDir: "./dist/esm",
                declarationDir: "./dist/esm",
            }),
            getBabelOutputPlugin(),
            nodeResolve(),
            commonjs(),
        ],
    },
];
