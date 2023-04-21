import { Review } from "@prisma/client";
import { thisReviews } from "../components/restaurantcard";

export const calculateReviewRatingAverage = (reviews: any[]) => {
	if (!reviews.length) return 0;
	return (
		reviews.reduce((sum, review) => {
			return sum + review.rating;
		}, 0) / reviews.length
	);
};

export const renderRatingText = (rating: number) => {
	if (rating > 4) return "Awesome";
	else if (rating <= 4 && rating > 3) return "Good";
	else if (rating <= 3 && rating > 2) return "Average";
	else "";
};
