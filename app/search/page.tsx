/* eslint-disable @next/next/no-img-element */
import Header from "../components/header";
import SearchSideBar from "./components/searchSideBar";
import SearchRestaurantCard from "./components/searchRestaurantCard";
import SearchCardContainer from "./components/searchCardContainer";

export default function Search() {
	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar />
				<SearchCardContainer>
					<SearchRestaurantCard />
				</SearchCardContainer>
			</div>
		</>
	);
}
