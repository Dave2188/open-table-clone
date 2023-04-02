import ReservationContainer from "../components/reservationContainer";
import ReservationForm from "../components/reservationForm";
import ReservationHeader from "../components/reservationHeader";

/* eslint-disable @next/next/no-img-element */
export default function reservation() {
	return (
		<>
			<ReservationContainer>
				<ReservationHeader />
				<ReservationForm />
			</ReservationContainer>
		</>
	);
}
