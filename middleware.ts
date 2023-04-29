import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
	const bearerToken = req.headers.get("authorization");

	if (!bearerToken) {
		return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized request" }), { status: 401 });
	}

	// get token
	const token = bearerToken.split(" ")[1];

	if (!token) {
		return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized no token" }), { status: 401 });
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	// using var so is not scoped
	try {
		var { payload } = await jose.jwtVerify(token, secret, { algorithms: ["HS256"] });
	} catch (error) {
		return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized token" }), { status: 401 });
	}
}

export const config = {
	matcher: ["/api/auth/me"],
};
