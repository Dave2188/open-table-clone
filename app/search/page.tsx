/* eslint-disable @next/next/no-img-element */

import Header from "../components/header";
import SearchSideBar from "./components/searchSideBar";
import SearchRestaurantCard from "./components/searchRestaurantCard";
import SearchCardContainer from "./components/searchCardContainer";
import { PrismaClient, location } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string | undefined) => {
	if (!city) prisma.restaurant.findMany();

	city = city?.toLocaleLowerCase();

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: city,
				},
			},
		},
	});
};

export default async function Search({ searchParams }: { searchParams: { city: string } }) {
	const restLocations = await fetchRestaurantsByCity(searchParams.city);

	console.log(restLocations);

	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar />
				<SearchCardContainer>
					<SearchRestaurantCard restaurants={restLocations} />
				</SearchCardContainer>
			</div>
		</>
	);
}
