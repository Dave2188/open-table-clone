import { PRICE, PrismaClient, cuisine, location } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
interface Location {
	name: string;
}
interface Cuisine {
	name: string;
}
interface Restaurant {
	id: number;
	name: string;
	main_img: string;
	price: PRICE;
	cuisine: Cuisine;
	location: Location;
	slug: string;
}

// alt you could have just grabbed the data from the locations and cuisine models and passed them in because they from the start only have one of each instance......

export default function SearchSideBar({
	searchParams,
	restLocations,
}: {
	searchParams: { city: string; cuisine: string; price: PRICE };
	restLocations: Restaurant[];
}) {
	const selections = restLocations;

	const locations = selections.reduce((acc: string[], restaurant: Restaurant) => {
		if (!acc.includes(restaurant.location.name)) {
			acc.push(restaurant.location.name);
		}
		return acc;
	}, []);

	const cuisines = selections.reduce((acc: string[], restaurant: Restaurant) => {
		if (!acc.includes(restaurant.cuisine.name)) {
			acc.push(restaurant.cuisine.name);
		}
		return acc;
	}, []);

	return (
		<>
			<div className="w-1/5 mt-1">
				<div className="border-b pb-4">
					<h1 className="mb-2">Region</h1>
					{locations.map((item: string, index) => {
						return (
							<Link
								key={index}
								href={{
									pathname: "/search",
									query: {
										...searchParams,
										city: item,
									},
								}}
							>
								<p className="capitalize font-light text-reg">{item}</p>
							</Link>
						);
					})}
				</div>
				<div className="border-b pb-4 mt-3">
					<h1 className="mb-2">Cuisine</h1>
					{cuisines.map((item: string, index) => {
						return (
							<Link
								key={index}
								href={{
									pathname: "/search",
									query: {
										...searchParams,
										cuisine: item,
									},
								}}
							>
								<p className="capitalize font-light text-reg">{item}</p>
							</Link>
						);
					})}
				</div>
				<div className="mt-3 pb-4">
					<h1 className="mb-2">Price</h1>
					<div className="flex">
						<Link
							href={{
								pathname: "/search",
								query: {
									...searchParams,
									price: PRICE.CHEAP,
								},
							}}
							className="border w-full text-reg text-center font-light rounded-l p-2"
						>
							$
						</Link>
						<Link
							href={{
								pathname: "/search",
								query: {
									...searchParams,
									price: PRICE.REGULAR,
								},
							}}
							className="border-r border-t border-b w-full text-center text-reg font-light p-2"
						>
							$$
						</Link>
						<Link
							href={{
								pathname: "/search",
								query: {
									...searchParams,
									price: PRICE.EXPENSIVE,
								},
							}}
							className="border-r border-t border-b w-full text-reg text-center font-light p-2 rounded-r"
						>
							$$$
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
