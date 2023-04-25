import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { firstName, lastName, email, phone, city, password } = req.body;

		// validate the user inputs
		const errors: string[] = [];
		const validatorSchema = [
			{
				valid: validator.isLength(firstName, {
					min: 1,
					max: 20,
				}),
				errorMessage: "First name is invalid",
			},
			{
				valid: validator.isLength(lastName, {
					min: 1,
					max: 20,
				}),
				errorMessage: "Last name is invalid",
			},
			{
				valid: validator.isEmail(email),
				errorMessage: "Email is invalid",
			},
			{
				valid: validator.isMobilePhone(phone),
				errorMessage: "Phone number is Invalid",
			},
			{
				valid: validator.isLength(city, {
					min: 1,
					max: 20,
				}),
				errorMessage: "Please enter a city between 1-20 characters",
			},
			{
				valid: validator.isStrongPassword(password),
				errorMessage: "Password is not Strong enough",
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

		if (userWithEmail) {
			return res.status(401).json("Email is already associated with another account");
		}

		// hashing the password
		const hashPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				first_name: firstName,
				last_name: lastName,
				password: hashPassword,
				email: email,
				phone: phone,
				city: city,
			},
		});

		// Creating the JWT with secret that has been encoded
		const alg = "HS256";

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);

		const token = await new jose.SignJWT({ email: user.email })
			.setProtectedHeader({ alg })
			.setExpirationTime("24hr")
			.sign(secret);

		res.status(200).json({ token: token });
	}

	return res.status(404).json("Unknown endpoint");
}
