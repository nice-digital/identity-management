import React from "react";

import {
	FilterPanel,
	FilterGroup,
	FilterOption,
} from "@nice-digital/nds-filters";

import "@nice-digital/nds-filters/scss/filters.scss";
import { capitaliseWord } from "../../helpers/capitaliseWord";

type FiltersType = {
	name: string;
	value: string;
};

type FilterBoxProps = {
	name: string;
	filters: Array<FiltersType> | Array<string>;
	selected: Array<string>;
	onCheckboxChange: (e: string) => void;
};

export const FilterBox = (props: FilterBoxProps): React.ReactElement => {
	let filters: any = [];
	let selectedCount = 0;

	if (typeof props.filters[0] === "string") {
		props.filters.map((filter) => {
			filters.push({
				value: filter,
				name: capitaliseWord(filter as string),
			});
		});
	} else {
		filters = [...props.filters];
	}

	const FilterOptions = filters.map((filter: FiltersType, index: number) => {
		const checkboxValue = `${filter.value}`;
		const checkboxName = filter.name;
		const isSelected = props.selected.includes(checkboxValue) ? true : false;

		if (isSelected) selectedCount += 1;

		return (
			<FilterOption
				isSelected={isSelected}
				onChanged={() => {
					props.onCheckboxChange(checkboxValue);
				}}
				value={checkboxValue}
				key={index}
			>
				{checkboxName}
			</FilterOption>
		);
	});

	return (
		<FilterPanel heading="">
			<FilterGroup heading={props.name} selectedCount={selectedCount}>
				{FilterOptions}
			</FilterGroup>
		</FilterPanel>
	);
};
