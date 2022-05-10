const webpack = require('webpack');

module.exports = {
	webpack: {
		alias: {},
		plugins: {
			add: [
				new webpack.ProvidePlugin({
					process: 'process/browser',
					Buffer: ['buffer', 'Buffer']
				})
			]
		},
		configure: (config) => {
			config.resolve.fallback = {
				assert: require.resolve('assert'),
				buffer: require.resolve('buffer'),
				fs: require.resolve('brfs'),
				path: require.resolve('path-browserify'),
				util: require.resolve('util'),
				os: require.resolve('os-browserify')
			};

			return config;
		}
	}
};
