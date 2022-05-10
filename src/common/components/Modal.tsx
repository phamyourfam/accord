import React from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({
	title,
	message,
	header,
	children,
	footer,
	after,
	overlayClassName,
	mainClassName,
	showModal,
	setShowModal
}: {
	title?: string;
	message?: string;
	header?: JSX.Element;
	children?: JSX.Element;
	footer?: JSX.Element;
	after?: JSX.Element;
	overlayClassName?: string;
	mainClassName?: string;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	if (!showModal) return null;

	return ReactDOM.createPortal(
		<div
			className={`fixed top-0 bottom-0 left-0 right-0 z-50 ${
				overlayClassName || 'bg-black bg-opacity-25'
			}`}
			onClick={() => setShowModal(false)}>
			<div
				className="dark:text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-slate bg-eggshell w-[80vh] rounded-lg flex flex-col"
				onClick={(e) => e.stopPropagation()}>
				{header && (
					<header className="h-full pt-5 pl-5 -mb-3">
						{header || <h3 className="mb-3 text-2xl heading">{title}</h3>}
					</header>
				)}
				<main className={`p-5 ${mainClassName}`}>
					{children || <p>{message}</p>}
				</main>
				{footer && (
					<footer className="flex w-full px-5 py-2 rounded-b-lg dark:bg-slate-dark bg-eggshell-dark">
						{footer}
					</footer>
				)}
			</div>
			{after}
		</div>,
		document.body
	);
};
