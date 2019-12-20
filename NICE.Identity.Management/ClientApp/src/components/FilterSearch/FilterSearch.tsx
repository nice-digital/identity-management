import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-forms";

type FilterSearchProps = {
	onInputChange: (searchQuery: string) => void;
};

export const FilterSearch = (props: FilterSearchProps) => {
	let typingTimer: number = 0;

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
				label="Filter by name or email address"
				unique="userSearch"
				name="user-search"
				onChange={handleInputChange}
				autoComplete="off"
			/>
		</Panel>
	);
};
