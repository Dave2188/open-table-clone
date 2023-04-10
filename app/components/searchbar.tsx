"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HTMLCollectionOf {
	placeholder: string;
}

export default function SearchBar({ restaurants }: { restaurants: { name: string; location: { name: string } }[] }) {
	const router = useRouter();

	const [location, setLocation] = useState<string>("");

	// TODO filter for name or city
	const handleClick = () => {
		if (!location) {
			const message = document.getElementsByClassName("searchInputHeader");
			message[0].setAttribute("placeholder", "Please enter search term");
		}

		router.push(`/search?city=${location}`);
	};

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
				/>
				<datalist id="searchData">
					{restaurants.map((item, index) => (
						<li key={index}>
							<option value={item.name} />
							<option value={item.location.name} />
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
