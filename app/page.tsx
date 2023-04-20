/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import Header from "./components/header";
import Card from "./components/restaurantcard";
import Cards from "./components/restaurantcards";
import { PrismaClient, cuisine, location, PRICE, Review } from "@prisma/client";
const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();

export interface RestaurantCardType {
	id: number;
	name: string;
	main_img: string;
	cuisine: cuisine;
	location: location;
	price: PRICE;
	slug: string;
	reviews: Review[];
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

// const sum = (a:number,b: number) => {
//   let sum =	a + b
//   return sum;
// }

// sum(2,5) //?
