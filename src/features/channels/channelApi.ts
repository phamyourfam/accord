import { appApi } from '../api';
import { Category, Channel } from '.';

export const channelApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		createChannel: build.mutation<Channel, Channel>({
			query: ({ workspaceId, ...rest }) => ({
				url: `/space/channel/${workspaceId}`,
				method: 'POST',
				body: rest
			})
		}),
		getChannel: build.query<Channel, string>({
			query: (id) => `/space/channel/${id}`
		}),
		updateChannel: build.mutation<Channel, Channel>({
			query: ({ id, ...rest }) => ({
				url: `/space/channel/${id}`,
				method: 'PATCH',
				body: rest
			})
		}),
		deleteChannel: build.mutation<{ deletedAt: boolean }, string>({
			query: (id) => ({
				url: `/space/channel/${id}`,
				method: 'DELETE'
			})
		})
	})
});

export const {
	useCreateChannelMutation,
	useGetChannelQuery,
	useUpdateChannelMutation,
	useDeleteChannelMutation
} = channelApi;
