import { PRICE, cuisine, location } from "@prisma/client";
import Price from "../../components/price";

// can interface Restaurant here
type restLocations = {
	id: number;
	name: string;
	main_img: string;
	price: PRICE;
	cuisine: cuisine;
	location: location;
	slug: string;
};

/* eslint-disable @next/next/no-img-element */
export default function SearchRestaurantCard({ restaurants }: { restaurants: restLocations[] }) {
	return (
		<>
			{restaurants.map((restaurant, index) => {
				return (
					<div key={index} className="border-b flex pb-3 h-36 mb-4">
						<img src={restaurant.main_img} alt="" className=" w-48 rounded" />
						<div className="pl-5">
							<h2 className="text-3xl">{restaurant.name}</h2>
							<div className="flex items-start">
								<div className="flex mb-2">*****</div>
								<p className="ml-2 text-sm">Awesome</p>
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
