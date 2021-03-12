import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			mt={2}
		>
			<Typography>Loading...</Typography>
			<CircularProgress style={{ margin: "16px" }} />
		</Box>
	);
};

export default Loading;
