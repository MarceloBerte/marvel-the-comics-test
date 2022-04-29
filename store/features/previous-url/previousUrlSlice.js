import { createSlice } from '@reduxjs/toolkit';

import { ROUTES } from '../../../config/constants/routes';

const initialState = {
	url: ROUTES.COMICS,
};

export const previousUrlSlice = createSlice({
	name: 'previousUrl',
	initialState,
	reducers: {
		setUrl: (state, action) => {
			state.url = action.payload;
		},
	},
});

export const { setUrl } = previousUrlSlice.actions;
export default previousUrlSlice.reducer;
