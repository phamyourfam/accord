export * from './channelApi';
export * from './ChannelOverview';
export * from './Channels';
export * from './ChannelSettingsOptions';
export * from './CreateChannelModal';

export interface Category {
	id: string;
	name: string;
	isMuted: boolean;
	channels: Channel[];
}

export interface Channel {
	id: string;
	workspaceId?: string;
	type: number;
	name: string;
	description?: string;
	notifications?: number;
}
