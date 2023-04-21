/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import Header from "./components/header";
import Card from "./components/restaurantcard";
import Cards from "./components/restaurantcards";
import { PrismaClient, cuisine, location, PRICE, Review, Restaurant } from "@prisma/client";
const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();

export default async function Home() {
	const restaurants = await fetchRestaurants();

	return (
		<main>
			<Header restLocations={restaurants} />
			<Cards>
				{restaurants.map((restaurant) => (
					<Card key={restaurant.id} restaurant={restaurant} reviews={restaurant.reviews} />
				))}
			</Cards>
		</main>
	);
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_img: true,
			cuisine: true,
			location: true,
			price: true,
			slug: true,
			reviews: true,
		},
	});

	return restaurants;
};

export interface RestaurantCardType {
	id: number;
	name: string;
	main_img: string;
	cuisine: {
		id: number;
		name: string;
	};
	location: {
		id: number;
		name: string;
	};
	price: PRICE;
	slug: string;
	reviews: reviews;
}

export type reviews = {
	id: number;
	first_name: string;
	last_name: string;
	text: string;
	rating: number;
	restaurant_id: number;
	user_id: number;
}[];
