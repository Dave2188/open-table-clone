import Header from "../components/header";
import SearchSideBar from "./components/searchSideBar";
import SearchRestaurantCard from "./components/searchRestaurantCard";
import SearchCardContainer from "./components/searchCardContainer";
import { PRICE, PrismaClient, cuisine, location } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Search({
	searchParams,
}: {
	searchParams: { city: string; cuisine: string; price: PRICE };
}) {
	const restLocations = await fetchRestaurantsByQuery(searchParams.city, searchParams.cuisine, searchParams.price);
	return (
		<>
			<Header restLocations={restLocations} />
			<div className="flex py-4 m-auto w-3/4 justify-between items-start">
				<SearchSideBar searchParams={searchParams} restLocations={restLocations} />

				<SearchCardContainer>
					{restLocations.length ? (
						<SearchRestaurantCard restaurants={restLocations} />
					) : (
						<p>Sorry, we did not find any restaurants in your area...</p>
					)}
				</SearchCardContainer>
			</div>
		</>
	);
}

const fetchRestaurantsByQuery = (city: string | undefined, cuisine: string | undefined, price: PRICE | undefined) => {
	const select = {
		id: true,
		name: true,
		main_img: true,
		price: true,
		cuisine: {
			select: {
				id: true,
				name: true,
			},
		},
		location: {
			select: {
				id: true,
				name: true,
			},
		},
		reviews: {
			select: {
				rating: true,
			},
		},
		slug: true,
	};

	if (!city) prisma.restaurant.findMany({ select });
	city = city?.toLocaleLowerCase();
	cuisine = cuisine?.toLocaleLowerCase();

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: city,
				},
			},
			cuisine: {
				name: {
					equals: cuisine,
				},
			},
			price: {
				equals: price,
			},
		},
		select,
	});
};

export interface Restaurant {
	id: number;
	name: string;
	main_img: string;
	price: PRICE;
	cuisine: {
		id: number;
		name: string;
	};
	location: {
		id: number;
		name: string;
	};
	reviews: Review;
	slug: string;
}

interface Review {
	rating: [];
}
