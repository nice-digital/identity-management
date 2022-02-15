import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-forms";
import { useHistory, useLocation } from "react-router-dom";

type FilterSearchProps = {
	onInputChange?: (searchQuery: string) => void;
	label: string;
};

export const FilterSearch = (props: FilterSearchProps): React.ReactElement => {
	const history = useHistory();
	const { search: querystring } = useLocation();
	const querystringObject = new URLSearchParams(querystring);

	let typingTimer = 0;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.trim();

		clearTimeout(typingTimer);

		typingTimer = window.setTimeout(() => {
			if (props.onInputChange) {
				props.onInputChange(val);
			} else {
				querystringObject.set("q", val);
				querystringObject.set("page", "1");

				if (!val) {
					querystringObject.delete("q");
				}

				history.push({
					search: `${querystringObject}`,
				});
			}
		}, 1000);
	};

	return (
		<Panel>
			<Input
				type="search"
				label={props.label}
				unique="filterSearch"
				name="filter-search"
				onChange={handleInputChange}
				autoComplete="off"
				data-qa-sel="filter-search-input"
				defaultValue={querystringObject.get("q") || ""}
			/>
		</Panel>
	);
};
