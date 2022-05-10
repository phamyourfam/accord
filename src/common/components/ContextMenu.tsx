import ReactDOM from 'react-dom';
import useOnClickOutside from 'react-cool-onclickoutside';
import { useCallback, useEffect, useState } from 'react';

export const ContextMenu = ({
	attachTo,
	className,
	options
}: {
	attachTo?: any;
	className?: string;
	options: any[];
}) => {
	attachTo ||= document;
	const outsideClickHandler = useOnClickOutside(() => setShow(false));
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
	const [show, setShow] = useState(false);

	if (NodeList.prototype.isPrototypeOf(attachTo))
		attachTo = Array.from(attachTo);
	if (!Array.isArray(attachTo)) attachTo = [attachTo];

	const handleContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			setAnchorPoint({ x: e.pageX, y: e.pageY });
			setShow(true);
		},
		[setAnchorPoint]
	);

	const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		attachTo.forEach((el: any) =>
			el.addEventListener('contextmenu', handleContextMenu)
		);

		return () => {
			document.removeEventListener('click', handleClick);
			attachTo.forEach((el: any) =>
				el.removeEventListener('contextmenu', handleContextMenu)
			);
		};
	});

	if (!show) return null;

	return ReactDOM.createPortal(
		<ul
			className={`absolute flex flex-col rounded p-2 dark:bg-slate-lighter bg-eggshell-lighter dark:text-white ${className}`}
			ref={outsideClickHandler}
			style={{
				top: anchorPoint.y + 'px',
				left: anchorPoint.x + 'px'
			}}>
			{options.map(({ name, onClick }) => (
				<li className="option" key={crypto.randomUUID()} onClick={onClick}>
					{name}
				</li>
			))}
		</ul>,
		document.body
	);
};
