import { useParams } from 'react-router-dom';
import { Field, Form, Formik, FormikValues } from 'formik';

import { ImageUpload } from '../../common/components';
import { useGetSpaceQuery } from '.';
import { useOnMutationSubmit } from '../../common/hooks';
import { useUpdateSpaceMutation } from '.';

export const SpaceOverview = () => {
	const { spaceId } = useParams();
	const { data: space, error } = useGetSpaceQuery(spaceId || '');
	const updateSpaceMutation = useUpdateSpaceMutation();
	const [updateSpace] = useOnMutationSubmit(updateSpaceMutation, {
		cb: () => {},
		formData: true
	});

	document.title = `Accord | ${space?.name} | Overview`;

	return (
		<Formik
			initialValues={{}}
			onSubmit={(values) => updateSpace({ ...values })}>
			{({ setFieldValue }) => (
				<div className="py-5 mx-10">
					<h3 className="mb-5 heading">Space Overview</h3>
					<div className="rounded-lg dark:bg-slate bg-eggshell">
						<Form className="w-1/2 grid-cols-2 p-5 grid-center justify-items-center xl:w-1/3">
							<ImageUpload
								alt="Upload space icon."
								aspect={1 / 1}
								className="w-20 h-20 mb-4 dark:bg-slate-dark bg-eggshell-dark"
								hoverText="UPLOAD ICON"
								imageUrl={space?.iconUrl || 'N/A'}
								modalTitle="Edit Space Icon"
								onChange={(icon) => setFieldValue('icon', icon)}
							/>
							<ImageUpload
								alt="Upload space banner."
								className="w-40 h-20 mb-4 dark:bg-slate-dark bg-eggshell-dark"
								hoverText="UPLOAD BANNER"
								imageUrl={space?.bannerUrl || 'N/A'}
								modalTitle="Edit Space Banner"
								onChange={(banner) => setFieldValue('banner', banner)}
							/>
							<Field
								className="field"
								placeholder={space?.name || 'Space name'}
								name="name"
							/>
							<button className="p-2 bg-green-500 rounded" type="submit">
								Save
							</button>
						</Form>
					</div>
				</div>
			)}
		</Formik>
	);
};
