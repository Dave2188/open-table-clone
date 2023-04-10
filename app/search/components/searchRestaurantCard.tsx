import { Restaurant } from "@prisma/client";
import Price from "../../components/price";

/* eslint-disable @next/next/no-img-element */
export default function SearchRestaurantCard({ restaurants }: { restaurants: Restaurant[] }) {
	return (
		<>
			{restaurants.map((restaurant) => {
				return (
					<div key={restaurant.id} className="border-b flex pb-5">
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
									<p className="mr-4">{restaurant.cuisine_id}</p>
									<p className="mr-4">{restaurant.location_id}</p>
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
