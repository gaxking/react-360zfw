module.exports = {
	entry:[
		'./build/main.js'
	],
	output: {
		path: __dirname + '/lib/',
		publicPath: "./lib/",
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'jsx-loader?harmony'

		}, {
			test: /\.less/,
			loader: 'style-loader!css-loader!less-loader'

		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'

		}]

	}
};
