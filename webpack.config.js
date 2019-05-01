const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require ("extract-text-webpack-plugin");
const path  =  require("path");

const  PATHS  =  {
    public:  path.resolve(__dirname,  "public"),
};

module.exports = {
    mode:  "development",
    entry: `${PATHS.public}/main.js`,

    module:  {
        rules:  [
            {
                test:  /\.js$/,
                exclude:  /node_modules/,
                loader:  "babel-loader",
            },
            {
                test:  /\.tmpl\.xml$/,
                loader:  "fest-webpack-loader",
            }, 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: "style-loader",
                        use: ["css-loader"]
                    })
            }, 
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "url-loader",
                options: {
                    name: "images/[name].[ext]",
                    limit: 4096
                },
            },
            {
                test: /\.(ico)$/,
                loader: "url-loader?limit=1&name=[name].[ext]",
            },
            {
                test: /\.(ttf)$/,
                loader: "url-loader?name=fonts/[name].[ext]",
            },
        ],
    },

    output:  {
        path:  PATHS.public,
        filename:  "bundle.js",
    },

    plugins:  [
        new  ServiceWorkerWebpackPlugin({
            entry:  `${PATHS.public}/service-worker.js`,
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html",
            inject: false,
        }),
        new ExtractTextPlugin({ filename: "bundle.css" }),
    ],
};
