import Head from 'next/head';
import { serverSideApiRequest } from '../../helper/request-helper';

import BackgroundBanner from '../../components/background-banner/background-banner';
import ComicsList from '../../components/comics/list/comics-list';
import Error from '../../components/error/error';

import { ROUTES } from '../../config/constants/routes';

import styles from '../../styles/pages/characters-comics.module.scss';

const CharactersComics = (props) => {
	const { error, data } = props;
	const characterData = data.character;
	const character = characterData.data.results[0];
	const thumbnailObject = character.thumbnail;
	const thumbnail = `${thumbnailObject.path}.${thumbnailObject.extension}`;
	const name = character.name;

	const comicsData = data.comics;
	const comics = comicsData.data.results;

	if (error) {
		console.error(error);
	}
	return (
		<>
			<Head>
				<title>Avidity | Test - Marvel Comics - {name} comics</title>
				<meta
					name='description'
					content={`Comics that ${name} appears`}
				/>
			</Head>
			{!error && (
				<section className={`${styles['characters-comics']}`}>
					<BackgroundBanner thumbnail={thumbnail} />
					<h2>Comics that {name} appears</h2>
					{/* ##PAGINAÇÃO## */}
					<ComicsList comics={comics} target={ROUTES.ISSUE} />
					{/* ##PAGINAÇÃO## */}
					<small>{comicsData.attributionText}</small>
				</section>
			)}
			{error && <Error message='Something went wrong...' />}
		</>
	);
};

export const getServerSideProps = async (context) => {
	const id = context.params.characterID;
	const data = {};
	await Promise.all([
		serverSideApiRequest(
			`/v1/public/characters/${id}/comics`,
			`&orderBy=-issueNumber&limit=10&offset=${0}`
		),
		serverSideApiRequest(`/v1/public/characters/${id}`),
	])
		.then((response) => {
			response.map((obj, i) => {
				switch (i) {
					case 0:
						return (data['comics'] = obj);
					case 1:
						return (data['character'] = obj);
				}
			});
		})
		.catch((error) => ({ error: error }));

	return { props: { data } };
};

export default CharactersComics;
