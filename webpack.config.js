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
}

module.exports = {
    entry: [
        PATHS.components + '/About/About.tmpl.js',
        PATHS.components + '/Board/Board.tmpl.js',
        PATHS.components + '/Profile/Profile.tmpl.js',
        PATHS.components + '/SignIn/SignIn.tmpl.js',
        PATHS.components + '/SignUp/SignUp.tmpl.js',
        PATHS.public + '/main.js'
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
            // {
            //     test: /\.xml$/,
            //     use: [
            //       {
            //         loader: 'fest-webpack-loader'
            //       }
            //     ]
            // }
        ],
    },

    output: {
		path: PATHS.public,
		filename: 'bundle.js'
    },
    
    plugins: [
        new ServiceWorkerWebpackPlugin({
			entry: PATHS.public + "/service-worker.js",	
		}),
    ]
}