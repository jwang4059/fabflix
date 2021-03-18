import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	ul: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	li: {
		listStyle: "none",
	},
	text: {
		padding: "1rem",
	},
	link: {
		color: "inherit",
		textDecoration: "none",
	},
	hidden: {
		display: "none",
	},
}));

const Pagination = () => {
	const classes = useStyles();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = useSelector((state) => state.movies.page);
	const total_pages = useSelector((state) => state.movies.total_pages);

	console.log(location.search);
	console.log(query);

	const getPageUrl = (pageNum) => {
		query.set("page", pageNum);
		return `${location.pathname}?${query.toString()}`;
	};

	const prev_url = getPageUrl(page - 1);
	const next_url = getPageUrl(page + 1);

	return (
		<nav className={classes.nav}>
			<ul className={classes.ul}>
				<li className={clsx(classes.li, { [classes.hidden]: page - 1 === 0 })}>
					<Typography className={classes.text}>
						<Link to={prev_url} className={classes.link}>
							Prev
						</Link>
					</Typography>
				</li>
				<li className={classes.li}>
					<Typography className={classes.text}>
						<a href="#header" className={classes.link}>
							{page}
						</a>
					</Typography>
				</li>
				<li
					className={clsx(classes.li, {
						[classes.hidden]: page + 1 === total_pages,
					})}
				>
					<Typography className={classes.text}>
						<Link to={next_url} className={classes.link}>
							Next
						</Link>
					</Typography>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
