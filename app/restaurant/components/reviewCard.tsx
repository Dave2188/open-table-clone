import { reviews } from "../../page";
// import { starString } from "./rating";
import { review } from "./reviews";

export default function ReviewCard({ review }: { review: review }) {
	console.log(review);
	return (
		<>
			{" "}
			<div className="border-b pb-7 mb-7">
				<div className="flex">
					<div className="w-1/6 flex flex-col items-center">
						<div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
							<h2 className="text-white text-2xl">MJ</h2>
						</div>
						<p className="text-center">{review.first_name + " " + review.last_name}</p>
					</div>
					<div className="ml-10 w-5/6">
						<div className="flex items-center">
							<div className="flex mr-5 text-lg">{starString(review.rating)}</div>
						</div>
						<div className="mt-5">
							<p className="text-lg font-light">{review.text}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const starString = (stars: number) => {
	let string = "";
	for (let i = 1; i <= stars; i++) {
		string += "*";
	}
	return string;
};
