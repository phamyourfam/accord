import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Channel } from '.';
import { ContextMenu } from '../../common/components';
import { CreateChannelModal } from './';
import { useCreateChannelMutation } from '.';
import { useDnD, useOnMutationSubmit } from '../../common/hooks';

function getIcon(type: number): string {
	switch (type) {
		case 0:
			return '';
		case 1:
			return 'hash';
		case 2:
			return 'record2';
		case 3:
			return '';
	}

	return '';
}

function getChannelStyle(status?: string | boolean): string {
	if (!status) return 'opacity-50';

	switch (String(status).toUpperCase()) {
		case 'UNREAD':
			return 'opacity-100';
		case 'READ':
			return 'opacity-50';
		case 'TRUE':
			return 'opacity-25';
	}

	return '';
}

export const Channels = ({
	data
}: {
	data: { spaceId: string; categoryId: string; channels: Channel[] };
}) => {
	const createChannelMutation = useCreateChannelMutation();
	const navigate = useNavigate();
	const [onCreateChannel] = useOnMutationSubmit(createChannelMutation, {});
	const [channelId, setChannelId] = useState('');
	const [channels, setChannels] = useState(data.channels);
	const [showChannelModal, setShowChannelModal] = useState(false);
	const { onDragEnd } = useDnD();

	return (
		<>
			<CreateChannelModal
				data={{ spaceId: data.spaceId, categoryId: data.categoryId }}
				onCreate={onCreateChannel}
				showModal={showChannelModal}
				setShowModal={setShowChannelModal}
			/>
			<ContextMenu
				attachTo={document.querySelectorAll('.Collapsible')}
				options={[
					{
						name: 'Edit Channel',
						onClick: () =>
							navigate(`/space/${data.spaceId}/channel/${channelId}/overview`)
					},
					{
						name: 'Create Channel',
						onClick: () => setShowChannelModal(true)
					},
					{
						name: 'Copy Channel Id',
						onClick: () => navigator.clipboard.writeText(channelId)
					}
				]}
			/>
			<DragDropContext onDragEnd={(e) => onDragEnd(e, channels, setChannels)}>
				<Droppable droppableId="channels">
					{({ droppableProps, innerRef, placeholder }) => (
						<ol ref={innerRef} {...droppableProps}>
							{channels.map(
								(
									{ id, name, type, status, isMuted, notifications }: any,
									i
								) => (
									<Draggable draggableId={id} index={i} key={id}>
										{({ dragHandleProps, draggableProps, innerRef }) => (
											<li
												key={id}
												onMouseDown={(e) => {
													e.stopPropagation();
													setChannelId(id);
												}}
												ref={innerRef}
												{...dragHandleProps}
												{...draggableProps}>
												<Link
													to={`/space/${data.spaceId}/${id}`}
													className="flex items-center w-full px-5 py-2 bg-white bg-opacity-0 rounded-lg select-none hover:bg-opacity-25">
													<span className="flex">
														<i
															className={`mr-1 text-lg bi-${getIcon(
																type
															)} ${getChannelStyle(isMuted)} ${getChannelStyle(
																status
															)}`}></i>
														<span
															className={
																isMuted ? 'opacity-25' : getChannelStyle(status)
															}>
															{name}
														</span>
													</span>
													{notifications && !isMuted && (
														<strong className="table-cell p-1 ml-auto text-xs text-center text-white align-middle rounded opacity-100 bg-bloo">
															{notifications > 99 ? '99+' : notifications}
														</strong>
													)}
												</Link>
											</li>
										)}
									</Draggable>
								)
							)}
							{placeholder}
						</ol>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};
