import 'emoji-mart/css/emoji-mart.css';

import useOnclickOutside from 'react-cool-onclickoutside';
import { Picker as EmojiPicker, BaseEmoji } from 'emoji-mart';
import { useRef, useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';

import { Avatar } from '../../common/components';
import { useGetChannelQuery } from '../channels';
import { IMessage, Message, useGetChannelMessagesQuery } from '.';
import { useGetSpaceQuery } from '../spaces';
import { useParams } from 'react-router-dom';
import { useSocket } from '../socket.io';

const ChannelIcon = ({ type }: { type: number }) => {
	let iconClass = '';

	switch (type) {
		case 0:
			iconClass = 'bi-megaphone-fill';
			break;
		case 1:
			iconClass = 'bi-hash';
			break;
		case 2:
			iconClass = 'bi-dot';
			break;
		case 666:
			iconClass = 'bi';
			break;
	}

	return <i className={`mr-1 text-lg opacity-50 bi-hash ${iconClass}`} />;
};

const Messages = ({ data }: { data: { messages: IMessage[] } }) => (
	<>
		{data.messages.map((data: any) => (
			<Message data={data} />
		))}
	</>
);

export const Chat = ({ messageBelongsTo }: { messageBelongsTo: string }) => {
	const outsideClickHandler = useOnclickOutside(() => displayUtility(''));
	const messageBarRef = useRef<FormikProps<{ message: '' }>>(null);
	const params = useParams<{ channelId: string; spaceId: string }>();
	const [showAttached, setShowAttached] = useState(false);
	const [showPicker, setShowPicker] = useState(false);
	const [showReply, setShowReply] = useState(false);
	const [showUpload, setShowUpload] = useState(false);
	const [messages, setMessage] = useState<any>([]);
	const [watchingUsers, setWatchingUsers] = useState<{
		[id: string]: { name: string; avatarUrl: string };
	}>({});

	function displayUtility(utility?: string) {
		setShowAttached(utility === 'attached' && !showAttached);
		setShowPicker(utility === 'picker' && !showPicker);
		setShowReply(utility === 'reply' && !showReply);
		setShowUpload(utility === 'upload' && !showUpload);
	}

	function onEmojiPickerSelect({ native: emoji }: BaseEmoji) {
		const messageBar = messageBarRef.current;
		messageBar!.setFieldValue('message', messageBar!.values.message + emoji);
	}

	const { data: spaceDetails } = useGetSpaceQuery(params.spaceId || '');
	const {
		data: channelDetails,
		isError: isChannelError,
		isLoading: isChannelLoading
	} = useGetChannelQuery(params.channelId || '');

	const { data: channelMessages } = useGetChannelMessagesQuery({
		channelId: params.channelId || '',
		limit: 50
	});

	document.title = `Accord | ${spaceDetails?.name || 'Unknown Space'} | ${
		channelDetails?.name || 'unknown-channel'
	}`;

	const { socket: messageSocket } = useSocket('/messages', {
		withCredentials: true
	});
	messageSocket.on('message:created', (message) => {
		setMessage([...messages, message]);
	});

	// const { socket: channelSocket } = useSocket('/channels', {
	// 	withCredentials: true
	// });
	// channelSocket.on('channel:watching', (watchingUser) => {
	// 	setWatchingUsers({
	// 		...watchingUsers,
	// 		[watchingUser.id]: watchingUser.avatarUrl
	// 	});
	// });

	function onSubmit(values: { message: '' }) {
		messageSocket.emit('message:create', {
			[messageBelongsTo + 'Id']: '1234',
			body: values.message
		});
	}

	return (
		<>
			<header className="relative flex items-center w-full h-16 px-10 py-5 select-none dark:text-white dark:bg-slate-dark after:absolute after:right-0 after:w-full after:h-4 after:-bottom-4 after:bg-gradient-to-b dark:after:from-slate-dark to-transparent after:from-eggshell-dark">
				<span className="flex">
					{!isChannelLoading && (
						<ChannelIcon type={channelDetails?.type || 1} />
					)}
					<h2 className={isChannelLoading ? 'skeleton' : 'text-base heading'}>
						{isChannelError
							? 'unknown-channel'
							: channelDetails?.name || 'Sample channel name.'}
					</h2>
				</span>
				{channelDetails?.description && (
					<>
						<div className="w-0.5 h-4 mx-2 rounded-md bg-bloo"></div>
						<p className="text-sm opacity-50">{channelDetails.description}</p>
					</>
				)}
				<ul
					data-place="left"
					data-tip={`102 people are viewing this channel.`}
					className="flex ml-auto space-x-2">
					{Object.entries(watchingUsers).map(([id, { name, avatarUrl }], i) => {
						const viewerCount = Object.keys(watchingUsers).length;

						return (
							<li key={id}>
								{i === 4 ? (
									<Avatar
										alt={name + "'s avatar."}
										className="w-8 h-8"
										imageUrl={avatarUrl}
									/>
								) : (
									<span className="table-cell h-8 text-sm text-center align-middle rounded-md select-none">
										{viewerCount > 99 ? viewerCount : '99+'}
									</span>
								)}
							</li>
						);
					})}
				</ul>
			</header>
			<div className="relative flex-grow h-full px-5 space-y-5 overflow-y-scroll scrollbar">
				<Message
					data={{
						id: '-1',
						body: ['This is a sample message.', 'Disregard.'],
						createdAt: 1647270077448,
						author: { forename: 'Sample Forename' }
					}}
					isLoading={true}
				/>
				<Message
					data={{
						id: '-1',
						body: ['This is a sample message.', 'Disregard.'],
						createdAt: 1647270077448,
						author: { forename: 'Sample Forename' }
					}}
					isLoading={true}
					reverse={true}
				/>
				<Messages data={{ messages }} />
				<div className="absolute bottom-0 left-0 flex w-full px-10 pb-2">
					{showUpload && (
						<div
							className="flex flex-col self-end p-2 rounded-lg bg-eggshell-light dark:bg-slate-light ignore-onclickoutside"
							ref={outsideClickHandler}>
							<label
								htmlFor="file-input"
								className="p-2 rounded-lg opacity-75 hover:bg-eggshell disabled:hover:bg-current btn grid-center">
								<i className="mr-1 text-lg bi bi-file-earmark-arrow-up-fill"></i>
								Upload a file.
								<input id="file-input" type="file" />
							</label>
							<button
								className="p-2 rounded-lg opacity-75 hover:bg-eggshell disabled:hover:bg-current btn grid-center"
								disabled={true}>
								<i className="mr-1 text-lg bi bi-camera-fill"></i>Take an photo.
							</button>
						</div>
					)}
					{showPicker && (
						<span className="ml-auto ignore-onclickoutside">
							<EmojiPicker
								emoji="point_up"
								enableFrequentEmojiSort={true}
								onSelect={onEmojiPickerSelect}
								set="twitter"
								title="Pick an emoji..."
							/>
						</span>
					)}
				</div>
			</div>
			<footer className="px-10 pb-5">
				{showReply && (
					<div className="flex w-full h-10 px-5 py-2 text-sm rounded-lg dark:bg-slate-light bg-eggshell">
						Replying to
						<span className="ml-1 font-bold text-bloo">Donald</span>
						<button className="p-1 ml-auto btn">
							<i className="text-xs bi bi-x-circle-fill flex-center"></i>
						</button>
					</div>
				)}
				{showAttached && (
					<div className="p-5 rounded-t-lg dark:bg-slate-lighter">
						<div className="relative w-40 h-40 bg-slate-light">
							<div className="absolute -top-3 -right-3">
								<button className="p-2 rounded-l bi-eye-fill bg-slate-light" />
								<button className="p-2 bi-pencil-fill bg-slate-light" />
								<button className="p-2 rounded-r bi-trash-fill bg-slate-light" />
							</div>
						</div>
					</div>
				)}
				<Formik
					innerRef={messageBarRef}
					initialValues={{ files: [], message: '' }}
					onSubmit={onSubmit}>
					{({ handleSubmit }) => (
						<Form
							className="flex items-center w-full space-x-2 field"
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleSubmit();
							}}>
							<button
								disabled={isChannelLoading || isChannelError}
								className="w-10 h-10 text-lg btn ignore-onclickoutside hover:bg-slate bi-paperclip flex-center"
								onClick={() => displayUtility('upload')}
								type="button"
							/>
							<input className="hidden" type="file" />
							<Field
								disabled={isChannelLoading || isChannelError}
								className="w-full px-1 border-0 field-reset"
								name="message"
								placeholder={
									isChannelLoading || isChannelError
										? 'Unavailable'
										: `Message ${channelDetails?.name}`
								}
								type="text"
							/>
							<button
								disabled={isChannelLoading || isChannelError}
								className="w-10 h-10 text-lg btn ignore-onclickoutside hover:bg-slate bi-emoji-smile flex-center"
								onClick={() => displayUtility('picker')}
								type="button"
							/>
						</Form>
					)}
				</Formik>
			</footer>
		</>
	);
};
