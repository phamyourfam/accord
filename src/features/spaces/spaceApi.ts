import { appApi } from '../api';
import { Channel } from '../channels';
import { User } from '../user';

interface Invite {
	id: string;
	uses: number;
	expiresAt: number;
	user: User;
}

interface Space {
	id: string;
	name: string;
	verifiedAt: Date;
	iconUrl: string;
	bannerUrl: string;
	categories: [];
	channels: [];
	roles: [];
}

export const spaceApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		createSpace: build.mutation<Space, FormData>({
			query: (body) => ({
				url: '/space',
				method: 'POST',
				body
			})
		}),
		getSpace: build.query<Space, string>({
			query: (id) => `/space/${id}`
		}),
		updateSpace: build.mutation<Space, { id: string; body: FormData }>({
			query: ({ id, body }) => ({
				url: `/space/${id}`,
				method: 'PATCH',
				body
			})
		}),
		deleteSpace: build.mutation<boolean, string>({
			query: (id) => ({
				url: `/space/${id}`,
				method: 'DELETE'
			})
		}),
		createSpaceInvite: build.mutation<
			Space,
			{ spaceId: string; icon?: Blob; banner?: Blob }
		>({
			query: ({ spaceId, ...rest }) => ({
				url: `/space/${spaceId}/invite`,
				method: 'POST',
				body: rest
			})
		}),
		getSpaceInvites: build.query<Invite[], string>({
			query: (id) => `/space/invite/${id}`
		}),
		joinSpace: build.mutation<Space, string>({
			query: (id) => ({
				url: `/space/invite/${id}`,
				method: 'PATCH'
			})
		})
	})
});

export const {
	useCreateSpaceMutation,
	useGetSpaceQuery,
	useUpdateSpaceMutation,
	useDeleteSpaceMutation,
	useCreateSpaceInviteMutation,
	useGetSpaceInvitesQuery,
	useJoinSpaceMutation
} = spaceApi;
