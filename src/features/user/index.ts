import { Space } from '../spaces';

export * from './AccountSettings';
export * from './Me';
export * from './ProfileModal';
export * from './userApi';
export * from './UserSettingsOptions';
export * from './userSlice';

export interface User {
	id: string;
	email: string;
	emailVerifiedAt: Date;
	nickname?: string;
	forename: string;
	surname: string;
	avatarUrl: string;
	status: { type: 0 | 1 | 2 | 3; emoji?: ''; message?: '' };
	createdAt: Date;
	spaceMemberships: ISpaceMembership[];
}

export interface ISpaceMembership {
	id: string;
	nickname?: string;
	orderIndex: 0;
	recentChannelId: string;
	space: Space;
}
