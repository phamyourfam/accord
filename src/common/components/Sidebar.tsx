import useOnClickOutside from 'react-cool-onclickoutside';
import { useState } from 'react';

import { LogOutModal } from '../../features/auth';
import { useGetUserQuery } from '../../features/user';
import { Field, Form, Formik } from 'formik';

export const Sidebar = ({
	children,
	header,
	isLoading,
	searchBarPlaceholder,
	title
}: {
	children?: JSX.Element | JSX.Element[];
	header?: JSX.Element;
	isLoading?: boolean;
	searchBarPlaceholder?: string;
	title?: string;
}) => {
	const outsideClickHandler = useOnClickOutside(() => setShowDropdown(false));
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { data: user } = useGetUserQuery();

	return (
		<>
			<LogOutModal showModal={showModal} setShowModal={setShowModal} />
			<div className="relative flex flex-col items-center w-4/5 py-5 ml-auto dark:text-white bg-eggshell dark:bg-slate">
				<Formik initialValues={{ query: '' }} onSubmit={() => {}}>
					{({ handleChange, values }) => (
						<Form
							autoComplete="off"
							className="relative flex items-center w-11/12 mb-5 input-container">
							{(title && (
								<h2
									className={
										'text-2xl heading truncate-paragraph ' +
										(isLoading && 'skeleton')
									}>
									{title}
								</h2>
							)) ||
								header || (
									<>
										<Field
											className="w-full rounded-lg dark:bg-slate-lighter field bg-eggshell-lighter ignore-onclickoutside"
											onChange={(e: React.ChangeEvent<any>) => {
												setShowDropdown(Boolean(values.query));
												handleChange(e);
											}}
											onFocus={(e: React.ChangeEvent<any>) =>
												setShowDropdown(Boolean(values.query))
											}
											name="query"
											placeholder={searchBarPlaceholder || 'Search'}
										/>
										<button
											className="absolute -translate-y-1/2 transform-gpu top-1/2 right-3 bi-search dark:text-white"
											type="submit"
										/>
										{showDropdown && (
											<aside
												className="absolute mt-2.5 top-full rounded-lg bg-eggshell-lighter dark:bg-slate-lighter w-full left-0 z-10 p-2 flex-center flex-col"
												ref={outsideClickHandler}>
												<ul className="w-full skeleton">Loading...</ul>
											</aside>
										)}
									</>
								)}
						</Form>
					)}
				</Formik>
				{children}
				<div className="flex items-center w-11/12 p-2 mt-auto rounded-lg dark:bg-slate-light bg-eggshell-light">
					<div className="flex flex-col">
						{user ? (
							<h2 className="font-medium">{user.forename + user.surname}</h2>
						) : (
							<span className="select-none">
								<span className="inline mr-1 text-sm skeleton">A Forename</span>
								<span className="text-sm skeleton">S.</span>
							</span>
						)}
						<span
							className={
								`select-none opacity-50 text-xs ` +
								((!user?.id && 'skeleton') || 'cursor-pointer')
							}
							data-tip={user?.id && 'Click to copy username.'}
							data-position="right"
							onClick={() =>
								user?.id && navigator.clipboard.writeText(user.id)
							}>
							{user?.id || 6880868580535009000}
						</span>
					</div>
					{/* <button
					data-tip="Mute"
					className="w-8 h-8 ml-auto text-center grid-center xl:text-lg xl:w-10 xl:h-10 btn">
					<i className="bi-mic-fill"></i>
				</button>
				<button
					data-tip="Deafen"
					className="w-8 h-8 grid-center xl:text-lg xl:w-10 xl:h-10 btn">
					<i className="bi-headphones"></i>
				</button> */}
					<button
						onClick={() => setShowModal(true)}
						data-tip="Log Out"
						className="w-8 h-8 ml-auto grid-center xl:w-10 xl:h-10 btn hover:bg-red-600">
						<i className="ml-1 bi-box-arrow-right"></i>
					</button>
				</div>
			</div>
		</>
	);
};
