import { useLocation } from 'react-router-dom';

import { Options } from '../../common/components';

export const SpaceOptions = () => {
	const { pathname } = useLocation();

	return (
		<Options
			heading={
				<>
					<i className="mr-2 bi-union" />
					<h2 className="text-3xl heading">Spaces</h2>
				</>
			}
			options={{
				discovery: {
					name: 'Join or Discover',
					to: '/space/discovery',
					selected: pathname.includes('discovery')
				},
				Create: { to: '/space/create', selected: pathname.includes('create') }
			}}
		/>
	);
};
