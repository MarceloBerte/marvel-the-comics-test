import Link from 'next/link';

import { serverSideApiRequest } from '../../helper/request-helper';

import ComicDetail from '../../components/comics/detail/comic-detail';
import ComicsList from '../../components/comics/list/comics-list';
import Error from '../../components/error/error';

import { ROUTES } from '../../config/constants/routes';

import styles from '../../styles/pages/comics.module.scss';

const Comics = (props) => {
	const { error, comics } = props;
	const comicsList = comics.data.results;
	const highlighted = comicsList[0];
	const comicsListCopy = [...comicsList];

	comicsListCopy.shift();

	if (error) {
		console.error(error);
	}
	return (
		<>
			{!error && (
				<section className={styles.comics}>
					<h2>This week comics</h2>
					<ComicDetail data={comics}>
						<Link href={`${ROUTES.ISSUE}/${highlighted.id}`}>
							<a className='btn'>More details</a>
						</Link>
					</ComicDetail>
					<ComicsList comics={comicsListCopy} target={ROUTES.ISSUE} />
					<small>{comics.attributionText}</small>
				</section>
			)}
			{error && <Error message='Something went wrong...' />}
		</>
	);
};

export const getServerSideProps = async () => {
	const comics = await serverSideApiRequest(
		'/v1/public/comics',
		'&dateDescriptor=thisWeek&limit=7'
	);
	return { props: { comics } };
};

export default Comics;
