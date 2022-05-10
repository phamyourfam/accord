import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { LogOutModal } from '../auth';
import { Options } from '../../common/components';
import { useGetUserQuery } from '.';

export const UserSettingsOptions = () => {
	const { pathname } = useLocation();
	const [showModal, setShowModal] = useState(false);
	const { data: user } = useGetUserQuery();

	return (
		<>
			<LogOutModal showModal={showModal} setShowModal={setShowModal} />
			<Options
				heading={<h2 className="text-3xl heading">Your Settings</h2>}
				options={{
					Account: {
						selected: pathname.includes('account'),
						to: '/me/account'
					},
					logOut: {
						name: (
							<>
								<i className="mr-2 bi-box-arrow-right" />
								Log Out
							</>
						),
						onClick: () => setShowModal(true)
					}
				}}
			/>
		</>
	);
};
