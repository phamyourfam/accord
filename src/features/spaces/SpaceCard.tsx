import { Avatar } from '../../common/components';
import { Space, useGetSpaceQuery } from '../spaces';

export const SpaceCard = ({
	data,
	isLoading
}: {
	data: Space | any;
	isLoading?: boolean;
}) => {
	return (
		<article className="relative rounded-lg w-60 dark:bg-slate-light bg-eggshell-light">
			<div className="relative w-full rounded-lg aspect-video">
				<Avatar
					alt="r/6th"
					className="absolute z-10 w-12 h-12 ml-2 -translate-y-1/2 border-4 dark:border-slate-light border-eggshell-light top-full"
					imageClassName="rounded"
					imageUrl={data.iconUrl}
					isLoading={isLoading}>
					{data.verifiedAt && (
						<>
							<i className="absolute z-30 bi bi-patch-check-fill text-bloo -right-1.5 -bottom-1.5"></i>
							<i className="absolute -bottom-1.5 -right-1.5 bi bi-record-fill text-white"></i>
						</>
					)}
				</Avatar>
				{data.bannerUrl && (
					<img
						src={data.bannerUrl}
						alt=""
						draggable={false}
						className="absolute top-0 left-0 object-cover object-center w-full h-full rounded-lg select-none"
					/>
				)}
			</div>
			<div className="p-5 mt-2">
				<h3 className="mb-2 text-lg heading truncate-paragraph">{data.name}</h3>
				<p>{data.description}</p>
			</div>
		</article>
	);
};
