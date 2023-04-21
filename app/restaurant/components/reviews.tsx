import { reviews } from "../../page";
import ReviewCard from "./reviewCard";

export default function Reviews({ reviews }: { reviews: reviews }) {
	console.log(reviews);
	return (
		<>
			<div>
				<h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">What 100 people are saying</h1>
				{reviews.map((review: review, index) => {
					return <ReviewCard key={index} review={review} />;
				})}
			</div>
		</>
	);
}

export type review = {
	id: number;
	first_name: string;
	last_name: string;
	text: string;
	rating: number;
	restaurant_id: number;
	user_id: number;
};
