import { PRICE } from "@prisma/client";

export default function Price({ price }: { price: PRICE }) {
	const renderPrice = () => {
		if (price === "CHEAP") {
			return (
				<>
					<span>$$</span>
					<span className="text-gray-400">$$</span>
				</>
			);
		} else if (price === "REGULAR") {
			return (
				<>
					<span>$$$</span>
					<span className="text-gray-400">$</span>
				</>
			);
		} else if (price === "EXPENSIVE") {
			return (
				<>
					<span>$$$$</span>
				</>
			);
		} else {
			return;
		}
	};

	return <p className="flex mr-3">{renderPrice()}</p>;
}
