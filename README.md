# Tailwind Async Config.

### Use an async function to generate your Tailwind CSS config.

## Usage:

* Install the package:

```bash
  npm install tailwind-async-config
```

* Create a file to wrap your async function

  * if you are not using Bun, Then this file should be a commonjs module that has a default export of an async function that returns your tailwind
    config.
  * you can not use your tsconfig paths in this file, you must use relative paths.
  * This is an example of what the file should look like:
    ```javascript
      const MyAsyncConfig = async () => {
        // Simulate an async operation
       await fetch('https://jsonplaceholder.typicode.com/todos/1')
    
        return {
            extend: {
                colors: {
                    'primary': '#FF6363'
                }
            }
        }
    }
    
    module.exports = MyAsyncConfig;
    ```
  * Use your file in your tailwind.config.js
  ```javascript
        const TailwindAsyncConfig = require("../dist/src/index").default;
    /** @type {import('tailwindcss').Config} */
        module.exports = {
            content: ["index.html"],
            theme: TailwindAsyncConfig({
                configPath: "./my-async-config.js",
                useBun: false,
            }),
            plugins: [],
        }
  ```
* If you are using Bun, you must set the useBun option to true, and you must use es module in your async config file.
* now you can run your project
  ```bash
      npx tailwindcss -i ./src/styles.css -o ./dist/styles.css
  ```
* there is an example at [example](https://github.com/amirrezaDev1378/tailwind-async-config/tree/master/example)

## Options:

| Name       | Default | Description                                                                                          |
|------------|---------|------------------------------------------------------------------------------------------------------|
| configPath | -       | Path to your async config e.g. "my-async-config.js"                                                  |
| useBun     | false   | Whether to use Bun or not, if you are using typescript or es module you must set this option to true |
