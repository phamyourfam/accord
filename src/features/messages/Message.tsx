import { Avatar } from '../../common/components';
import { IMessage } from '.';

export const Message = ({
	className,
	data,
	isLoading,
	reverse
}: {
	className?: string;
	data: IMessage;
	isLoading?: boolean;
	reverse?: boolean;
}) => {
	data.body = Array.isArray(data.body) ? data.body : [data.body];
	const name = `${data.author.forename || ''} ${
		data.author.surname || ''
	}`.trim();

	return (
		<article
			id={data.id}
			className={`grid w-3/4 gap-x-4 auto-cols-max grid-cols-[max-content,1fr] ${className}`}
			style={reverse ? { direction: 'rtl', marginLeft: 'auto' } : {}}>
			<Avatar
				alt={`${name}'s avatar.`}
				className={'flex w-11 h-11 ' + (isLoading && 'skeleton')}
				imageUrl={data.author.avatarUrl || ''}
				isLoading={isLoading}
			/>
			<div className="space-y-1">
				<span
					className="inline-block mb-2"
					style={reverse ? { direction: 'ltr', marginLeft: 'auto' } : {}}>
					<span className={(isLoading && 'skeleton') || ''}>
						{!reverse && (data.author.nickname || name || 'Deleted User')}
					</span>
					<span
						className={
							'text-xs opacity-25 align-center whitespace-nowrap ' +
							(isLoading && 'skeleton')
						}
						style={
							reverse ? { marginRight: '0.5rem' } : { marginLeft: '0.5rem' }
						}>
						{new Date(data.createdAt).toLocaleTimeString('en', {
							hour: 'numeric',
							minute: 'numeric'
						})}
					</span>
					<span className={(isLoading && 'skeleton') || ''}>
						{reverse && (data.author.nickname || name || 'Deleted User')}
					</span>
				</span>
				{data.body.map((text, i) => (
					<p
						className={
							'grid px-4 py-2 max-w-max rounded-b-lg ' +
							(reverse
								? 'bg-bloo dark:bg-bloo'
								: 'bg-eggshell dark:bg-slate-lighter ') +
							(isLoading && ' skeleton')
						}
						key={data.id + i}
						style={
							reverse
								? { borderTopLeftRadius: '0.5rem', direction: 'ltr' }
								: { borderTopRightRadius: '0.5rem' }
						}>
						{text}
					</p>
				))}
				{data.reactions && (
					<ul className="flex">
						{data.reactions.map(({ count, native, imageUrl }) => (
							<li
								className="p-1 dark:bg-slate-light bg-eggshell-light rounded cursor-pointer px-2 hover:opacity-50 mt-2"
								style={
									reverse
										? { direction: 'ltr', marginLeft: '0.5rem' }
										: { marginRight: '0.5rem' }
								}>
								{native} {count}
							</li>
						))}
					</ul>
				)}
			</div>
		</article>
	);
};
