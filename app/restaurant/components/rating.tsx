import { reviews } from "../../page";
import { starRating } from "../../components/restaurantcard";

export default function Rating({ reviews }: { reviews: reviews }) {
	let stars = starRating(reviews);
	return (
		<>
			<div className="flex items-end">
				<div className="ratings mt-2 flex items-center">
					<p>{starString(stars)}</p>
					<p className="text-reg ml-3">{stars}</p>
				</div>
				<div>
					<p className="text-reg ml-4">{reviews.length} Reviews</p>
				</div>
			</div>
		</>
	);
}

export const starString = (stars: number) => {
	let string = "";
	for (let i = 1; i <= stars; i++) {
		string += "*";
	}
	return string;
};
