import * as crypto from 'crypto';

export const serverSideApiRequest = async (endpoint, params = '') => {
	/**
	 * Fetch data from server side
	 *
	 * endpoint: string
	 * params: string
	 */
	const publicApiKey = process.env.API_PUBLIC_KEY;
	const privateApiKey = process.env.API_PRIVATE_KEY;
	const timestamp = +new Date();
	const hash = crypto
		.createHash('md5')
		.update(`${timestamp}${privateApiKey}${publicApiKey}`)
		.digest('hex');

	const url = `${process.env.API_BASE_URL}${endpoint}?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}${params}`;
	const response = await fetch(url);
	const data = await response.json();

	if (!response.ok) {
		const error = (data && data.message) || response.status;
		return { error: error };
	}

	return data;
};
