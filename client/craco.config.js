const path = require('path')
module.exports = {
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
		},
		devServer: {
			historyApiFallback: true,
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'main.js',
			publicPath: '/'
		},
	},
}
