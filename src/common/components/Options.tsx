import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../../common/components';

interface Option {
	[optionName: string]: {
		name?: string | React.ReactElement;
		selected?: boolean;
		to?: string;
		onClick?: Function;
	};
}

export const Option = ({
	children,
	onClick,
	selected,
	to
}: {
	children?: any;
	onClick?: Function;
	selected?: boolean;
	to: string;
}) => {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => {
				if (onClick) {
					return onClick();
				}

				navigate(to);
			}}
			className={`flex items-center w-11/12 p-2 px-5 py-2 rounded-lg select-none hover:bg-opacity-25 hover:bg-white ${
				selected ? 'bg-white bg-opacity-25' : ''
			}`}>
			{children}
		</button>
	);
};

export const Options = ({
	heading,
	options
}: {
	heading: React.ReactElement;
	options: Option;
}) => {
	return (
		<Sidebar header={heading}>
			{Object.entries(options).map(
				([optionName, { name, selected, to, onClick }], i) => (
					<Option
						children={name || optionName}
						key={i}
						onClick={onClick}
						selected={selected}
						to={to || ''}
					/>
				)
			)}
		</Sidebar>
	);
};
