import Link from "next/link";
import AuthModal from "./authModal";

export default function NavBar() {
	return (
		<>
			<nav className="bg-white p-2 flex justify-between">
				<Link href="/" className="font-bold text-gray-700 text-3xl">
					OpenTable
				</Link>
				<div>
					<div className="flex">
						<AuthModal isSignedIn={true} />
						<AuthModal isSignedIn={false} />
					</div>
				</div>
			</nav>
		</>
	);
}
