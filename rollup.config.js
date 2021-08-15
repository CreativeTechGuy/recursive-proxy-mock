import path from "path";
import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import bundleSize from "rollup-plugin-bundle-size";
import ttypescript from "ttypescript";

const typescriptPluginConfig = {
    typescript: ttypescript,
    noEmitOnError: true,
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
            file: "./dist/cjs/index.js",
            format: "cjs",
            sourcemap: true,
        },
        plugins: [
            typescript(typescriptPluginConfig),
            babel({ babelHelpers: "bundled", extensions: [".js", ".ts"] }),
            nodeResolve(),
            commonjs(),
            bundleSize(),
        ],
    },
    {
        input: "./src/index.ts",
        output: {
            dir: "./dist/esm",
            format: "esm",
            sourcemap: true,
            preserveModules: true,
        },
        plugins: [
            typescript({
                ...typescriptPluginConfig,
                outDir: "./dist/esm",
                declarationDir: "./dist/esm",
            }),
            getBabelOutputPlugin({
                configFile: path.resolve(__dirname, "babel.config.js"),
            }),
            nodeResolve(),
            commonjs(),
        ],
    },
];
