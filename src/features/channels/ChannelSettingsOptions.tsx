import { useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useParams } from 'react-router-dom';

import { Options } from '../../common/components';
import { useGetChannelQuery } from '.';

export const ChannelSettingsOptions = () => {
	const { pathname } = useLocation();
	const { spaceId, channelId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const { data: channel } = useGetChannelQuery(channelId || '');

	return (
		<>
			<Modal
				className="dark:text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-slate bg-eggshell w-[80vh] rounded-lg flex flex-col outline-none"
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
				overlayClassName="bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0"
				shouldCloseOnOverlayClick={true}>
				<header className="h-full p-5 pb-0">
					<h3 className="mb-3 text-2xl heading">Confirm Channel Deletion</h3>
					<p className="pb-5">Are you sure you want to delete this channel?</p>
				</header>
				<footer className="flex w-full px-5 py-2 rounded-b-lg dark:bg-slate-dark bg-eggshell-dark ">
					<button
						className="ml-auto mr-2 btn"
						onClick={() => setShowModal(false)}
						type="submit">
						Cancel
					</button>
					<button
						className="bg-red-500 rounded btn hover:bg-bloo-dark"
						// onClick={}
						type="submit">
						Delete Channel
					</button>
				</footer>
			</Modal>
			<Options
				heading={
					channel ? (
						<h2 className="text-2xl heading truncate-paragraph">
							{channel.name}
						</h2>
					) : (
						<div className="skeleton text-2xl w-full">Space Name</div>
					)
				}
				options={{
					Overview: {
						to: `/space/${spaceId}/channel/${channelId}/overview`,
						selected: pathname.includes('overview')
					},
					Roles: {
						to: `/space/${spaceId}/channel/${channelId}/roles`,
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
