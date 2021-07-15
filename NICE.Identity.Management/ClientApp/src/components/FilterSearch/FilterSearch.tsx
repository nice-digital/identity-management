import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-forms";

type FilterSearchProps = {
	onInputChange: (searchQuery: string) => void;
	label: string;
};

export const FilterSearch = (props: FilterSearchProps): React.ReactElement => {
	let typingTimer = 0;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.trim();

		clearTimeout(typingTimer);

		typingTimer = window.setTimeout(() => {
			props.onInputChange(val);
		}, 1000);
	};

	return (
		<Panel>
			<Input
				type="search"
				label={props.label}
				unique="userSearch"
				name="user-search"
				onChange={handleInputChange}
				autoComplete="off"
			/>
		</Panel>
	);
};
