import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { removeQueryParameter } from "../../utils/querystring";

type ItemsPerPageProps = {
	amount: number | string;
};

export const ItemsPerPage = (props: ItemsPerPageProps): React.ReactElement => {
	const { amount } = props;
	const history = useHistory();
	const { search: querystring, pathname } = useLocation();

	return (
		<div className="mr--e" data-qa-sel="number-of-results-on-page">
			<label htmlFor="itemsPerPage" className="bold mr--c">
				Items per page
			</label>
			<select
				id="itemsPerPage"
				name="itemsPerPage"
				onChange={(event) => {
					const qs = new URLSearchParams(querystring);
					qs.set("amount", event.target.value);
					history.push({
						search: qs.toString(),
					});
				}}
				value={amount}
				data-qa-sel="result-on-the-page-index"
			>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="all">All</option>
			</select>
		</div>
	);
};
