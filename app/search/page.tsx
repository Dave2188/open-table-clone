/* eslint-disable @next/next/no-img-element */

import Header from "../components/header";
import SearchSideBar from "./components/searchSideBar";
import SearchRestaurantCard from "./components/searchRestaurantCard";
import SearchCardContainer from "./components/searchCardContainer";
import { PrismaClient, location } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string | undefined) => {
	const select = {
		id: true,
		name: true,
		main_img: true,
		price: true,
		cuisine: {
			select: {
				id: true,
				name: true,
				Created_at: false,
				updated_at: false,
			},
		},
		location: {
			select: {
				id: true,
				name: true,
				Created_at: false,
				updated_at: false,
			},
		},
		slug: true,
	};

	if (!city) prisma.restaurant.findMany({ select });

	city = city?.toLocaleLowerCase();

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: city,
				},
			},
		},
		select,
	});
};

export default async function Search({ searchParams }: { searchParams: { city: string } }) {
	const restLocations = await fetchRestaurantsByCity(searchParams.city);
	// console.log(restLocations);
	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-3/4 justify-between items-start">
				<SearchSideBar restaurants={restLocations} searchParams={searchParams.city} />
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
