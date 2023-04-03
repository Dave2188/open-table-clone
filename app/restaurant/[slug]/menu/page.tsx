import Link from "next/link";
import RestaurantHeader from "../../components/restaurantHeader";
import RestaurantNavBar from "../../components/restaurantNavBar";
import MenuCard from "../../components/menuCard";
import Menu from "../../components/menu";

export default function RestaurantMenu() {
	return (
		<>
			<div className="bg-white w-[100%] rounded p-3 shadow">
				<RestaurantNavBar />
				<Menu />
			</div>
		</>
	);
}
