var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	watch: false,
	devtool: null,
	entry: {
		vendor: [
            'react',
            'react-dom',
			'jquery'
        ],
		app: './frontend/index.js'
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
	postcss() {
        return [
            autoprefixer({
                browsers: [
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 2 Safari versions',
                    'last 2 Explorer versions'
                ]
            })
        ];
    },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'js/[name].js'),
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new ExtractTextPlugin('css/[name].css', { allChunks: true }),
		new HtmlWebpackPlugin(
			{
				template: __dirname + '/frontend/index.html',
				filename: 'index.html',
				inject: 'body',
				favicon: __dirname + '/frontend/assets/favicon.ico'
			}
		),
		new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
	]
}
