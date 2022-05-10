import { useParams } from 'react-router-dom';
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps
} from 'formik';

import { useOnMutationSubmit } from '../../common/hooks';
import { useGetChannelQuery, useUpdateChannelMutation } from '.';

export const ChannelOverview = () => {
	const { channelId } = useParams();
	const { data: channel } = useGetChannelQuery(channelId || '');
	const updateChannelMutation = useUpdateChannelMutation();
	const updateSpace = useOnMutationSubmit(updateChannelMutation, {
		cb: () => {},
		formData: true
	});

	return (
		<Formik
			initialValues={{ name: '', description: '' }}
			onSubmit={(values) => {}}>
			{({ setFieldValue }) => (
				<div className="py-5 mx-10">
					<h3 className="mb-5 heading">Channel</h3>
					<div className="rounded-lg dark:bg-slate bg-eggshell">
						<Form className="flex-col w-1/2 p-5 flex-center xl:w-1/3">
							<Field
								className="field"
								placeholder={channel?.description || 'Channel name'}
								name="name"
							/>
							<Field
								className="field"
								placeholder={channel?.description || 'Channel description'}
								name="description"
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
