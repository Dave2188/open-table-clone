import Link from "next/link";
import RestaurantDescription from "../components/restaurantDescription";
import Reviews from "../components/reviews";
import PhotoBlock from "../components/photoBlock";
import ReservationCard from "../components/reservationCard";
import RestaurantNavBar from "../components/restaurantNavBar";
import Title from "../components/title";
import Rating from "../components/rating";
import { PrismaClient } from "@prisma/client";
import { reviews } from "../../page";
/* eslint-disable @next/next/no-img-element */

const prisma = new PrismaClient();

interface Restaurant {
	id: number;
	name: string;
	images: string[];
	description: string;
	slug: string;
	reviews: reviews;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: { slug },
		select: {
			id: true,
			name: true,
			images: true,
			description: true,
			reviews: {
				select: {
					id: true,
					first_name: true,
					last_name: true,
					text: true,
					rating: true,
					restaurant_id: true,
					user_id: true,
				},
			},
			slug: true,
		},
	});

	if (!restaurant) throw new Error("No restaurant");

	return restaurant;
};

export default async function RestaurantDetails({ params }: { params: { slug: string } }) {
	const restaurant = await fetchRestaurantBySlug(params.slug);

	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavBar slug={restaurant.slug} />
				<Title name={restaurant.name} />
				<Rating reviews={restaurant.reviews} />
				<RestaurantDescription description={restaurant.description} />
				<PhotoBlock images={restaurant.images} />
				<Reviews />
			</div>
			<ReservationCard />
		</>
	);
}
