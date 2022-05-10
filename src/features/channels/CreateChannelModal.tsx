import { Field, Form, Formik } from 'formik';

import { Modal } from '../../common/components';

const channelTypes = [
	{
		id: '0',
		name: 'Announcement',
		description: 'A text and media channel for making announcements.'
	},
	{ id: '1', name: 'Chat', description: 'A text and media channel.' }
];

export const CreateChannelModal = ({
	data: { spaceId, categoryId },
	onCreate,
	showModal,
	setShowModal
}: {
	data: { spaceId: string; categoryId: string };
	onCreate: (values: {}) => void;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
	<Modal
		title="Create Channel"
		footer={
			<>
				<button
					className="ml-auto mr-2 btn"
					onClick={() => setShowModal(false)}
					type="submit">
					Cancel
				</button>
				<button
					className="rounded bg-bloo btn hover:bg-bloo-dark"
					type="submit">
					Create
				</button>
			</>
		}
		showModal={showModal}
		setShowModal={setShowModal}>
		<Formik
			initialValues={{ spaceId, categoryId, type: '1' }}
			onSubmit={onCreate}>
			{({ setFieldValue, values }) => (
				<Form>
					<ol>
						{channelTypes.map(({ id, name, description }) => (
							<li
								className={
									'option' + ((values.type === id && ' option--selected') || '')
								}
								onClick={() => setFieldValue('type', id)}
								key={id}>
								<h6 className="text-lg heading">{name}</h6>
								<p>{description}</p>
							</li>
						))}
					</ol>
					<label
						className="inline-block mt-5 mb-2 text-lg heading"
						htmlFor="name">
						Channel Name
					</label>
					<div>
						<Field
							id="name"
							className="w-full field"
							placeholder="Channel name"
							name="name"
						/>
					</div>
				</Form>
			)}
		</Formik>
	</Modal>
);
