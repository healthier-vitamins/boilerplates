const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        client: {
            overlay: true
        },
        liveReload: false,
        hot: true,
        allowedHosts: 'all',
        historyApiFallback: true,
        host: 'localhost',
        port: '3000',
        open: true,
        compress: true
    }
})
