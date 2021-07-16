import React from "react";

import {
	FilterPanel,
	FilterGroup,
	FilterOption,
} from "@nice-digital/nds-filters";

import "@nice-digital/nds-filters/scss/filters.scss";

type FiltersType = {
	name: string;
	id?: number;
	value?: string;
};

type FilterBoxProps = {
	onCheckboxChange: (e: string) => void;
	filters: Array<FiltersType> | Array<string>;
	name: string;
};

export const FilterBox = (props: FilterBoxProps): React.ReactElement => {
	let filters: any = [];

	if (typeof props.filters[0] === "string") {
		props.filters.map((filter) => {
			filters.push({ value: filter, name: filter });
		});
	} else {
		filters = [...props.filters];
	}

	const someFunction = () => {
		console.log("fired");
		//props.onCheckboxChange(this.value);
	};

	return (
		<>
			{/* <div className="filter-panel">
				<div className="filter-panel__body">
					<div className="filter-group">
						<button type="button" className="filter-group__heading">
							<div>
								<span className="visually-hidden">Filter by </span>
								{props.name}
							</div>
						</button>
						<div className="filter-group__options" role="group">
							{filters.map((filter: FiltersType, index: number) => {
								return (
									<label
										className="filter-group__option break-word"
										key={index}
									>
										<input
											type="checkbox"
											value={`${filter.id || filter.value}`}
											name={`filter-${props.name}`}
											title="Something"
											onChange={props.onCheckboxChange}
										/>
										{filter.name}
									</label>
								);
							})}
						</div>
					</div>
				</div>
			</div> */}
			<FilterPanel heading="">
				<FilterGroup heading={props.name} selectedCount={2}>
					{filters.map((filter: FiltersType, index: number) => {
						const value = `${filters.id | filters.value}`;

						return (
							<FilterOption
								isSelected={false}
								onChanged={someFunction}
								value={value}
								key={index}
							>
								{filter.name}
							</FilterOption>
						);
					})}
				</FilterGroup>
			</FilterPanel>
		</>
	);
};
