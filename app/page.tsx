/* eslint-disable @next/next/no-img-element */
import { Inter } from "@next/font/google";
import Header from "./components/header";
import Card from "./components/restaurantcard";
import Cards from "./components/restaurantcards";
import { PrismaClient } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();
// const Header = dynamic(() => import("./components/header"), { ssr: false });

const fetchRestaurants = async () => {
	const restaurants = await prisma.restaurant.findMany();

	return restaurants;
};

export default async function Home() {
	const restaurants = await fetchRestaurants();
	console.log(restaurants);

	return (
		<main>
			<Header />
			<Cards>
				<Card />
			</Cards>
		</main>
	);
}
