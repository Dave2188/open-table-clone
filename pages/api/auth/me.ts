import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.headers.authorization) return;

	const bearerToken = req.headers.authorization;
	// get token
	const token = bearerToken.split(" ")[1];

	var payload = await jose.decodeJwt(token);

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

	return res.json({ user });
}
