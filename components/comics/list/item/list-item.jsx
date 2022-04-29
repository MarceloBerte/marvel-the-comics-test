import Image from 'next/image';
import Link from 'next/link';

import styles from './list-item.module.scss';

const ListItem = ({ item, target }) => {
	if (!item || item === undefined) {
		return;
	}
	const thumbnailObject = item.thumbnail;
	const thumbnail = `${thumbnailObject.path}.${thumbnailObject.extension}`;
	const title = item.title;
	const id = item.id;

	return (
		<li className={styles['list-item']}>
			<Image src={thumbnail} alt={title} width={150} height={230.55} />
			<Link href={`${target}/${id}`}>
				<a>
					<span className='btn'>More details</span>
				</a>
			</Link>
		</li>
	);
};

export default ListItem;
