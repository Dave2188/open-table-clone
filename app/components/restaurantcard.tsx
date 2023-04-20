/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { RestaurantCardType } from "../page";
import { cuisine, Restaurant, PRICE, Review } from "@prisma/client";
import Price from "./price";

interface Props {
	restaurant: RestaurantCardType;
	reviews: Review[];
	key: Number;
}

export default function Card({ restaurant, reviews }: Props) {
	const starRating = (reviews: Review[]) => {
		let sum = 0;
		reviews.forEach((element: Review) => (sum += element.rating));
		sum = Math.round(sum / reviews.length);
		if (sum <= 0) {
			return 0;
		} else {
			return sum;
		}
	};

	return (
		<>
			<Link href={`/restaurant/${restaurant.slug}`}>
				<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
					<img src={restaurant.main_img} alt="" className="w-full h-36" />
					<div className="p-1">
						<h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
						<div className="flex items-start">
							<div className="flex mb-2 ">{starRating(reviews)} stars</div>
							<p className="ml-2">{restaurant.reviews.length} reviews</p>
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
