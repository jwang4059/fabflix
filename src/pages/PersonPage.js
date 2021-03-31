import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import { NoPerson, NoMovies } from "../components/Placeholder";
import HorizontalScrollContainer from "../components/HorizonalScrollContainer";
import { selectImageBaseUrl } from "../features/configuration/configurationSlice";
import MovieCard from "../features/movies/MovieCard";
import MovieListBackButton from "../components/MovieListBackButton";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		margin: theme.spacing(4, 0),
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginBottom: theme.spacing(2),
		},
		[theme.breakpoints.up("sm")]: {
			flexShrink: 0,
			marginRight: theme.spacing(2),
		},
	},
	profile: {
		height: "18rem",
		objectFit: "cover",
	},
	textContainer: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
		[theme.breakpoints.up("sm")]: {
			padding: "1rem",
		},
	},
	header: {
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	name: {
		fontWeight: 700,
		[theme.breakpoints.down("xs")]: {
			fontSize: "1.5rem",
			lineHeight: "2rem",
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: "2.25rem",
			lineHeight: "2.5rem",
		},
	},
	biography: {
		margin: "2rem 0",
	},
	semiBold: {
		fontWeight: 600,
	},
}));

const Profile = ({ classes, person, imageBaseUrl }) => {
	let profile = null;
	if (!person.profile_path) {
		profile = <NoPerson height={"18rem"} width={"12rem"} />;
	} else {
		const profileUrl = imageBaseUrl + person.profile_path;
		profile = <img className={classes.profile} src={profileUrl} alt="" />;
	}

	return <div className={classes.imageContainer}>{profile}</div>;
};

const Movies = ({ classes, person }) => {
	const movieCards = person.movie_credits.cast.map((movie) => {
		return <MovieCard key={movie.id} movie={movie} />;
	});

	return (
		<Box component="section" my={4}>
			<Typography className={classes.semiBold}>Movies:</Typography>
			{movieCards && movieCards.length > 0 ? (
				<HorizontalScrollContainer>{movieCards}</HorizontalScrollContainer>
			) : (
				<NoMovies width="100%" height="16rem" />
			)}
		</Box>
	);
};

const PersonPage = () => {
	const classes = useStyles();
	const { person_id } = useParams();
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const [person, setPerson] = useState(null);

	useEffect(() => {
		const fetchPerson = async () => {
			const response = await fetch(
				`https://fabflix-api.herokuapp.com/person/${person_id}`
			);
			const data = await response.json();

			setPerson(data);
		};

		fetchPerson();
	}, [person_id]);

	if (!person) {
		return <Loading />;
	}

	return (
		<Container component="main" maxWidth="md">
			<section className={classes.main}>
				<Profile
					classes={classes}
					person={person}
					imageBaseUrl={imageBaseUrl}
				/>
				<div className={classes.textContainer}>
					<Typography className={classes.name} component="h1">
						{person.name}
					</Typography>
					<Typography>
						<span className={classes.semiBold}>Birthday:</span>{" "}
						{person.birthday ? person.birthday : "N/A"}
					</Typography>
					<Typography className={classes.biography}>
						{person.biography}
					</Typography>
				</div>
			</section>

			<Movies classes={classes} person={person} />

			<MovieListBackButton />
		</Container>
	);
};

export default PersonPage;
