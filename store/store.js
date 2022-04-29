import { configureStore } from '@reduxjs/toolkit';

import previousUrlSlice from './features/previous-url/previousUrlSlice';

export const store = configureStore({
	reducer: {
		previousUrl: previousUrlSlice,
	},
});
