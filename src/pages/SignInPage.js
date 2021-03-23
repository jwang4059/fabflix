import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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

	const handleSubmitLogin = (event) => {
		event.preventDefault();
		console.log(email);
		console.log(password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.content}>
				<Typography className={classes.title} component="h1">
					Fabflix Login
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={email}
						autoComplete="email"
						autoFocus
						onChange={handleEmailChange}
						onKeyPress={handleEnterKey}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
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
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignInPage;
