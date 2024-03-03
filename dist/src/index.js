"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path = require("path");
/**
 * Loads your tailwind config file asynchronously
 *
 * @param {Object} params
 * @param {String} params.configPath - The path to your tailwind config file
 * @param {Boolean=} [params.useBun] - Whether to use bun to load the file. If the file is a typescript file, this must be true
 *
 * @return {Object=} - The tailwind config object
 */
var TailwindAsyncConfig = function (params) {
    if (!(params === null || params === void 0 ? void 0 : params.configPath) || typeof params.configPath !== "string")
        throw new Error("You must provide a path to your async Tailwind CSS config file");
    var configPath = params.configPath;
    var useBun = typeof params.useBun === "boolean" ? params.useBun : false;
    var runtime = useBun ? "bun" : "node";
    if (configPath.endsWith(".ts") && !useBun) {
        throw new Error("You must use bun to load your file if it is a typescript file");
    }
    try {
        var _a = (0, child_process_1.spawnSync)(runtime, [path.resolve(__dirname, "./_worker.js"), path.resolve(process.cwd(), configPath)]), stdout = _a.stdout, stderr = _a.stderr;
        if (stderr.toString())
            throw stderr.toString();
        var tailwindConfigJson = JSON.parse(stdout.toString());
        return tailwindConfigJson;
    }
    catch (e) {
        console.error("failed to read tailwind config from worker.");
        console.error(e);
    }
};
exports.default = TailwindAsyncConfig;
