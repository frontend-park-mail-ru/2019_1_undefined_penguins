var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');


module.exports = {
    entry: "./public/main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
			entry: path.join(__dirname, 'public/sw.js'),	
		}),
    ]
}