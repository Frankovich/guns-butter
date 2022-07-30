import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'dist/index.js',
        output: {
            file: 'index.js'
        }
    },
    {
        input: 'dist/index.d.ts',
        output: {
            file: 'index.d.ts'
        },
        plugins: [dts()]
    }
]

/*
import dts from "rollup-plugin-dts";

const config = [
  // …
  {
    input: "./my-input/index.d.ts",
    output: [{ file: "dist/my-library.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
*/