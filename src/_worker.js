const _worker = async () => {
    const targetPath = process.argv[2];
    const asyncConfigModule = await import(targetPath)
    const asyncConfig = asyncConfigModule?.default ? asyncConfigModule.default : asyncConfigModule;
    if (typeof asyncConfig !== "function"){
        throw new Error(`${targetPath} does not have a valid default export`);
    }
    const config = await asyncConfig();
    if (typeof config !== "object"){
        throw new Error(`${targetPath} does not return a valid object`);
    }

    return config
};

try {
    _worker().then((r) => process.stdout.write(JSON.stringify(r)));
} catch (e) {
    console.error("failed to run the worker! please check the logs for more information.");
    throw e;
}
