const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const glob = require('glob')
const path = require('path')

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                // for typescript
                terserOptions: {
                    compress: true
                }
            }),
            ,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                }
            })
        ]
    },
    plugins: [
        new PurgeCSSPlugin({
            //? more purgeCss parameters
            // https://purgecss.com/configuration.html#options
            paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
                nodir: true
            })
        })
    ]
})
