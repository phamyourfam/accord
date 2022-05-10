import { Channel } from '../channels';

export * from './Categories';
export * from './categoryApi';
export * from './CategoryOverview';
export * from './CategorySettingsOptions';
export * from './CreateCategoryModal';

export interface ICategory {
	id: string;
	name: string;
	isMuted: boolean;
	channels: Channel[];
}
