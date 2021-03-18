import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		padding: 0,
		margin: 0,
		[theme.breakpoints.up("sm")]: {
			width: "auto",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		flexGrow: 1,
		[theme.breakpoints.up("sm")]: {
			flexGrow: 0,
			minWidth: 120,
		},
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	order: {
		height: "2rem",
		width: "2rem",
	},
	hidden: {
		display: "none",
	},
}));

const SortMenu = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const { id } = useParams();
	const query = new URLSearchParams(location.search);

	if (id || query.has("query")) return null;

	const sort_by = query.has("sort_by")
		? query.get("sort_by")
		: "popularity.desc";

	let sort = sort_by.split(".")[0];
	let order = sort_by.split(".")[1];

	const handleSortChange = (event) => {
		query.set("sort_by", `${event.target.value}.${order}`);
		history.push(`${location.pathname}?${query.toString()}`);
	};

	const handleOrderChange = () => {
		if (order === "desc") {
			order = "asc";
		} else {
			order = "desc";
		}
		query.set("sort_by", `${sort}.${order}`);
		history.push(`${location.pathname}?${query.toString()}`);
	};

	return (
		<div className={classes.form}>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel htmlFor="sort-menu">Sort</InputLabel>
				<Select
					native
					value={sort}
					onChange={handleSortChange}
					label="Sort"
					inputProps={{
						name: "sort",
						id: "sort-menu",
					}}
				>
					<option value={"popularity"}>Popularity</option>
					<option value={"vote_average"}>Ratings</option>
					<option value={"original_title"}>Title</option>
					<option value={"release_date"}>Release Date</option>
				</Select>
			</FormControl>
			<IconButton
				className={classes.order}
				disableFocusRipple
				onClick={handleOrderChange}
				aria-label="order"
			>
				{order === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
			</IconButton>
		</div>
	);
};

export default SortMenu;
