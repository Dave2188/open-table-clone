import NavBar from "./components/navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<main className="bg-gray-100 min-h-screen w-screen">
					<main className="max-w-screen-3xl m-auto bg-white">
						<NavBar />
						{children}
					</main>
				</main>
			</body>
		</html>
	);
}
