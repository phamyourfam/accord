import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

const initialState = {
	authenticatedAt: -1
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthenticated: (state) => {
			state.authenticatedAt = Date.now();
		},
		setUnauthenticated: (state) => {
			state.authenticatedAt = -1;
		}
	}
});

export const { setAuthenticated, setUnauthenticated } = authSlice.actions;
export const selectAuthStatus = (state: RootState) =>
	state.auth.authenticatedAt;
export const authReducer = authSlice.reducer;
