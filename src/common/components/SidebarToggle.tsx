import React from 'react';

function handleRightSidebarToggler(e?: any) {
	const el = e.currentTarget;
	// ['w-0', 'hidden-children'].forEach((className) =>
	// 	el.closest('aside')?.classList.toggle(className)
	// );
	el.closest('aside')?.classList.toggle('w-0');
	el.parentElement?.classList.toggle('hover:-translate-x-10');

	setTimeout(
		() =>
			['rounded-bl-none', 'rounded-br-none'].forEach((className) =>
				el.classList.toggle(className)
			),
		300
	);
}

export const SidebarToggle = ({
	children,
	direction
}: {
	children?: React.ReactNode;
	direction?: string;
}) => {
	direction = direction?.toLowerCase();

	return (
		<div className="flex">
			<div
				className={`sidebar-toggle absolute top-0 flex transition duration-300 w-[7.5rem] h-[7.5rem] z-10 ${
					direction === 'left' ? '-right-20' : '-left-20'
				}`}>
				<button
					onClick={handleRightSidebarToggler}
					className={`w-10 h-10 rounded-t-none btn dark:hover:bg-bloo hover:bg-bloo dark:bg-slate-lighter bg-eggshell-lighter transform-gpu ${
						direction === 'left'
							? 'mr-auto rounded-br-none'
							: 'ml-auto rounded-bl-none'
					}`}>
					<i className="bi bi-grid-fill"></i>
				</button>
			</div>
			<div className="absolute -right-16">{children}</div>
		</div>
	);
};
