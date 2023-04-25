import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email, password } = req.body;

		// validate the user inputs
		const errors: string[] = [];
		const validatorSchema = [
			{
				valid: validator.isEmail(email),
				errorMessage: "Email is invalid",
			},
			{
				valid: validator.isLength(password, {
					min: 1,
				}),

				errorMessage: "Password is invalid",
			},
		];

		validatorSchema.forEach((check) => {
			if (!check.valid) {
				errors.push(check.errorMessage);
			}
		});

		if (errors.length) return res.status(400).json({ error: errors[0] });

		// check to see if user already exists
		const userWithEmail = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!userWithEmail) {
			return res.status(401).json("Email or password is invalid");
		}

		// comparing the password
		const isMatch = await bcrypt.compare(password, userWithEmail.password);

		if (!isMatch) {
			return res.status(401).json("Email or password is invalid");
		}

		// Creating the JWT with secret that has been encoded
		const alg = "HS256";

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);

		const token = await new jose.SignJWT({ email: userWithEmail.email })
			.setProtectedHeader({ alg })
			.setExpirationTime("24hr")
			.sign(secret);

		return res.status(200).json({ token: token });
	}

	return res.status(404).json("Unknown endpoint");
}
