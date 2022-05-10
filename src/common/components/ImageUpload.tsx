import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import { useCallback, useState } from 'react';

import { Avatar } from '.';

function createImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});
}

async function editImg(
	src: string,
	pixelCrop = { x: 0, y: 0, width: 0, height: 0 },
	rotDeg = 0,
	flip = { horizontal: false, vertical: false }
): Promise<Blob> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const image = await createImage(src);

	if (!ctx) {
		return new Blob([]);
	}

	const rotRad = (rotDeg * Math.PI) / 180;
	const bBoxWidth =
		Math.abs(Math.cos(rotRad) * image.width) +
		Math.abs(Math.sin(rotRad) * image.height);
	const bBoxHeight =
		Math.abs(Math.sin(rotRad) * image.width) +
		Math.abs(Math.cos(rotRad) * image.height);

	// Calculate bounding box of the rotated image.
	// Set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);

	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image
	ctx.drawImage(image, 0, 0);

	// croppedAreaPixels values are bounding box relative
	// extract the cropped image using these values
	const data = ctx.getImageData(
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height
	);

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// paste generated rotate image at the top left corner
	ctx.putImageData(data, 0, 0);

	// As Base64 string
	// return canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve) => {
		canvas.toBlob((file) => {
			if (file) resolve(file);
		}, 'image/png');
	});
}

export const ImageUpload = ({
	alt,
	aspect,
	className,
	cropShape,
	hoverText,
	imageUrl,
	modalTitle,
	onChange
}: {
	alt: string;
	aspect?: number;
	className?: string;
	cropShape?: 'rect' | 'round';
	hoverText?: string;
	imageUrl?: string;
	modalTitle?: string;
	onChange: (image: Blob) => void;
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [croppedAreaPixels, setCroppedAreaPixels] = useState({
		x: 0,
		y: 0,
		height: 0,
		width: 0
	});
	const [editedImageUrl, setEditedCroppedImageUrl] = useState<string>();
	const [flip, setFlip] = useState({ horizontal: false, vertical: false });
	const [src, setSrc] = useState<string>(imageUrl || '');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const id = window.crypto.randomUUID();

	function resetCropperState() {
		setCrop({ x: 0, y: 0 });
		setCroppedAreaPixels({
			x: 0,
			y: 0,
			height: 0,
			width: 0
		});
		setSrc(src || '');
		setRotation(0);
		setZoom(1);
	}

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const applyEdit = useCallback(
		async (options?: { skip?: boolean }) => {
			try {
				const { height, width } = await createImage(src);
				const editedImage = options?.skip
					? await editImg(src, { x: 0, y: 0, height, width })
					: await editImg(src, croppedAreaPixels, rotation, flip);

				setEditedCroppedImageUrl(URL.createObjectURL(editedImage));
				setIsModalOpen(false);
				resetCropperState();
				onChange(editedImage);
			} catch (e) {
				console.error(e);
			}
		},
		[croppedAreaPixels, rotation, flip]
	);

	return (
		<>
			<Modal
				appElement={document.getElementById('root')!}
				className="dark:text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[70vh] dark:bg-slate bg-eggshell w-[80vh] rounded-lg flex flex-col outline-none"
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				overlayClassName="bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0"
				shouldCloseOnOverlayClick={true}>
				<header className="h-full p-5 pb-0">
					<h3 className="mb-3 text-2xl heading">
						{modalTitle || 'Edit Image'}
					</h3>
					<Cropper
						aspect={aspect || 16 / 9}
						classes={{
							containerClassName: 'h-3/4 relative rounded-lg',
							cropAreaClassName: 'rounded-lg border-4 border-white'
						}}
						crop={crop}
						cropShape={cropShape || 'round'}
						image={src}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
						zoom={zoom}
					/>
					<div className="w-full px-2 my-5 flex-center">
						<i className="bi-zoom-out"></i>
						<input
							className="w-full mx-5"
							max={3}
							min={1}
							step={0.01}
							onChange={(e) => setZoom(+e.currentTarget.value)}
							type="range"
							value={zoom}
						/>
						<i className="text-2xl bi-zoom-in"></i>
					</div>
				</header>
				<footer className="flex w-full px-5 py-2 rounded-b-lg dark:bg-slate-dark bg-eggshell-dark">
					<button onClick={() => applyEdit({ skip: true })} type="submit">
						Skip
					</button>
					<button
						className="ml-auto mr-2 btn"
						onClick={() => setIsModalOpen(false)}
						type="submit">
						Cancel
					</button>
					<button
						className="rounded bg-bloo btn hover:bg-bloo-dark"
						onClick={() => applyEdit()}
						type="submit">
						Apply
					</button>
				</footer>
			</Modal>
			<label className="cursor-pointer" htmlFor={id}>
				<Avatar
					alt={alt}
					className={className}
					imageUrl={editedImageUrl || imageUrl || src || ''}>
					{hoverText ? (
						<div className="absolute top-0 right-0 invisible hover:visible">
							{hoverText}
						</div>
					) : null}
					<input
						accept="Image/*"
						id={id}
						onChange={(e) => {
							setIsModalOpen(true);
							setSrc(URL.createObjectURL(e.target.files![0]));
							setEditedCroppedImageUrl('');
						}}
						onClick={(e) => ((e.target as HTMLInputElement).value = '')}
						type="file"
					/>
				</Avatar>
			</label>
		</>
	);
};
