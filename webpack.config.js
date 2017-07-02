
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devtool = mode !== 'production' ? 'cheap-module-eval-source-map' : undefined;
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
                options: {
                    extra: `-D build_mode=${mode}`
                }
            },
            {
                test: /\.(png|jpg|json)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack + Haxe example'
        })
    ],
};
