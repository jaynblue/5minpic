import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
	watch: NODE_ENV == 'development',
	devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
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
	resolve: {
		alias: {
			'~': __dirname + '/frontend'
		}
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
		// new webpack.optimize.UglifyJsPlugin({minimize: true}),
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
