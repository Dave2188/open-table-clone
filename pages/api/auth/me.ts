import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const bearerToken = req.headers.authorization;

	if (!bearerToken) {
		return res.status(401).json({ error: "Unauthorized request (No bearer)" });
	}

	// get token
	const token = bearerToken.split(" ")[1];

	if (!token) {
		res.status(401).json({
			error: "Unauthorized request (No token)",
		});
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	// using var so is not scoped
	try {
		var { payload } = await jose.jwtVerify(token, secret, { algorithms: ["HS256"] });
	} catch (error) {
		return res.status(401).json({
			error: "Unauthorized request (Unverified token)",
		});
	}

	const email: string = payload.email as string;

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			city: true,
			phone: true,
		},
	});

	// jose works just as easy as JWT package for basic usage
	// const tryingSomething = jose.decodeJwt(token);

	return res.json({ user });
}
