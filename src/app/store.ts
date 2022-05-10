import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { appApi } from '../features/api/appApi';
import { authReducer } from '../features/auth';
import { userReducer } from '../features/user';

const reducers = combineReducers({
	auth: authReducer,
	user: userReducer,
	[appApi.reducerPath]: appApi.reducer
});

export const store = configureStore({
	reducer: persistReducer(
		{ key: 'root', storage, blacklist: ['appApi'] },
		reducers
	),
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(appApi.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
