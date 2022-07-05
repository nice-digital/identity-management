import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useListInfo } from "src/helpers/useListInfo";

export const ItemsPerPage = (): React.ReactElement => {
	const { itemsPerPage } = useListInfo();
	const history = useHistory();
	const { search: querystring } = useLocation();

	return (
		<div className="mr--e" data-qa-sel="number-of-results-on-page">
			<label htmlFor="itemsPerPage" className="bold mr--c">
				Items per page
			</label>
			<select
				id="itemsPerPage"
				name="itemsPerPage"
				onChange={(event) => {
					const querystringObject = new URLSearchParams(querystring);
					querystringObject.set("amount", event.target.value);
					history.push({
						search: `${querystringObject}`,
					});
				}}
				value={itemsPerPage}
				data-qa-sel="result-on-the-page-index"
			>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="all">All</option>
			</select>
		</div>
	);
};
