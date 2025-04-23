const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const process = require('process')

dotenv.config()

// Serialise env into webpack
// See https://webpack.js.org/plugins/environment-plugin/
const envKeyValues = Object.keys(process.env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(process.env[key])
    return acc
}, {})

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js',
        publicPath: '/'
    },
    resolve: {
        modules: [resolve('./src'), resolve('./node_modules')],
        extensions: ['.js', '.jsx', '.css', '.scss', '.ts', '.tsx', '.json']
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new webpack.DefinePlugin(envKeyValues),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.[fullhash].css',
            chunkFilename: 'bundle.[fullhash].css'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser.js'
        })
    ],
    optimization: {
        // tree shaking
        usedExports: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    // this is selected by default, here for informational purposes
                    configFile: path.resolve(__dirname, './babel.config.json')
                },
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         publicPath: './'
                    //     }
                    // },
                    'style-loader',
                    'css-loader',
                    //? for sass (however tailwind does not like sass)
                    //* this is needed for sass relative path handling
                    // 'resolve-url-loader'
                    // {
                    //     loader: 'sass-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // }

                    //? tailwind setup
                    // https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 8192
                //     }
                // },
                // ? Maintain file location and extensions
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                },
                use: ['svgo-loader'] // optional: Use svgo loader to optimize svg files
            }
        ]
    }
}
