import useOnclickOutside from 'react-cool-onclickoutside';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Avatar } from '../common/components';
import { AccordLogo } from '../common/assets/svg';
import { Modal } from '../common/components';
import { Space } from '../features/spaces';
import { useDnD } from '../common/hooks';
import {
	ISpaceMembership,
	setColorMode,
	useGetUserQuery
} from '../features/user';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUnauthenticated, useLogOutMutation } from '../features/auth';
import { Field, Form, Formik } from 'formik';

const statusTypes = [
	{
		id: 0,
		name: 'Online',
		icon: <i className="w-3 h-3 text-xs text-green-600 bi-circle-fill" />
	},
	{
		id: 1,
		name: 'Idle',
		icon: <i className="w-3 h-3 text-xs text-yellow-600 bi-circle-fill" />
	},
	{
		id: 2,
		name: 'Do Not Disturb',
		icon: <i className="w-3 h-3 text-xs text-red-600 bi-dash-circle-fill" />
	},
	{
		id: 3,
		name: 'Invisible',
		icon: <i className="w-3 h-3 text-xs text-gray-600 bi-circle" />
	}
];

const Spaces = ({
	data
}: {
	data: { spaceMemberships: ISpaceMembership[] };
}) => (
	<>
		{data.spaceMemberships.map(
			({ recentChannelId, space: { id, name, iconUrl, verifiedAt } }, i) => (
				<Draggable key={id} draggableId={id} index={i}>
					{({ dragHandleProps, draggableProps, innerRef }) => (
						<Link to={`/space/${id}/${recentChannelId}`}>
							<li
								data-tip={JSON.stringify({ name, verifiedAt })}
								data-for="tooltip"
								ref={innerRef}
								className="z-10 mb-5 before:w-10 before:h-10 before:rounded-lg before:mb-5 dark:before:bg-slate before:absolute before:top-0 before:left-0 before:z-[-1]"
								{...dragHandleProps}
								{...draggableProps}>
								<Avatar
									alt={`${name}'s Space Icon`}
									className="w-10 h-10 scale"
									imageUrl={iconUrl}
								/>
							</li>
						</Link>
					)}
				</Draggable>
			)
		)}
	</>
);

export const SpacesSidebar = () => {
	const colorMode = useAppSelector((state) => state.user.colorMode);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const outsideClickHandler = useOnclickOutside(() =>
		setShowStatusSelection(false)
	);
	const [logOut] = useLogOutMutation();
	const [showStatusSelection, setShowStatusSelection] = useState(false);
	const [spaceMemberships, setSpaceMembersips] = useState<ISpaceMembership[]>(
		[]
	);
	const { onDragEnd } = useDnD();
	const {
		data: user,
		error: userQueryError,
		isError: isUserQueryError
	} = useGetUserQuery();

	if (colorMode === 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}

	useEffect(() => {
		if (
			!!userQueryError &&
			'data' in userQueryError &&
			userQueryError.status === 401
		) {
			if (userQueryError.status === 401) {
				dispatch(setUnauthenticated());
				logOut();
				navigate('/login');
			} else if (isUserQueryError) {
				setTimeout(() => {
					dispatch(setUnauthenticated());
					logOut();
					navigate('/login');
				}, 10000);
			}
		}
	}, [userQueryError]);

	useEffect(
		() => setSpaceMembersips(user?.spaceMemberships || []),
		[user?.spaceMemberships]
	);

	const getTooltipContent = (dataTip: string) => {
		if (dataTip) {
			const data = JSON.parse(dataTip);
			return (
				<>
					{data.name}
					{data.verifiedAt && (
						<i className="z-30 ml-1 text-white bi bi-patch-check-fill"></i>
					)}
				</>
			);
		}
	};

	// useEffect(() => {
	// 	if (isSuccess)
	// 		setSpaces(
	// 			user!.spaces.map(({ id, name, iconUrl, verifiedAt }, i) => (
	// 				<Draggable key={id} draggableId={id} index={i}>
	// 					{({ dragHandleProps, draggableProps, innerRef }) => (
	// 						<li
	// 							data-tip={JSON.stringify({ name, verifiedAt })}
	// 							data-for="tooltip"
	// 							ref={innerRef}
	// 							className="z-10 mb-5 before:w-10 before:h-10 before:rounded-lg before:mb-5 dark:before:bg-slate before:absolute before:top-0 before:left-0 before:z-[-1]"
	// 							{...dragHandleProps}
	// 							{...draggableProps}>
	// 							<Link to="/">
	// 								<Avatar
	// 									className="w-10 h-10 scale"
	// 									src={iconUrl}
	// 									alt={`${name}'s Space Icon`}
	// 								/>
	// 							</Link>
	// 						</li>
	// 					)}
	// 				</Draggable>
	// 			))
	// 		);
	// }, []);

	return (
		<>
			<ReactTooltip
				id="tooltip"
				effect="solid"
				backgroundColor="#397AFF"
				getContent={getTooltipContent}
				className="font-bold"
			/>
			<Modal
				after={
					<div className="absolute bottom-0 z-20 text-white -translate-x-1/2 left-1/2">
						Connection problems? Let us know!
					</div>
				}
				mainClassName="flex-col flex-center space-y-2"
				showModal={isUserQueryError}
				setShowModal={() => {}}>
				<>
					<img
						alt="Mi Pan Su Su"
						className="rounded-lg"
						draggable={false}
						src="https://c.tenor.com/K1zVlgTXVpYAAAAM/mi-pan-mi-pan-su-su-su.gif"
					/>
					<h1 className="heading">Well, this is awkward.</h1>
					<span>Looks like Accord crashed unexpectedly.</span>
					{JSON.stringify(userQueryError)}
				</>
			</Modal>
			<div className="flex flex-col items-center w-1/5 h-screen p-5 dark:bg-slate-light bg-eggshell-light">
				<DragDropContext
					onDragEnd={(e) => onDragEnd(e, spaceMemberships, setSpaceMembersips)}>
					<ol className="flex flex-col items-center mb-auto">
						<li>
							<Link
								to="/me"
								data-tip="Your Hub"
								className="flex w-10 h-10 mb-5 border-2 rounded-lg border-bloo scale dark:hover:bg-slate-dark hover:bg-eggshell-dark">
								<AccordLogo className="w-6 h-6 m-auto text-bloo" />
							</Link>
						</li>
						<div className="w-8 h-1 rounded-lg bg-bloo"></div>
						<Droppable droppableId="spaces">
							{({ droppableProps, innerRef, placeholder }) => (
								<ol
									{...droppableProps}
									ref={innerRef}
									className="relative z-50 w-full mt-5">
									<ol
									// className="absolute top-0 left-0 z-[-1]"
									>
										<Spaces data={{ spaceMemberships }} />
									</ol>
									{placeholder}
								</ol>
							)}
						</Droppable>
						<li>
							<Link to="/space/discovery">
								<button className="w-10 h-10 rounded-lg scale dark:bg-slate bg-eggshell">
									<i className="bi bi-plus-lg text-bloo"></i>
								</button>
							</Link>
						</li>
					</ol>
				</DragDropContext>
				<label className="dark-mode-toggle">
					<input
						checked={colorMode === 'dark'}
						type="checkbox"
						onChange={() =>
							dispatch(setColorMode(colorMode === 'dark' ? 'light' : 'dark'))
						}
						className="opacity-0"
					/>
					<div
						className="dark-mode-toggle__slider"
						data-tip="Toggle Colour Mode"
					/>
				</label>
				<div
					className="relative cursor-pointer"
					onClick={() => setShowStatusSelection(true || !showStatusSelection)}>
					<Avatar
						alt={user?.forename + `'s Avatar`}
						className="w-10 h-10 mb-5"
						imageUrl={user?.avatarUrl || ''}>
						{showStatusSelection && (
							<Formik
								initialValues={{
									status: {
										type: user?.status.type || 0,
										emoji: '',
										message: ''
									}
								}}
								onSubmit={() => {}}>
								{({ setFieldValue, values }) => (
									<Form
										className="absolute z-10 flex flex-col w-40 ml-5 rounded-lg dark:bg-slate-lighter bg-eggshell-lighter left-full top-1/4 -translate-y-3/4"
										ref={outsideClickHandler}>
										<ul>
											{statusTypes.map(({ id, name, icon }) => (
												<li
													className={
														'option ' +
														((+values.status.type === id &&
															'option--selected') ||
															'')
													}
													key={id}
													onClick={() => setFieldValue('status.type', id)}>
													{icon}
													<span className="ml-2 dark:text-white">{name}</span>
												</li>
											))}
										</ul>
										<Field
											className="field"
											name="custom.message"
											placeholder={user?.status.message || 'Custom status'}
										/>
										<button className="p-5 btn dark:text-white" disabled={true}>
											<i className="person-badge-fill"></i>
											Switch Account
										</button>
									</Form>
								)}
							</Formik>
						)}
						<span className="absolute inline-block w-3 h-3 bg-green-600 border-[1.5px] rounded-full -right-1 -bottom-1 dark:border-slate-light border-eggshell-light"></span>
					</Avatar>
				</div>
				<Link to="/me/account">
					<button
						data-tip="Your Settings"
						className="w-10 h-10 border-2 border-black border-solid rounded-lg opacity-25 dark:text-white dark:border-white dark:bg-slate scale bi-gear-wide-connected"
					/>
				</Link>
			</div>
		</>
	);
};
