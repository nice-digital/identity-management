import React from "react";

import {
	FilterPanel,
	FilterGroup,
	FilterOption,
} from "@nice-digital/nds-filters";

import "@nice-digital/nds-filters/scss/filters.scss";

import "./FilterBox.scss";

type FiltersType = {
	name: string;
	value: string;
};

type FilterBoxProps = {
	name: string;
	filters: (FiltersType | string)[];
	selected: Array<string>;
	onCheckboxChange: (e: string) => void;
	hideFilterPanelHeading?: boolean;
};

export const FilterBox = (props: FilterBoxProps): React.ReactElement => {
	let filters = [] as Array<FiltersType>;
	let selectedCount = 0;

	if (typeof props.filters[0] === "string") {
		props.filters.map((filter) => {
			filters.push({
				value: filter as string,
				name: filter as string,
			});
		});
	} else {
		filters = [...props.filters] as Array<FiltersType>;
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
		<div
			className={
				props.hideFilterPanelHeading ? "filter-panel-hide-heading" : undefined
			}
		>
			<FilterPanel heading="">
				<FilterGroup heading={props.name} selectedCount={selectedCount}>
					{FilterOptions}
				</FilterGroup>
			</FilterPanel>
		</div>
	);
};