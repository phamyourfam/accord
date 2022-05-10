import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { ImageUpload } from '../../common/components';
import { useOnMutationSubmit } from '../../common/hooks';
import { Space, useCreateSpaceMutation, useGetSpaceQuery } from '.';

export const CreateSpace = ({
	creatingNewSpace
}: {
	creatingNewSpace?: boolean;
}) => {
	const navigate = useNavigate();
	const createSpaceMutation = useCreateSpaceMutation();
	const [onCreateSpaceSubmit] = useOnMutationSubmit(createSpaceMutation, {
		cb: (data: Space) => {
			navigate('/space/' + data.id + '/' + data.categories[0].channels[0].id);
		},
		formData: true
	});

	document.title = 'Accord | New Space';

	return (
		<Formik
			initialValues={{ icon: '', name: '', description: '' }}
			onSubmit={onCreateSpaceSubmit}>
			{({ setFieldValue }) => (
				<Form className="w-1/2 px-5 py-10 rounded-lg xl:w-1/3 grid-center dark:bg-slate bg-eggshell">
					<h1 className="mb-2 text-2xl heading">
						Cutomize To Your 💖's Content
					</h1>
					<p className="mb-4 text-center">
						Give your new space a personality with a name and an icon.
					</p>
					<ImageUpload
						alt="Upload space icon."
						aspect={4 / 4}
						className="w-20 h-20 mb-4 dark:bg-slate-dark bg-eggshell-dark"
						hoverText="UPLOAD ICON"
						modalTitle="Edit Icon"
						onChange={(icon) => setFieldValue('icon', icon)}
					/>
					<Field name="name" placeholder="Name" className="mb-2 field" />
					<Field
						name="description"
						placeholder="Description"
						className="field"
					/>
					<button
						className="w-4/5 px-4 py-2 mt-4 font-bold text-white rounded bg-bloo disabled:opacity-50"
						type="submit">
						Create
					</button>
				</Form>
			)}
		</Formik>
	);
};
