import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

const initialState = {
	colorMode: 'dark'
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setColorMode: (state, { payload }) => {
			state.colorMode = payload;
		}
	}
});

export const { setColorMode } = userSlice.actions;

export const userReducer = userSlice.reducer;
