import React, { ReactNode } from 'react';

export const Avatar = ({
	alt,
	children,
	className,
	imageClassName,
	imageRef,
	imageUrl,
	isLoading,
	style
}: {
	alt: string;
	children?: ReactNode;
	className?: string;
	imageClassName?: string;
	imageRef?: React.Ref<HTMLImageElement>;
	imageUrl: string;
	isLoading?: boolean;
	style?: {};
}) => {
	return (
		<figure className={`relative rounded-lg  ${className}`} style={style}>
			<div className="w-full h-full rounded-lg skeleton">
				<img
					alt={alt}
					className={`hidden object-cover object-center w-full h-full rounded-lg select-none ${imageClassName}`}
					draggable={false}
					onError={({ target }: any) => {
						console.log(target, 'some error');
						if (!isLoading) {
							target.closest('div').classList.remove('skeleton');
							target.closest('div').classList.add('placeholder');
						}
					}}
					onLoad={({ target }: any) => {
						target.classList.remove('hidden');
						target.closest('div').classList.remove('skeleton');
						target.closest('div').classList.remove('placeholder');
					}}
					ref={imageRef}
					src={imageUrl}
				/>
			</div>
			{children}
		</figure>
	);
};
