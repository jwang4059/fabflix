import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const MovieListBackButton = () => {
	const history = useHistory();
	const movielistUrl = useSelector((state) => state.movies.url);

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={() => history.push(movielistUrl)}
			>
				Back to movie list
			</Button>
		</Box>
	);
};

export default MovieListBackButton;
