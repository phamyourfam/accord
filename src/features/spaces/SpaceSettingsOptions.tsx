import { Navigate, useLocation, useParams } from 'react-router-dom';

import { Options } from '../../common/components/Options';
import { useGetSpaceQuery } from '.';

export const SpaceSettingsOptions = () => {
	const { pathname } = useLocation();
	const { spaceId } = useParams();
	const { data: space } = useGetSpaceQuery(spaceId || '');

	// if (error) return <Navigate to="/space" />;
	return (
		<Options
			heading={
				space ? (
					<h2 className="text-2xl heading truncate-paragraph">
						Lousiana State University
					</h2>
				) : (
					<div className="w-full text-2xl skeleton">Space Name</div>
				)
			}
			options={{
				Overview: {
					to: `/space/${space?.id}/overview`,
					selected: pathname.includes('overview')
				},
				Invites: {
					to: `/space/${space?.id}/invites`,
					selected: pathname.includes('invites')
				}
			}}
		/>
	);
};
