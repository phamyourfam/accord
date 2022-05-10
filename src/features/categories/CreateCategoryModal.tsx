import { Field, Form, Formik } from 'formik';

import { Modal } from '../../common/components';

export const CreateCategoryModal = ({
	data: { spaceId },
	onCreate,
	showModal,
	setShowModal
}: {
	data: { spaceId: string };
	onCreate: (values: {}) => void;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
	<Modal
		title="Create Category"
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
		<Formik initialValues={{ spaceId, name: '' }} onSubmit={onCreate}>
			<Form>
				<Field className="field" placeholder="Category name" name="name" />
			</Form>
		</Formik>
	</Modal>
);
