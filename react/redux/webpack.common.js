const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const process = require('process')

dotenv.config()

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
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
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
                test: /\.(png|jpg|gif|mp3)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                },
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
