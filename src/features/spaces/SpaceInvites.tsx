import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { Avatar } from '../../common/components';
import { useGetSpaceInvitesQuery } from '.';
import { useCreateSpaceInviteMutation } from '.';
import { useGetUserQuery } from '../user';
import { useGetSpaceQuery } from './spaceApi';
import { useOnMutationSubmit } from '../../common/hooks';

export const SpaceInvites = () => {
	const createSpaceInviteMutation = useCreateSpaceInviteMutation();
	const { spaceId } = useParams();
	const { data: invites } = useGetSpaceInvitesQuery(spaceId || '');
	const { data: space } = useGetSpaceQuery(spaceId || '');
	const { data: user } = useGetUserQuery();
	const [onSubmit] = useOnMutationSubmit(createSpaceInviteMutation, {});

	document.title = `Accord | ${space?.name} | Overview`;

	return (
		<div className="py-5 mx-10 mt-5 rounded-lg">
			<h3 className="mb-5 heading">Invites</h3>
			<Formik
				initialValues={{ isPublic: true, expireAfter: null, maxUses: null }}
				onSubmit={onSubmit}>
				<Form>
					<Field as="select" name="expireAfter">
						<option value="30m">30 minutes</option>
						<option value="1h">An hour</option>
						<option value="6h">6 hours</option>
						<option value="12h">12 hours</option>
						<option value="1d">A day</option>
						<option value="7d">7 days</option>
						<option value="-1">Never</option>
					</Field>
					<Field as="select" name="maxUses">
						<option value="1">1 use</option>
						<option value="5">5 uses</option>
						<option value="10">10 uses</option>
					</Field>
					<button
						disabled={!user}
						className="p-2 mb-5 duration-300 bg-green-500 rounded"
						type="submit">
						Create Invite
					</button>
				</Form>
			</Formik>
			<table className="w-full text-center">
				<tbody>
					<tr>
						<th>INVITER</th>
						<th>INVITE CODE</th>
						<th>USES</th>
						<th>EXPIRES</th>
					</tr>
					{invites?.map(({ id, uses, expiresAt, user }) => (
						<tr className="rounded-lg dark:bg-slate bg-eggshell">
							<td className="flex-center">
								<Avatar
									alt={`${user.forename}'s Avatar`}
									className="w-10 h-10 mr-2"
									imageUrl={user.avatarUrl}
								/>
								{user.forename}
							</td>
							<td>{id}</td>
							<td>{uses}</td>
							<td>{expiresAt}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
