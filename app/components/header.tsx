import SearchBar from "./searchbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantLocations = async () => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			name: true,
			location: {
				select: {
					name: true,
				},
			},
		},
	});

	return restaurants;
};

const Header = async () => {
	const restaurants = await fetchRestaurantLocations();

	return (
		<header>
			<div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
				<div className="text-center mt-10">
					<h1 className="text-white text-5xl font-bold mb-2">Find your table for any occasion</h1>
					<SearchBar restaurants={restaurants} />
				</div>
			</div>
		</header>
	);
};
export default Header;
