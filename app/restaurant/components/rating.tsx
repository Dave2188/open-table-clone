import { reviews } from "../../page";
import Stars from "../../components/stars";

export default function Rating({ reviews }: { reviews: reviews }) {
	return (
		<>
			<div className="flex items-end">
				<div className="ratings mt-2 flex items-center">
					<Stars reviews={reviews} />
					<p className="text-reg  ml-4">{reviews.length} Reviews</p>
				</div>
			</div>
		</>
	);
}
