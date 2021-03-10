import React from "react";
import { useSelector } from "react-redux";

import { selectImageBaseUrl } from "../configuration/configurationSlice";

const MovieProfile = ({ movie }) => {
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const backdropUrl = `${imageBaseUrl}original${movie.backdrop_path}`;

	return <div>{backdropUrl}</div>;
};

export default MovieProfile;
