import RestaurantNavBar from "../../components/restaurantNavBar";

import Menu from "../../components/menu";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			items: true,
		},
	});

	if (!restaurant) throw new Error("menu restaurant");

	return restaurant;
};

export default async function RestaurantMenu({ params }: { params: { slug: string } }) {
	const menu = await fetchRestaurantMenu(params.slug);

	return (
		<>
			<div className="bg-white w-[100%] rounded p-3 shadow">
				<RestaurantNavBar slug={params.slug} />
				<Menu menu={menu.items} />
			</div>
		</>
	);
}
