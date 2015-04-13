var webpack = require("webpack"),
	_ = require("lodash");
module.exports = {
  entry: ['.'],
  output: {
	path: __dirname + "/dist",
    contentBase: "dist/",
    publicPath: "dist/",
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
      loader: "style!css!less"
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
  ]
};
