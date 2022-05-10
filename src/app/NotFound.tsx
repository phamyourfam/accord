import { AccordLogo } from '../common/assets/svg';

export const NotFound = () => {
	return (
		<section className="grid h-screen place-items-center dark:bg-slate-dark bg-gray-50">
			<div className="flex flex-col items-center justify-center">
				<h1 className="pb-4 font-extrabold text-transparent bg-clip-text md:text-8xl lg:text-9xl bg-gradient-to-r from-bloo-dark to-dew animate-gradient bg-size-200%">
					404
				</h1>
				<p className="text-xl dark:text-white">
					We couldn't find what you were looking for.
					<span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-pinkity-drinkity to-bloo-light">
						¯\_(ツ)_/¯
					</span>
				</p>
				<button
					className="px-4 py-2 mt-4 font-bold text-white rounded bg-bloo disabled:opacity-50"
					onClick={() => window.history.go(-1)}>
					Return to previous page
				</button>
			</div>
			<AccordLogo className="absolute left-0 right-0 w-10 h-10 ml-auto mr-auto bottom-5 text-bloo" />
		</section>
	);
};
