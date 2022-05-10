import { AppMockup } from '../../common/assets/img';

import { Link, Navigate, Outlet } from 'react-router-dom';

import { Message } from '../messages';
import { useAppSelector } from '../../app';

export const Landing = () => {
	const isAuth = useAppSelector((state) => state.auth.authenticatedAt);

	if (isAuth !== -1) return <Navigate to="me" />;

	document.title = 'Accord | Collaboration Reimagined';

	return (
		<div className="flex justify-center dark:text-gray-50">
			<aside className="flex justify-center flex-shrink-0 h-screen py-10 bg-white dark:bg-slate sidebar">
				<Outlet />
			</aside>
			<header className="grid justify-center grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] bg-gray-50 dark:bg-slate-dark h-screen">
				<nav className="flex items-start justify-around col-start-5 col-end-7 m-10">
					<Link to="product" className="opacity-50 scale">
						Product
					</Link>
					<Link to="about" className="opacity-50 scale">
						About
					</Link>
					<a
						className="opacity-50 scale"
						href="https://buymeacoffee.com/phamyourfam">
						Donate
					</a>
				</nav>
				<h1 className="flex flex-col items-center justify-start col-start-2 col-end-6 row-start-2 row-end-5">
					<Message
						className="absolute invisible animate-floating 2xl:visible"
						data={{
							id: '68',
							body: [
								'My team works so productively having ',
								'all of our our communications in',
								'ONE place.'
							],
							author: {
								avatarUrl:
									'https://2x1dks3q6aoj44bz1r1tr92f-wpengine.netdna-ssl.com/wp-content/uploads/2020/02/Black-Lapel-Shadow-Check-Custom-Suit.jpg',
								forename: 'Vincent'
							},
							reactions: [{ id: '1', count: 12, native: '👍' }],
							createdAt: Date.now() - 60000
						}}
					/>
					<span className="font-extrabold text-transparent md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-pinkity-drinkity to-bloo-light">
						Collaboration
					</span>
					<span className="pb-4 font-extrabold text-transparent bg-clip-text md:text-7xl lg:text-8xl bg-gradient-to-r from-bloo-dark to-dew animate-gradient bg-size-200%">
						Reimagined
					</span>
					<span className="mt-8 text-xl text-center opacity-50">
						Upgrade the way you work through our cloud-based communication and
						collaboration platform.
					</span>
					<Message
						className="absolute invisible pt-20 animate-floating 2xl:visible"
						data={{
							id: '69',
							body: [
								'I <3 the fact that I can host',
								'my awesome community here. 🥰'
							],
							author: {
								avatarUrl:
									'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2020/04/IG-annvmariv.jpg',
								forename: 'Emily'
							},
							reactions: [
								{ id: '1', count: 6, native: '💖' },
								{ id: '2', count: 9, native: '😎' }
							],
							createdAt: Date.now()
						}}
						reverse={true}
					/>
				</h1>
				<img
					alt="App mockup."
					className="col-start-2 col-end-6 row-start-5 row-end-9"
					draggable={false}
					src={AppMockup}
				/>
			</header>
		</div>
	);
};
