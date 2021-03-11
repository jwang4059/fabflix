import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import NoPerson from "../../components/NoPerson";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "14rem",
		width: "8rem",
		padding: theme.spacing(1),
		margin: theme.spacing(0, 1),
		flex: "0 0 auto",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	profile: {
		height: "6rem",
		objectFit: "cover",
	},
}));

const StarCard = ({ star }) => {
	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);

	let profile = null;
	if (!star.profile_path) {
		profile = <NoPerson />;
	} else {
		const profileUrl = `${imageBaseUrl}original${star.profile_path}`;
		profile = <img className={classes.profile} src={profileUrl} alt="" />;
	}

	return (
		<Card className={classes.card}>
			<div className={classes.content}>
				<CardMedia>{profile}</CardMedia>
				<CardContent>
					<Typography>{star.name}</Typography>
					<Typography variant="caption" color="textSecondary">
						{star.character}
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
};

export default StarCard;
