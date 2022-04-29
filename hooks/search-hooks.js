import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { ROUTES } from '../config/constants/routes';
import { setUrl } from '../store/features/previous-url/previousUrlSlice';

export const useSearch = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { url } = useSelector((state) => state.previousUrl);

	const [canType, setCanType] = useState(false);
	const [canClear, setCanClear] = useState(false);
	const [querie, setQuerie] = useState(null);

	const allowUserToType = () => {
		if (canType === false) setCanType(!canType);
	};

	const updateQuerie = (querie) => {
		setQuerie(querie);
		setCanClear(true);

		if (querie === '') {
			setCanClear(false);
			reset();
			router.push(url);
		} else {
			if (querie) {
				const searchPath = ROUTES.SEARCH;

				if (router.pathname !== searchPath) {
					dispatch(setUrl(router.asPath));
				}

				router.push(`${searchPath}?q=${querie}`);
			}
		}
	};

	const changeFocus = () => {
		if (!querie || querie === '') setCanType(false);
	};

	const clear = () => {
		setQuerie(null);
		setCanClear(false);
	};

	const reset = () => {
		setCanType(false);
		setCanClear(false);
		setQuerie(null);
	};

	return {
		canType,
		allowUserToType,
		canClear,
		querie,
		updateQuerie,
		changeFocus,
		clear,
		reset,
	};
};
