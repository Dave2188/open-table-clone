import { Children, ReactComponentElement } from "react";

export default function Cards({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="text-black py-3 px-36 mt-10 flex flex-wrap justify-center">{children}</div>
		</>
	);
}
