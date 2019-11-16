module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['chrome >= 56']
				},
				useBuiltIns: 'usage',
				corejs: '2',
				modules: false
			}
		],
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		[
			'@babel/plugin-proposal-object-rest-spread',
			{
				useBuiltIns: true
			}
		]
	]
};
