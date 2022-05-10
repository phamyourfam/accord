import { Field, Form, Formik } from 'formik';

import { ContextMenu } from '../../common/components';
import { SpaceCard } from './SpaceCard';
import { useJoinSpaceMutation } from '../spaces';
import { useOnMutationSubmit } from '../../common/hooks';
import { useNavigate } from 'react-router-dom';

function validateJoinSpaceInput(values: any) {}

export const Discovery = () => {
	const navigate = useNavigate();
	const joinSpaceMutation = useJoinSpaceMutation();
	const [onJoinSpaceSubmit] = useOnMutationSubmit(joinSpaceMutation, {
		cb: (space) => navigate('/workspace/' + space.id)
	});

	document.title = 'Accord | Discover Spaces';

	return (
		<>
			{/* <ContextMenu options={{ 'Copy ID': { onClick: () => {} } }} /> */}
			<header className="flex mx-10 mt-5 rounded-lg dark:bg-slate bg-eggshell">
				<div className="w-1/3 h-full p-5">
					<h2 className="text-3xl heading">Join a space</h2>
					<p className="mb-5 text-lg">Input your invite link below.</p>
					<Formik initialValues={{ inviteId: '' }} onSubmit={onJoinSpaceSubmit}>
						{({ setValues, values }) => (
							<Form
								onChange={() =>
									setValues({
										inviteId: values.inviteId.replace(
											'https://accordcollaborative/',
											''
										)
									})
								}
								onKeyDown={({ key }) => {
									// if (key === 'Enter') onSubmit(values);
								}}
								className="w-full field">
								<Field
									type="text"
									name="message"
									placeholder="https://accordcollaborative.com/mAsXy"
									className="w-full px-1 border-0 field-reset"
								/>
							</Form>
						)}
					</Formik>
				</div>
				<div className="w-2/3 bg-[url('https://i.imgur.com/icxRhjX.jpeg')] rounded-r-lg flex-center flex-col p-5 bg-top-right">
					<span className="mb-5 text-center">
						<h2 className="text-3xl text-white heading">
							Discover your community on Accord
						</h2>
						<p className="text-lg text-white">
							From gaming, to music, to learning, there's a space for you.
						</p>
					</span>
					<footer className="px-10 pb-5">
						<Formik initialValues={{ search: '' }} onSubmit={() => {}}>
							{({ values }) => (
								<Form
									className="w-full field"
									onKeyDown={({ key }) => {
										// if (key === 'Enter') onSubmit(values);
									}}>
									<Field
										type="text"
										name="message"
										placeholder="Explore communities"
										className="w-full px-1 border-0 field-reset"
									/>
								</Form>
							)}
						</Formik>
					</footer>
				</div>
			</header>
			<section className="mx-10 mt-5">
				<h3 className="mb-5 text-2xl heading">Featured Communities</h3>
				<article>
					<SpaceCard
						data={{
							iconUrl:
								'https://cdn.discordapp.com/icons/839540778643488798/f003e09c93642dbd299f3248bd69ca69.webp',
							bannerUrl:
								'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/12/The-Going-Merry-One-Piece-1.jpg',
							name: 'Sycophants Ship',
							description:
								'A space made for everyone, whether you like anime or not! Come check us out, im sure you wont regret it!'
						}}
					/>
				</article>
			</section>
		</>
	);
};
