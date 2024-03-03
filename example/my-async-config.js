// This is an example of how to use an async function to return a configuration object
// Please note that the async function must be a commonjs module

const MyAsyncConfig = async () => {
    // Simulate an async operation
   await fetch('https://jsonplaceholder.typicode.com/todos/1')

    return {
        extend: {
            colors: {
                'primary': '#FF6363',
            }
        },
    }
}

module.exports = MyAsyncConfig;
