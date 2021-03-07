import React from "react";

import Layout from "./features/layout/Layout";
import MoviesList from "./features/movies/MoviesList";

function App() {
	return (
		<Layout>
			<MoviesList />
		</Layout>
	);
}

export default App;
