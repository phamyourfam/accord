import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

export const CategoryOverview = () => {
	document.title = 'Accord | Category Overview';

	const { categoryId } = useParams();

	return (
		<div className="py-5 mx-10">
			<Formik
				initialValues={{ id: categoryId, name: '' }}
				onSubmit={(values) => {}}>
				{({ setFieldValue }) => (
					<>
						<h3 className="mb-5 heading">Account</h3>
						<div className="h-full rounded-lg dark:bg-slate bg-eggshell">
							<Form className="flex-col p-5 space-y-2 flex-center">
								<Field
									className="field"
									placeholder={'Category name'}
									name="name"
								/>
								<button className="p-2 bg-green-500 rounded" type="submit">
									Save
								</button>
							</Form>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
};
