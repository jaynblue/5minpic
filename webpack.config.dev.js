const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	devtool: 'cheap-inline-module-source-map',
	entry: {
		vendor: [
			'react',
			'react-dom',
			'webpack-hot-middleware/client'
		],
		app: [
			'babel-polyfill',
			'./frontend/index.js',
			'webpack-hot-middleware/client'
		]
	},
	output: {
		filename: 'js/[name].js',
		publicPath: '/',
		path: path.join(__dirname, '/public')
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
				include: path.join(__dirname, '/frontend'),
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
				template: path.join(__dirname, '/frontend/index.html'),
				filename: 'index.html',
				inject: 'body',
				favicon: path.join(__dirname, '/frontend/assets/favicon.ico')
			}
		)
	]
};
