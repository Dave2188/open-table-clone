import RestaurantHeader from "../components/restaurantHeader";

export default function RestaurantLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { slug: string };
}) {
	return (
		<main>
			<RestaurantHeader name={params.slug} />
			<div className="flex m-auto w-2/3 justify-between items-start  pb-5 mt-11">{children}</div>
		</main>
	);
}
