import Link from "next/link";
import RestaurantHeader from "../components/restaurantHeader";
import RestaurantDescription from "../components/restaurantDescription";
import Reviews from "../components/reviews";
import PhotoBlock from "../components/photoBlock";
import ReservationCard from "../components/reservationCard";
import RestaurantNavBar from "../components/restaurantNavBar";
import Title from "../components/title";
import Rating from "../components/rating";

/* eslint-disable @next/next/no-img-element */
export default function RestaurantDetails() {
	return (
		<>
			<RestaurantHeader />
			<div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
				<div className="bg-white w-[70%] rounded p-3 shadow">
					<RestaurantNavBar />
					<Title />
					<Rating />
					<RestaurantDescription />
					<PhotoBlock />
					<Reviews />
				</div>
				<ReservationCard />
			</div>
		</>
	);
}