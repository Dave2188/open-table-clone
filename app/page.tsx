"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import dynamic from "next/dynamic";
import { Inter } from "@next/font/google";
import Header from "./components/header";
import Card from "./components/restaurantcard";
import Cards from "./components/restaurantcards";

const inter = Inter({ subsets: ["latin"] });

// const Header = dynamic(() => import("./components/header"), { ssr: false });

export default function Home() {
	return (
		<main>
			<Header />
			<Cards>
				<Card />
			</Cards>
		</main>
	);
}
