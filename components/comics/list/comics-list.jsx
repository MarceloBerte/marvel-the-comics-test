import ListItem from './item/list-item';

import styles from './comics-list.module.scss';

const ComicsList = ({ comics, target }) => {
	return (
		<ul className={styles.list}>
			{comics.length > 0 ? (
				comics.map((item) => (
					<ListItem key={item.id} item={item} target={target} />
				))
			) : (
				<p>No items found...</p>
			)}
		</ul>
	);
};

export default ComicsList;
