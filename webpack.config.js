var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/js/entry.js'
	},
	output: {
		path: path.resolve(__dirname, "dist"),  //所有处理的文件的输出路径
		filename: 'js/[name].[hash].js',			//bundle的输出路径/dist/js/
		publicPath: "/webpack/dist/"
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=img/[hash].[ext]'}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
            $: 'jquery'
        }),
		new ExtractTextPlugin('css/[name].[hash].css'),    //单独使用style标签加载css并设置其路径
		new HtmlWebpackPlugin({
			favicon: '',
			filename: 'view/index.html',   //生成的文件及命名，还有设置输出路径
			template: './src/view/template.html'
		}),
		new webpack.optimize.UglifyJsPlugin({
	      compressor: {
	        warnings: false,
	      },
	      except: ['$super', '$', 'exports', 'require']    //排除关键字
	    })
	],
	resolve: {
		// require时省略的扩展名，如：require('module') 不需要module.js
		extensions: ['', '.js', '.json', '.scss', '.css']
	},
	
}