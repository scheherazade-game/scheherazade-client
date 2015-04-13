var webpack = require("webpack"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['.'],
  output: {
	path: __dirname + "/www",
    contentBase: "www/",
    publicPath: "www/",
	filename: "index.js",
    sourceMapFilename: "index.js.map"
  },
  resolve: {
	alias: {},
    extensions: ["", ".js", ".jsx"],
	modulesDirectories: [__dirname, "node_modules"]
  },
  module: {
	loaders: [{
	  test: /(lib\/.*\.jsx?$)|(.*index.jsx?$)/,
	  loader: "babel"
	}, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap")
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=image/svg+xml"
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
