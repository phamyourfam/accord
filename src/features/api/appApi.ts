import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8083/rest',
		credentials: 'include'
	}),
	tagTypes: ['User'],
	endpoints: () => ({})
});
