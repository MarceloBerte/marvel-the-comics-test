import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { setUrl } from '../../../store/features/previous-url/previousUrlSlice';
import { ROUTES } from '../../../config/constants/routes';

import styles from './character-item.module.scss';

const CharacterListItem = ({ item }) => {
	const dispatch = useDispatch();

	if (!item || item === undefined) {
		return;
	}

	const thumbnailObject = item.thumbnail;
	const thumbnail = `${thumbnailObject.path}.${thumbnailObject.extension}`;
	const title = item.title;
	const name = item.name;

	const onClickHandler = () => {
		dispatch(setUrl(`${ROUTES.CHARACTER}/${item.id}`));
	};

	return (
		<li className={styles['character-item']}>
			<Link href={`${ROUTES.CHARACTER}/${item.id}`}>
				<a onClick={onClickHandler}>
					<Image
						src={thumbnail}
						alt={title}
						width={115}
						height={115}
					/>
					<h5>{name}</h5>
				</a>
			</Link>
		</li>
	);
};

export default CharacterListItem;
