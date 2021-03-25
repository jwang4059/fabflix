import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: "4rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%",
		marginTop: "1rem",
	},
	submit: {
		margin: "2rem 0 1rem 0",
	},
}));

const SignUpPage = () => {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleEnterKey = (event) => {
		const code = event.keyCode ? event.keyCode : event.which;
		if (code === 13) {
			handleSubmitForm(event);
		}
	};

	const handleSubmitForm = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("https://fabflix-api.herokuapp.com/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Fabflix Registration
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								id="name"
								name="name"
								label="Name"
								value={name}
								autoComplete="name"
								autoFocus
								fullWidth
								required
								onChange={handleNameChange}
								onKeyPress={handleEnterKey}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								id="email"
								name="email"
								type="email"
								label="Email Address"
								value={email}
								autoComplete="email"
								fullWidth
								required
								onChange={handleEmailChange}
								onKeyPress={handleEnterKey}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								id="password"
								name="password"
								type="password"
								label="Password"
								value={password}
								autoComplete="current-password"
								fullWidth
								required
								onChange={handlePasswordChange}
								onKeyPress={handleEnterKey}
							/>
						</Grid>
					</Grid>
					<Button
						className={classes.submit}
						variant="contained"
						color="primary"
						type="submit"
						fullWidth
						onClick={handleSubmitForm}
					>
						Sign Up
					</Button>
					<Box display="flex" justifyContent="flex-end">
						<Link to="/signin">Already have an account? Sign in</Link>
					</Box>
				</form>
			</div>
		</Container>
	);
};

export default SignUpPage;
