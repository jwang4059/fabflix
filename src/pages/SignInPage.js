import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { signin } from "../features/authentication/authenticationSlice";

const useStyles = makeStyles((theme) => ({
	content: {
		marginTop: "4rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
		fontSize: "1.5rem",
		lineHeight: "2rem",
	},
	form: {
		width: "100%",
		marginTop: "1rem",
	},
	submit: {
		margin: "2rem 0 1rem 0",
	},
}));

const SignInPage = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const authStatus = useSelector((state) => state.authentification.status);
	const authError = useSelector((state) => state.authentification.error);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleEnterKey = (event) => {
		const code = event.keyCode ? event.keyCode : event.which;
		if (code === 13) {
			handleSubmitLogin(event);
		}
	};

	const handleSubmitLogin = async (event) => {
		event.preventDefault();
		const response = await dispatch(signin({ email, password }));
		if (response?.payload?.status === "succeeded") {
			history.push("/");
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.content}>
				<Typography className={classes.title} component="h1">
					Fabflix Login
				</Typography>
				<form className={classes.form}>
					<Typography color="error">{authError}</Typography>
					<TextField
						variant="outlined"
						id="email"
						name="email"
						type="email"
						label="Email Address"
						value={email}
						error={authStatus === "failed"}
						autoComplete="email"
						autoFocus
						margin="normal"
						fullWidth
						required
						onChange={handleEmailChange}
						onKeyPress={handleEnterKey}
					/>
					<TextField
						variant="outlined"
						id="password"
						name="password"
						type="password"
						label="Password"
						value={password}
						error={authStatus === "failed"}
						margin="normal"
						fullWidth
						required
						autoComplete="current-password"
						onChange={handlePasswordChange}
						onKeyPress={handleEnterKey}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmitLogin}
					>
						Sign In
					</Button>
					<Box display="flex" justifyContent="flex-end">
						<Link to="/signup">"Don't have an account? Sign Up"</Link>
					</Box>
				</form>
			</div>
		</Container>
	);
};

export default SignInPage;
