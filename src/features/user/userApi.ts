import { appApi } from '../api';
import { SignupFormValues } from '../auth';
import { User } from '.';

export const userApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		createUser: build.mutation<User, SignupFormValues>({
			query: (body) => ({
				url: '/user',
				method: 'POST',
				body
			}),
			invalidatesTags: ['User']
		}),
		getUser: build.query<User, string | void>({
			query: (id) => (id ? `/user/${id}` : '/user'),
			providesTags: ['User']
		}),
		updateUser: build.mutation<User, User>({
			query: ({ id, ...rest }) => ({
				url: id ? `/user/${id}` : '/user',
				method: 'PATCH',
				body: rest
			}),
			invalidatesTags: ['User']
		}),
		deleteUser: build.mutation<{ deletedAt: Date }, string>({
			query: () => ({
				url: '/',
				method: 'DELETE'
			}),
			invalidatesTags: ['User']
		})
	})
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useCreateUserMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation
} = userApi;
