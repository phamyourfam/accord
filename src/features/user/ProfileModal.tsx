import { Avatar } from '../../common/components';
import { Modal } from '../../common/components';
import { useGetUserQuery } from './userApi';

export const ProfileModal = ({
	data,
	showModal,
	setShowModal
}: {
	data: { userId: string };
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { data: user, error } = useGetUserQuery(data.userId);

	if (error && !user) return null;

	return (
		<Modal showModal={showModal} setShowModal={setShowModal}>
			<Avatar
				alt={user?.forename + "'s avatar."}
				imageUrl={user?.avatarUrl || ''}
			/>
		</Modal>
	);
};
