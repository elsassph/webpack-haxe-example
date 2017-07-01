
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devtool = process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : undefined;
const dist = __dirname + "/www/";

module.exports = {
    entry: {
        client: './build.hxml'
    },
    output: {
        path: dist,
        filename: '[name].[hash:7].js'
    },
    devtool,
    devServer: {
        contentBase: dist,
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.hxml$/,
                loader: 'haxe-loader',
            },
            {
                test: /\.(png|jpg|json)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack+Haxe example'
        })
    ],
};
