import { ICategory } from '../categories';
import { Channel } from '../channels';

export * from './CreateSpace';
export * from './Discovery';
export * from './spaceApi';
export * from './SpaceCard';
export * from './SpaceInvites';
export * from '../../app/SpacesSidebar';
export * from './SpaceOptions';
export * from './SpaceOverview';
export * from './SpaceSettingsOptions';
export * from './SpaceSidebar';

export interface Space {
	id: string;
	name: string;
	verifiedAt: Date;
	iconUrl: string;
	bannerUrl: string;
	categories: ICategory[];
	channels: Channel[];
	roles: [];
}
