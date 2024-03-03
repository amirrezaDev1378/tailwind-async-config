const TailwindAsyncConfig = require("../dist/src/index").default;
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["index.html"],
    theme: TailwindAsyncConfig({
        configPath: "./my-async-config",
        useBun: true,
    }),
    plugins: [],
}

