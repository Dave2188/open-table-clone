/* eslint-disable @next/next/no-img-element */
export default function PhotoBlock({ images }: { images: string[] }) {
	return (
		<>
			<div>
				<h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
					{images.length}
					{images.length === 1 ? " Photo" : " Photos"}
				</h1>
				<div className="flex flex-wrap">
					{images.map((image, index) => {
						return <img key={index} className="w-56 h-44 mr-1 mb-1" src={image} alt="" />;
					})}
				</div>
			</div>
		</>
	);
}
