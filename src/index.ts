import {spawnSync} from "child_process";
import * as path from "path";
import {TailwindAsyncConfigParams} from "../types";


/**
 * Loads your tailwind config file asynchronously
 *
 * @param {Object} params
 * @param {String} params.configPath - The path to your tailwind config file
 * @param {Boolean=} [params.useBun] - Whether to use bun to load the file. If the file is a typescript file, this must be true
 *
 * @return {Object=} - The tailwind config object
 */
const TailwindAsyncConfig = (
    params: TailwindAsyncConfigParams
): object | undefined => {
    if (!params?.configPath || typeof params.configPath !== "string") throw new Error("You must provide a path to your async Tailwind CSS config file");
    const {configPath} = params;
    const useBun = typeof params.useBun === "boolean" ? params.useBun : false;
    const runtime = useBun ? "bun" : "node";

    if (configPath.endsWith(".ts") && !useBun) {
        throw new Error("You must use bun to load your file if it is a typescript file");
    }

    try {
        const {
            stdout,
            stderr
        } = spawnSync(runtime, [path.resolve(__dirname, "./_worker.js"), path.resolve(process.cwd(), configPath)]);

        if (stderr.toString()) throw stderr.toString();

        const tailwindConfigJson = JSON.parse(stdout.toString());
        return tailwindConfigJson;
    } catch (e) {
        console.error("failed to read tailwind config from worker.");
        console.error(e);
    }
};

export default TailwindAsyncConfig;
