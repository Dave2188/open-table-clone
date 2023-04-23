/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Stars from "./stars";
import Price from "./price";
import { PRICE } from "@prisma/client";

export default function Card({ restaurant }: { restaurant: thisRestaurant }) {
	return (
		<>
			<Link href={`/restaurant/${restaurant.slug}`}>
				<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
					<img src={restaurant.main_img} alt="" className="w-full h-36" />
					<div className="p-1">
						<h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
						<div className="flex items-start">
							<Stars reviews={restaurant.reviews} />
							<p className="ml-2">
								{restaurant.reviews.length} {restaurant.reviews.length === 1 ? "review" : "reviews"}
							</p>
						</div>
						<div className="flex text-reg font-light capitalize">
							<p className=" mr-3">{restaurant.cuisine.name}</p>
							<Price price={restaurant.price} />
							<p>{restaurant.location.name}</p>
						</div>
						<p className="text-sm mt-1 font-bold">Booked 3 times today</p>
					</div>
				</div>
			</Link>
		</>
	);
}

type thisRestaurant = {
	reviews: thisReviews[];
	id: number;
	cuisine: { id: number; name: string };
	price: PRICE;
	location: {
		id: number;
		name: string;
	};
	name: string;
	main_img: string;
	slug: string;
};

export type thisReviews = {
	id: number;
	first_name: string;
	last_name: string;
	text: string;
	rating: number;
	restaurant_id: number;
};
