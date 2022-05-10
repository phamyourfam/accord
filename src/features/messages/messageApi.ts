import { appApi } from '../api';

import { User } from '../user';

export interface IMessage {
	id: string;
	body: string | string[];
	createdAt: number;
	author: {
		avatarUrl?: string;
		nickname?: string;
		forename: string;
		surname?: string;
	};
	reactions?: {
		id: string;
		count: number;
		native?: string;
		imageUrl?: string;
	}[];
}

interface GetMessagesOptions {
	channelId?: string;
	groupId?: string;
	conversationId?: string;
	before?: number;
	limit?: number;
}

export const authApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		getChannelMessages: build.query<IMessage[], GetMessagesOptions>({
			query: ({ channelId, before, limit }) => ({
				url: `/space/channel/${channelId}/messages`,
				params: { before, limit }
			})
		}),
		getGroupMessages: build.query<IMessage[], string>({
			query: (groupId) => `/group/${groupId}/messages`
		}),
		getConversationMessages: build.query<IMessage[], string>({
			query: (conversationId) => `/conversation/${conversationId}/message`
		})
	})
});

export const {
	useGetChannelMessagesQuery,
	useGetGroupMessagesQuery,
	useGetConversationMessagesQuery
} = authApi;
