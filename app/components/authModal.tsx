"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import AuthModalInputs from "./authModalInputs";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	borderRadius: "5px",
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({ isSignedIn }: { isSignedIn: boolean }) {
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [open, setOpen] = useState(false);
	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		city: "",
		password: "",
	});

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const renderSignContent = (signInContent: string, signUpContent: string) => {
		return isSignedIn ? signInContent : signUpContent;
	};

	return (
		<div>
			<button
				className={`${renderSignContent("bg-blue-400 text-white", "")}border p-1 px-4 rounded mr-3`}
				onClick={handleOpen}
			>
				{renderSignContent("Sign in", "Sign up")}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="p-2 h-[400px]">
						<div className="p-2">
							<div className="uppercase font-bold text-center pb-2 mb-2 border-b-2">
								<p className="text-sm">{renderSignContent("Sign In", "Create Account")}</p>
							</div>
						</div>
						<div className=" m-auto">
							<h2 className="text-2xl font-light text-center">
								{renderSignContent("Log Into Your Account", "Create Your Open-Table Account")}
							</h2>
							<AuthModalInputs inputs={inputs} handleChangeInput={handleChangeInput} isSignedIn={isSignedIn} />
							<button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 hover:bg-red-400 disabled:bg-gray-400">
								{renderSignContent("Sign In", "Create Account")}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
