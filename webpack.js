// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts',
    },
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['.ts'],
        }),
        new HtmlWebpackPlugin({
            title: 'Noise',
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        static: './dist',
        hot: true,
    },
}
