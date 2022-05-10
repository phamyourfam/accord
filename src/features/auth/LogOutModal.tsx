import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../common/components';
import { setUnauthenticated } from '.';
import { useAppDispatch } from '../../app';
import { useLogOutMutation } from '.';

export const LogOutModal = ({
	showModal,
	setShowModal
}: {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const dispatch = useAppDispatch();
	const [logOut] = useLogOutMutation();
	const navigate = useNavigate();

	return (
		<Modal
			title="Confirm Log Out"
			message="Are you sure you want to log out?"
			footer={
				<>
					<button
						className="ml-auto mr-2 btn"
						onClick={() => setShowModal(false)}
						type="submit">
						Cancel
					</button>
					<button
						className="bg-red-500 rounded btn hover:bg-bloo-dark"
						onClick={() => {
							logOut();
							dispatch(setUnauthenticated());
							navigate('/login');
						}}
						type="submit">
						Log Out
					</button>
				</>
			}
			showModal={showModal}
			setShowModal={setShowModal}></Modal>
	);
};
