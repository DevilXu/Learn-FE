//webapck.config.js
const path = require("path");

module.exports = {
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "package.js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve("loader.js"),
                        options: {
                            work: '996',
                            sick: 'ICU',
                        }
                    },
                    {
                        loader: path.resolve("babels.js"),
                    }
                ]
            }
        ]
    }
};