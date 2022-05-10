import Collapsible from 'react-collapsible';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { ContextMenu } from '../../common/components';
import { CreateCategoryModal } from './CreateCategoryModal';
import { ICategory } from '.';
import { useCreateCategoryMutation } from '.';
import { useDnD, useOnMutationSubmit } from '../../common/hooks';
import { CreateChannelModal, Channels } from '../channels';

function getChannelStyle(status?: string | boolean): string {
	if (!status) return 'opacity-50';

	switch (String(status).toUpperCase()) {
		case 'UNREAD':
			return 'text-opacity-100';
		case 'READ':
			return 'text-opacity-50';
		case 'TRUE':
			return 'text-opacity-25';
	}

	return '';
}

const Category = ({
	index,
	data,
	onTriggerClick,
	onTriggerMouseDown
}: {
	data: { category: ICategory };
	index: number;
	onTriggerClick: Function;
	onTriggerMouseDown: Function;
}) => {
	const [showCollapsible, setShowCollapsible] = useState(true);
	const { spaceId } = useParams() as { spaceId: string };

	return (
		<Draggable
			draggableId={data.category.id}
			index={index}
			key={data.category.id}>
			{({ dragHandleProps, draggableProps, innerRef }) => (
				<Collapsible
					contentContainerTagName="li"
					handleTriggerClick={() => setShowCollapsible(!showCollapsible)}
					key={data.category.id}
					open={showCollapsible}
					trigger={
						<span
							className={`flex-center select-none ${getChannelStyle('UNREAD')}`}
							onMouseDown={(e) => {
								onTriggerMouseDown(e);
								if (e.button === 0) setShowCollapsible(false); // On left mouse down.
							}}
							ref={innerRef}
							{...draggableProps}
							{...dragHandleProps}>
							<i className="mr-2 duration-300 bi-chevron-down" />
							{data.category.name}
							<button
								className="ml-auto text-2xl bi-plus"
								onClick={(e) => {
									onTriggerClick(e);
									e.stopPropagation();
								}}
							/>
						</span>
					}
					transitionTime={100}
					triggerClassName="heading text-base"
					triggerOpenedClassName="heading text-base">
					<Channels
						data={{
							spaceId,
							categoryId: data.category.id,
							channels: data.category.channels
						}}
					/>
				</Collapsible>
			)}
		</Draggable>
	);
};

export const Categories = ({ data }: { data: { categories: ICategory[] } }) => {
	const createCategoryMutation = useCreateCategoryMutation();
	const updateCategoryMutation = useCreateCategoryMutation();
	const navigate = useNavigate();
	const [onCreateCategory] = useOnMutationSubmit(createCategoryMutation, {});
	const [onUpdateCategory] = useOnMutationSubmit(updateCategoryMutation, {});
	const [categories, setCategories] = useState(data.categories);
	const [categoryId, setCategoryId] = useState('');
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [showChannelModal, setShowChannelModal] = useState(false);
	const { onDragEnd } = useDnD();
	const { spaceId } = useParams() as { spaceId: string };

	return (
		<>
			<CreateCategoryModal
				data={{ spaceId }}
				onCreate={onCreateCategory}
				showModal={showCategoryModal}
				setShowModal={setShowCategoryModal}
			/>
			<CreateChannelModal
				data={{ spaceId, categoryId }}
				onCreate={onCreateCategory}
				showModal={showChannelModal}
				setShowModal={setShowChannelModal}
			/>
			<ContextMenu
				attachTo={Array.from(document.querySelectorAll('.Collapsible')).map(
					(el) => el.firstChild
				)}
				options={[
					{
						name: 'Edit Category',
						onClick: () =>
							navigate(`/space/${spaceId}/category/${categoryId}/overview`)
					},
					{
						name: 'Create Channel',
						onClick: () => setShowChannelModal(true)
					}
				]}
			/>
			<ContextMenu
				attachTo={document.querySelector('#sidebarBody')}
				options={[
					{
						name: 'Create Category',
						onClick: () => setShowCategoryModal(true)
					}
				]}
			/>
			<DragDropContext
				onDragEnd={(e) => {
					onUpdateCategory({
						orderIndex: onDragEnd(e, categories, setCategories)
					});
				}}>
				<Droppable droppableId="categories">
					{({ droppableProps, innerRef, placeholder }) => (
						<ol
							className="w-11/12 h-full text-opacity-75"
							id="sidebarBody"
							ref={innerRef}
							{...droppableProps}>
							{categories.map((category, i) => (
								<Category
									data={{ category }}
									index={i}
									key={category.id}
									onTriggerClick={() => {
										setCategoryId(category.id);
										setShowChannelModal(true);
									}}
									onTriggerMouseDown={() => setCategoryId(category.id)}
								/>
							))}
							{placeholder}
						</ol>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};
