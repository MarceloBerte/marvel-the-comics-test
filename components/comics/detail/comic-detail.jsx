import Image from 'next/image';
import BackgroundBanner from '../../background-banner/background-banner';

import styles from './comic-detail.module.scss';

const ComicDetail = (props) => {
	const { data, sectionTitle } = props;

	if (!data || data === undefined) {
		return;
	}

	const comic = data.data.results[0];
	const thumbnailObject = comic.thumbnail;
	const thumbnail = `${thumbnailObject.path}.${thumbnailObject.extension}`;
	const title = comic.title;
	const description = comic.description;

	const titleElement = sectionTitle ? <h2>{title}</h2> : <h3>{title}</h3>;

	return (
		<>
			<BackgroundBanner thumbnail={thumbnail} />
			<section className={`${styles.detail}`}>
				<article>
					<figure>
						<Image
							src={thumbnail}
							alt={title}
							width={320}
							height={485.7}
						/>
					</figure>
					<aside>
						{titleElement}
						<cite>
							{description
								? description
								: 'Sorry!\nNo description avilable...'}
						</cite>
						{props.children}
					</aside>
				</article>
			</section>
		</>
	);
};

export default ComicDetail;
