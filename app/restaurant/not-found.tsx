"use client";

import errorMascot from "../../public/error.png";
import Image from "next/image";

export default function error({ error }: { error: Error }) {
	return (
		<div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
			<Image src={errorMascot} className="w-56 mb-5" alt="error" />
			<div className="bg-white px-9 py-14 shadow rounded">
				<h3 className="text-3xl mb-1 font-bold">Well, this is embarrassing</h3>
				<p className="text-reg font-bold">We could not find that restaurant...</p>
				<p className="mt-6 text-light text-sm">Error Code: 404</p>
			</div>
		</div>
	);
}
