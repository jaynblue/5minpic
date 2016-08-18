var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-inline-module-source-map',
	entry: {
		vendor: [
            'react',
            'react-dom',
			'jquery',
			'webpack-hot-middleware/client'
        ],
		app: [
			'./frontend/index.js',
			'webpack-hot-middleware/client'
		]
	},
	output: {
		filename: 'js/[name].js',
		publicPath: '/',
		path: __dirname + '/public'
	},
	module: {
		loaders: [
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'assets/[name].[ext]'
                }
            },
			{
				test: /\.js$/,
				include: __dirname + '/frontend',
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('css/[name].css', { allChunks: true }),
		new HtmlWebpackPlugin(
			{
				template: __dirname + '/frontend/index.html',
				filename: 'index.html',
				inject: 'body',
				favicon: __dirname + '/frontend/assets/favicon.ico'
			}
		),
	]
}
