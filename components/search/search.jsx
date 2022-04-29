import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSearch } from '../../hooks/search-hooks';

import SearchIcon from './icon';

import styles from './search.module.scss';
import { ROUTES } from '../../config/constants/routes';

const Search = () => {
	const inputSearchRef = useRef();
	const router = useRouter();
	const {
		canType,
		canClear,
		querie,
		allowUserToType,
		updateQuerie,
		changeFocus,
		clear,
		reset,
	} = useSearch();

	const onChangeHandler = (event) => {
		const value = event.target.value;
		updateQuerie(value);
	};

	useEffect(() => {
		if (canType) {
			inputSearchRef.current.focus();
			if (!querie || querie === '') inputSearchRef.current.value = '';
		}
	}, [canType, querie, inputSearchRef]);

	useEffect(() => {
		const routeChangeHandler = (url) => {
			const splitedUrl = url.split('?')[0] !== ROUTES.SEARCH;
			splitedUrl && reset();
		};
		router.events.on('routeChangeComplete', routeChangeHandler);
	});

	const focusCssClass = canType ? styles['with-focus'] : undefined;

	return (
		<form className={`${styles.search} ${focusCssClass}`}>
			<span>
				<SearchIcon
					src='/images/svg/icons/fa/magnifying-glass-solid.svg'
					alt='Search'
					onClick={allowUserToType}
				/>
			</span>
			<input
				type='text'
				placeholder='Character...'
				ref={inputSearchRef}
				onChange={onChangeHandler}
				onBlur={changeFocus}
			/>
			<span className={canClear ? styles['can-clear'] : undefined}>
				<SearchIcon
					src='/images/svg/icons/fa/xmark-solid.svg'
					alt='Clean'
					onClick={clear}
				/>
			</span>
		</form>
	);
};

export default Search;
