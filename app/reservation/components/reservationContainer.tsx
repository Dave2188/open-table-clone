export default function ReservationContainer({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="border-t h-screen">
				<div className="py-9 w-3/5 m-auto">{children}</div>
			</div>
		</>
	);
}
