/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import Header from "./components/header";
import Card from "./components/restaurantcard";
import Cards from "./components/restaurantcards";
import { PrismaClient, PRICE } from "@prisma/client";
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

const fetchRestaurants = async () => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_img: true,
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
			price: true,
			slug: true,
			reviews: {
				select: {
					id: true,
					first_name: true,
					last_name: true,
					text: true,
					rating: true,
					restaurant_id: true,
				},
			},
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
}[];
