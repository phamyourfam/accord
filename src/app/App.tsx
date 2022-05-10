import ReactTooltip from 'react-tooltip';
import { useRef } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';

import { SidebarToggle } from '../common/components';
import { SpacesSidebar } from '.';

export function App({
	sidebar,
	main,
	mainClassName,
	widgets
}: {
	sidebar?: JSX.Element;
	main: JSX.Element;
	mainClassName?: string;
	widgets?: JSX.Element[];
}) {
	const widgetsSidebar = useRef<HTMLElement>(null);
	const outletExists = Boolean(useOutlet());

	if (outletExists) return <Outlet />;

	return (
		<div
			className="grid grid-cols-[auto,1fr,auto] h-screen overflow-hidden"
			onContextMenu={(e) => e.preventDefault()}>
			<ReactTooltip effect="solid" backgroundColor="#397AFF" />
			<aside className="flex col-end-2 sidebar">
				<SpacesSidebar />
				{sidebar}
			</aside>
			<main
				className={
					'relative flex w-full col-start-2 col-end-3 row-end-2 dark:text-white bg-eggshell-dark dark:bg-slate-dark h-full ' +
					(mainClassName || 'flex-col')
				}>
				{main}
			</main>
			{widgets && (
				<aside
					className="relative flex h-full col-start-3 col-end-4 dark:bg-slate bg-eggshell sidebar"
					ref={widgetsSidebar}>
					<SidebarToggle />
					<div className="w-11/12 mx-auto mt-16">
						{widgets}
						{/* <div className="flex items-center p-5 mb-5 rounded-lg clock dark:bg-slate-light bg-eggshell-light">
						<h2 className="opacity-75 heading">Members</h2>
					</div> */}
					</div>
				</aside>
			)}
		</div>
	);
}
