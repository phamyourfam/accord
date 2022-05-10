import useOnclickOutside from 'react-cool-onclickoutside';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Categories } from '../categories';
import { useGetSpaceQuery } from '../spaces';
import { Avatar, Sidebar } from '../../common/components';

const data = [
	{
		id: '1',
		name: 'Main Stuff',
		isMuted: false,
		channels: [
			{
				id: '1',
				name: 'general',
				type: 2,
				status: 'UNREAD',
				isMuted: false
			},
			{
				id: '2',
				name: 'off-topic',
				type: 2,
				status: 'UNREAD',
				isMuted: false,
				notifications: 420
			},
			{
				id: '3',
				name: 'memes',
				type: 2,
				status: 'UNREAD',
				isMuted: false,
				notifications: 1
			}
		]
	},
	{
		id: '2',
		name: 'Staff',
		isMuted: false,
		channels: [
			{
				id: '4',
				name: 'vc',
				type: 1,
				isMuted: true,
				notifications: 10
			},
			{
				id: '5',
				name: 'chat',
				type: 1,
				isMuted: true,
				notifications: 10
			}
		]
	}
];

export const SpaceSidebar = () => {
	const navigate = useNavigate();
	const outsideClickHandler = useOnclickOutside(() => setShowDropdown(false));
	const { spaceId } = useParams();
	const [showDropdown, setShowDropdown] = useState(false);
	const {
		data: space,
		isError: spaceIsError,
		isLoading: spaceIsLoading
	} = useGetSpaceQuery(spaceId || '');

	if (spaceIsError) navigate('/space/discovery');

	return (
		<Sidebar searchBarPlaceholder={`Search ${space?.name || ''}`}>
			<div
				className="relative flex items-center w-11/12 p-5 mb-5 rounded-lg cursor-pointer dark:bg-slate-light bg-eggshell-light ignore-onclickoutside"
				onClick={() => setShowDropdown(!showDropdown)}>
				<Avatar
					alt="r/6th"
					className="z-10 flex-shrink-0 mr-4 w-14 h-14"
					isLoading={spaceIsLoading}
					imageUrl={space?.iconUrl || ''}>
					{space?.verifiedAt && (
						<>
							<i className="absolute z-30 bi bi-patch-check-fill text-bloo -right-1.5 -bottom-1.5"></i>
							<i className="absolute -bottom-1.5 -right-1.5 bi bi-record-fill text-white"></i>
						</>
					)}
				</Avatar>
				<h1
					className={
						'z-10 p-1 text-base truncate-paragraph ' +
						(space?.name ? 'heading text-shadow' : 'skeleton')
					}>
					{space?.name || 'Space Name'}
				</h1>
				<i
					className={
						'absolute bottom-0 text-white bi-chevron-down text-shadow right-2 z-10 ' +
						(showDropdown && 'rotate-180')
					}
				/>
				{space?.bannerUrl && (
					<img
						src={space?.bannerUrl}
						alt=""
						draggable={false}
						className="absolute top-0 left-0 object-cover object-center w-full h-full rounded select-none"
					/>
				)}
				{showDropdown && (
					<aside
						className="absolute mt-2.5 top-full rounded-lg bg-eggshell-lighter dark:bg-slate-lighter w-full left-0 z-10"
						onClick={(e) => e.stopPropagation()}
						ref={outsideClickHandler}>
						<ul className="p-2">
							<Link to={`/space/${spaceId}/overview`}>
								<li className="option">
									<i className="mr-1 bi-gear-wide-connected"></i>Settings
								</li>
							</Link>
							<Link to={`/space/${spaceId}/invites`}>
								<li className="option">
									<i className="mr-1 bi-person-plus-fill"></i>Invites
								</li>
							</Link>
							<Link to={`/space/${spaceId}/invites`}>
								<li className="option">
									<i className="mr-1 bi-door-open-fill" />
									Leave Space
								</li>
							</Link>
						</ul>
					</aside>
				)}
			</div>
			<Categories data={{ categories: space?.categories || [] }} />
		</Sidebar>
	);
};
