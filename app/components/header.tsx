import reservation from "../reservation/[slug]/page";
import SearchBar from "./searchbar";
import { PRICE } from "@prisma/client";

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

export default function Header({ restLocations }: { restLocations: restLocations[] }) {
	// console.log(restLocations);
	return (
		<header>
			<div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
				<div className="text-center mt-10">
					<h1 className="text-white text-5xl font-bold mb-2">Find your table for any occasion</h1>
					<SearchBar restLocations={restLocations} />
				</div>
			</div>
		</header>
	);
}
