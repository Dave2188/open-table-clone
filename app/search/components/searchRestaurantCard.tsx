import { PRICE, Review, cuisine, location } from "@prisma/client";
import Price from "../../components/price";
import { starString } from "../../restaurant/components/rating";
import { calculateReviewRatingAverage, renderRatingText } from "../../utilities/calculateReviewRatingAverage";
import Stars from "../../components/stars";
// can interface Restaurant here
interface Restaurant {
	price: PRICE;
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
	reviews: {
		rating: number;
	}[];
	slug: string;
}

/* eslint-disable @next/next/no-img-element */
export default function SearchRestaurantCard({ restaurants }: { restaurants: Restaurant[] }) {
	return (
		<>
			{restaurants.map((restaurant, index) => {
				return (
					<div key={index} className="border-b flex pb-3 h-36 mb-4">
						<img src={restaurant.main_img} alt="" className=" w-48 rounded" />
						<div className="pl-5">
							<h2 className="text-3xl">{restaurant.name}</h2>
							<div className="flex items-start">
								<Stars reviews={restaurant.reviews} />
								<p className="ml-2 text-sm">{renderRatingText(calculateReviewRatingAverage(restaurant.reviews))}</p>
							</div>
							<div className="mb-5">
								<div className="font-light flex text-reg">
									<Price price={restaurant.price} />
									<p className="mr-4">{restaurant.cuisine.name}</p>
									<p className="mr-4">{restaurant.location.name}</p>
								</div>
							</div>
							<div className="text-red-600">
								<a href={`/restaurant/${restaurant.slug}`}>View more information</a>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

const starRating = (reviews: Review[]) => {
	if (!reviews.length) return 0;

	let sum = 0;
	reviews.forEach((element: { rating: number }) => (sum += element.rating));
	sum = Math.round(sum / reviews.length);
	if (sum <= 0) {
		return 0;
	} else {
		return sum;
	}
};
