

export interface TailwindAsyncConfigParams {
    /**
     * The path to your async Tailwind CSS config file
     */
    configPath: string;

    /**
     * Using bun.js to load your file (if your file is a typescript file you should use this)
     */
    useBun?: boolean;
}
