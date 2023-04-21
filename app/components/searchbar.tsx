"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRICE } from "@prisma/client";

interface HTMLCollectionOf {
	placeholder: string;
}

type restLocations = {
	location: {
		id: number;
		name: string;
	};
	id: number;
	name: string;
	main_img: string;
	price: PRICE;
	cuisine: {
		id: number;
		name: string;
	};
	slug: string;
};

export default function SearchBar({ restLocations }: { restLocations: restLocations[] }) {
	const router = useRouter();

	const [location, setLocation] = useState<string>("");

	// TODO filter for name or city
	// add keypress for enter
	const handleClick = () => {
		if (location === "") {
			const message = document.getElementsByClassName("searchInputHeader");
			message[0].setAttribute("placeholder", "Please enter search term");
			return;
		}

		router.push(`/search?city=${location}`);
	};

	const locations = ["ottawa", "toronto", "niagara"];

	return (
		<>
			<div className="text-left text-lg py-3 m-auto flex justify-center">
				<input
					className="searchInputHeader rounded  mr-3 p-2 w-[450px] "
					type="text"
					list="searchData"
					placeholder="State, city or town"
					value={location}
					onChange={(e) => {
						setLocation(e.target.value);
					}}
					enterKeyHint="enter"
					onKeyDown={handleClick}
				/>
				<datalist id="searchData">
					{locations.map((item, index) => (
						<li key={index}>
							<option value={item} />
						</li>
					))}
				</datalist>
				<button className=" hover:cursor-pointer rounded bg-red-600 px-9 py-2 text-white" onClick={handleClick}>
					Let`s go
				</button>
			</div>
		</>
	);
}
