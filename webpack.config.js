module.exports = {
	entry: [
		"bootstrap-webpack!./bootstrap.config.js",
		"./browser/main.jsx",
	],

	output: {
		path: __dirname + "/public",
		filename: "bundle.js",
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /browser\/.*\.jsx?$/, loader: "babel-loader", exclude: /(node_modules)/ },
			{ test: /node_modules\/.*\.jsx$/, loader: "babel-loader"},
			{ test: /\.(svg|eot|woff2?|ttf)$/, loader: "url-loader" }
		],
	},
};
