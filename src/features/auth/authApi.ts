import { appApi } from '../api';

import { LoginFormValues } from '.';
import { User } from '../user';

const authApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		logIn: build.mutation<User, LoginFormValues>({
			query: (body) => ({
				url: '/auth',
				method: 'POST',
				body
			})
		}),
		logOut: build.mutation<void, void>({
			query: () => ({
				url: '/auth',
				method: 'DELETE'
			})
		}),
		renewTokens: build.mutation<User, LoginFormValues>({
			query: (body) => ({
				url: '/auth',
				method: 'PUT',
				body
			})
		})
	}),
	overrideExisting: false
});

export const { useLogInMutation, useLogOutMutation, useRenewTokensMutation } =
	authApi;
