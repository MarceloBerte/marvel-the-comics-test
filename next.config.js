const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/comics',
				permanent: true,
			},
		];
	},
	images: {
		domains: ['i.annihil.us'],
	},
};

module.exports = nextConfig;
