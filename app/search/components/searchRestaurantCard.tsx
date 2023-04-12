import { PRICE, cuisine, location } from "@prisma/client";
import Price from "../../components/price";

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
					<div key={index} className="border-b flex pb-3">
						<img src={restaurant.main_img} alt="" className=" w-48 rounded" />
						<div className="pl-5">
							<h2 className="text-3xl">{restaurant.name}</h2>
							<div className="flex items-start">
								<div className="flex mb-2">*****</div>
								<p className="ml-2 text-sm">Awesome</p>
							</div>
							<div className="mb-9">
								<div className="font-light flex text-reg">
									<Price price={restaurant.price} />
									<p className="mr-4">{restaurant.cuisine.name}</p>
									<p className="mr-4">{restaurant.location.name}</p>
								</div>
							</div>
							<div className="text-red-600">
								<a href="">View more information</a>
							</div>
						</div>
					</div>
				);
			})}

			<div className="border-b flex pb-5">
				<img src="https://images.otstatic.com/prod1/49153814/2/medium.jpg" alt="" className="w-44 rounded" />
				<div className="pl-5">
					<h2 className="text-3xl">Aiāna Restaurant Collective</h2>
					<div className="flex items-start">
						<div className="flex mb-2">*****</div>
						<p className="ml-2 text-sm">Awesome</p>
					</div>
					<div className="mb-9">
						<div className="font-light flex text-reg">
							<p className="mr-4">$$$</p>
							<p className="mr-4">Mexican</p>
							<p className="mr-4">Ottawa</p>
						</div>
					</div>
					<div className="text-red-600">
						<a href="">View more information</a>
					</div>
				</div>
			</div>
		</>
	);
}
