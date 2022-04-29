import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import CharactersList from '../../components/characters/list/characters-list';

const SearchResult = () => {
	const router = useRouter();
	const querie = router.query.q;
	const apiEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/public/characters`;
	const apiEnpointParams = `?apikey=${process.env.NEXT_PUBLIC_API_PUBLIC_KEY}&nameStartsWith=${querie}&orderBy=name`;
	const apiUrl = `${apiEndpoint}${apiEnpointParams}`;

	const [searchResult, setSearchResult] = useState({ data: {}, results: [] });

	useEffect(() => {
		if (querie) {
			fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					const fetchedData = {
						data,
						results: data.data.results,
					};
					setSearchResult(fetchedData);
				});
		}
	}, [querie, apiUrl]);

	return (
		<>
			<Head>
				<title>
					Avidity | Test - Marvel Comics - Search for Characters
				</title>
				<meta
					name='description'
					content="Search your favorite Marvel's character!"
				/>
			</Head>
			<section className=''>
				<h2>You searched for {querie}</h2>
				<CharactersList characters={searchResult.results} />

				<small>{searchResult?.data.attributionText}</small>
			</section>
		</>
	);
};

export default SearchResult;
