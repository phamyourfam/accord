import { DropResult } from 'react-beautiful-dnd';

function onDragEnd(
	{ destination, draggableId, source }: DropResult,
	state: any,
	setState: Function
) {
	if (
		!destination ||
		(destination.droppableId === source.droppableId &&
			destination.index === source.index)
	) {
		/* Return prematurely if the destination is invalid 
      or the item has returned to the same position. */
		return;
	}

	// Reorder the items.
	const items = [...state];
	const [reorderedItem] = items.splice(source.index, 1);
	items.splice(destination.index, 0, reorderedItem);

	setState(items);

	return destination.index;
}

export function useDnD() {
	return { onDragEnd };
}
