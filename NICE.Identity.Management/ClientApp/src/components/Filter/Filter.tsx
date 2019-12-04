import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-forms";

type FilterProps = {
	onInputChange: (searchQuery: string) => void;
};

export const Filter = (props: FilterProps) => {
	let typingTimer: number = 0;

	const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = e.target.value.trim();

		clearTimeout(typingTimer);

		typingTimer = window.setTimeout(() => {
			props.onInputChange(val);
		}, 1000);
	};

	return (
		<Panel>
			<p>Filter options</p>
			<Input
				type="search"
				label="Search"
				unique="userSearch"
				name="user-search"
				onChange={handleInputChange}
				autoComplete="off"
			/>
		</Panel>
	);
};
