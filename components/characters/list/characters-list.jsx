import CharacterListItem from '../item/character-item';
import styles from './characters-list.module.scss';

const CharactersList = ({ characters }) => {
	return (
		<ul className={styles['characters-list']}>
			{characters.length > 0 ? (
				characters.map((character) => (
					<CharacterListItem key={character.id} item={character} />
				))
			) : (
				<p>No items found...</p>
			)}
		</ul>
	);
};

export default CharactersList;
