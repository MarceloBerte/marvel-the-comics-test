import Head from 'next/head';
import { serverSideApiRequest } from '../../../helper/request-helper';

import ComicDetail from '../../../components/comics/detail/comic-detail';
import CharactersList from '../../../components/characters/list/characters-list';
import Error from '../../../components/error/error';

const Comic = (props) => {
	const { error, comic, charactersList } = props;
	if (error) {
		console.error(error);
	}
	const comicData = comic.data.results[0];
	const title = comicData.title;
	const description = comicData.description;
	const characters = charactersList.map((character) => {
		return character.data.results[0];
	});
	return (
		<>
			{!error && (
				<>
					<Head>
						<title>Avidity | Test - Marvel Comics - {title}</title>
						<meta name='description' content={description} />
					</Head>
					<ComicDetail data={comic} sectionTitle>
						{characters.length > 0 && (
							<>
								<h4>More characters in this comic:</h4>
								<CharactersList characters={characters} />
							</>
						)}
					</ComicDetail>
					<small>{comic.attributionText}</small>
				</>
			)}
			{error && <Error message='Something went wrong...' />}
		</>
	);
};

export const getServerSideProps = async (context) => {
	const comic = await serverSideApiRequest(
		`/v1/public/comics/${context.params.comicID}`
	);
	const result = comic.data.results[0];
	const promissesArray = await result.characters.items.map(
		async (character) => {
			const id = character.resourceURI.split('characters/')[1];
			return await serverSideApiRequest(`/v1/public/characters/${id}`);
		}
	);
	const charactersList = await Promise.all(promissesArray)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return { error: error };
		});

	return { props: { comic, charactersList } };
};

export default Comic;
