import { useParams } from 'react-router-dom';
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps
} from 'formik';

import { ImageUpload } from '../../common/components';
import { useOnMutationSubmit } from '../../common/hooks';
import { useGetUserQuery, useUpdateUserMutation } from '.';

const initialValues = {};

export const AccountSettings = () => {
	document.title = 'Accord | Account Overview';

	const { spaceId } = useParams();
	const { data: user } = useGetUserQuery(spaceId || '');
	const updateSpaceMutation = useUpdateUserMutation();
	const [updateSpace] = useOnMutationSubmit(updateSpaceMutation, {
		cb: () => {},
		formData: true
	});

	return (
		<div className="py-5 mx-10">
			<Formik
				initialValues={{ icon: '', forename: '', surname: '' }}
				onSubmit={(values) => updateSpace({ ...values })}>
				{({ setFieldValue }) => (
					<>
						<h3 className="mb-5 heading">Account</h3>
						<div className="h-full rounded-lg dark:bg-slate bg-eggshell">
							<Form className="flex-col p-5 space-y-2 flex-center">
								<ImageUpload
									alt="Upload space icon."
									aspect={1 / 1}
									className="w-20 h-20 mb-4 dark:bg-slate-dark bg-eggshell-dark"
									hoverText="UPLOAD ICON"
									imageUrl={user?.avatarUrl || 'N/A'}
									modalTitle="Edit Avatar"
									onChange={(icon) => setFieldValue('icon', icon)}
								/>
								<Field
									className="field"
									placeholder={user?.forename || 'Forename'}
									name="forename"
								/>
								<Field
									className="field"
									placeholder={user?.surname || 'Surname'}
									name="surname"
								/>
								<button className="p-2 bg-green-500 rounded" type="submit">
									Save
								</button>
							</Form>
						</div>
					</>
				)}
			</Formik>
			<div className="w-1/2 h-full skeleton"></div>
		</div>
	);
};
