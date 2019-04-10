'use strict';
var path = require('path')
var webpack = require('webpack')

var loaders = [
	{
    test: /\.[jt]sx?$/,
    loader: 'babel-loader'
	},
];
var extensions = [
  '.ts', '.tsx'
];

module.exports = [{
	module: {
		rules: loaders,
	},
	entry: {
		main: './src/main.tsx',
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js'
	},
	resolve: {
		extensions: extensions,
		modules: [
			__dirname,
			path.resolve(__dirname, "src"),
			"node_modules"
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		})
	]
}];