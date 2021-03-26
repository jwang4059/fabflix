import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

const textfieldState = {
	value: "",
	valid: true,
	validationMessage: "",
};

const SignUpPage = () => {
	const classes = useStyles();
	const history = useHistory();
	const [nameState, setNameState] = useState(textfieldState);
	const [emailState, setEmailState] = useState(textfieldState);
	const [passwordState, setPasswordState] = useState(textfieldState);
	const [showValidation, setShowValidation] = useState(false);
	const [submissionError, setSubmissionError] = useState(null);

	const handleNameChange = (event) => {
		const { value, validity, validationMessage } = event.target;
		setNameState({ value, valid: validity.valid, validationMessage });
	};

	const handleEmailChange = (event) => {
		const { value, validity, validationMessage } = event.target;
		setEmailState({ value, valid: validity.valid, validationMessage });
	};

	const handlePasswordChange = (event) => {
		const { value, validity, validationMessage } = event.target;
		setPasswordState({ value, valid: validity.valid, validationMessage });
	};

	const handleEnterKey = (event) => {
		const code = event.keyCode ? event.keyCode : event.which;
		if (code === 13) {
			handleSubmitForm(event);
		}
	};

	const handleSubmitForm = async (event) => {
		event.preventDefault();
		if (!showValidation) setShowValidation(true);

		const canSubmit = [
			nameState.valid,
			emailState.valid,
			passwordState.valid,
		].every(Boolean);

		if (canSubmit) {
			try {
				const response = await fetch(
					"https://fabflix-api.herokuapp.com/signup",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: nameState.value,
							email: emailState.value,
							password: passwordState.value,
						}),
					}
				);

				const data = await response.json();

				if (data.name === "error") {
					setSubmissionError(data.detail);
				} else {
					history.push("/signin");
				}
			} catch (e) {
				setSubmissionError(e);
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Fabflix Registration
				</Typography>
				<form className={classes.form}>
					<Typography color="error">{submissionError}</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								id="name"
								name="name"
								label="Name"
								value={nameState.value}
								error={showValidation ? !nameState.valid : false}
								helperText={showValidation ? nameState.validationMessage : ""}
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
								value={emailState.value}
								error={showValidation ? !emailState.valid : false}
								helperText={showValidation ? emailState.validationMessage : ""}
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
								value={passwordState.value}
								error={showValidation ? !passwordState.valid : false}
								helperText={
									showValidation ? passwordState.validationMessage : ""
								}
								inputProps={{ minLength: 8 }}
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
