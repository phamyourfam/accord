import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Modal } from '../../common/components';
import { Options } from '../../common/components';
import { useGetCategoryQuery } from '.';

export const CategorySettingsOptions = () => {
	const [showModal, setShowModal] = useState(false);
	const { pathname } = useLocation();
	const { spaceId, categoryId } = useParams();
	const { data: category } = useGetCategoryQuery(categoryId || '');

	return (
		<>
			<Options
				heading={
					category ? (
						<h2 className="text-2xl heading truncate-paragraph">
							{category.name}
						</h2>
					) : (
						<div className="skeleton text-2xl w-full">Space Name</div>
					)
				}
				options={{
					Overview: {
						to: `/space/${spaceId}/category/${categoryId}/overview`,
						selected: pathname.includes('overview')
					},
					Roles: {
						to: `/space/${spaceId}/category/${categoryId}/roles`,
						selected: pathname.includes('roles')
					},
					Delete: {
						name: 'Delete Channel',
						onClick: () => setShowModal(true)
					}
				}}
			/>
		</>
	);
};
