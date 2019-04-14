const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

const PATHS = {
    public: path.resolve(__dirname, 'public'),
	components: path.resolve(__dirname, 'public/components'),    
	scripts: path.resolve(__dirname, 'public/scripts'),
    images: path.resolve(__dirname, 'public/images'),
    modules: path.resolve(__dirname, 'public/modules'),
    utils: path.resolve(__dirname, 'public/utils'),
    views: path.resolve(__dirname, 'public/views'),
	build: path.resolve(__dirname, 'public/build')
}

module.exports = {
    entry: PATHS.public + "/main.js",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
    },

    output: {
		path: PATHS.build,
		filename: 'bundle.js'
    },
    
    plugins: [
        new ServiceWorkerWebpackPlugin({
			entry: PATHS.public + "/sw.js",	
		}),
    ]
}