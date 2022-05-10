import { Avatar } from '../../common/components';

const Contact = ({
	children,
	data,
	isLoading = true,
	name
}: {
	children?: React.ReactElement;
	data?: any;
	isLoading?: boolean;
	name: string;
}) => (
	<button className="flex flex-col items-center justify-center p-1 ml-6 rounded-lg hover:bg-opacity-25 hover:bg-white">
		{children || (
			<Avatar
				alt="Gigachad"
				className="w-14 h-14"
				imageUrl=""
				// imageUrl="https://pbs.twimg.com/media/EdvJVWFUwAAqRYY.jpg"
				isLoading={isLoading}>
				{false && (
					<i
						className={
							'absolute inline-block w-4 h-4 bg-green-600 rounded-full -right-[0.35rem] -bottom-[0.35rem] border-2 dark:border-slate border-eggshell'
						}
					/>
				)}
			</Avatar>
		)}
		<figcaption className={'max-w-[8ch] mt-2 ' + (isLoading && 'skeleton')}>
			{name}
		</figcaption>
	</button>
);

const Contacts = () => (
	<>
		{[1, 2].map((x, i) => (
			<Contact key={x * i} name="Gigachad" />
		))}
	</>
);

export const Me = () => {
	return (
		<>
			<header className="py-5 mx-10 mt-5 rounded-lg dark:bg-slate bg-eggshell">
				<div className="flex items-center mb-4 ml-6">
					<i className="bi-people-fill"></i>
					<h2 className="ml-2 text-xl heading">Your contacts</h2>
				</div>
				<div className="flex mb-2">
					{/* <Contact name="Add contact">
						<div className="rounded-lg grid-center w-14 h-14 dark:bg-slate-light bg-eggshell-light">
							<i className="bi bi-plus-lg text-bloo"></i>
						</div>
					</Contact> */}
					<Contacts />
				</div>
			</header>
		</>
	);
};
