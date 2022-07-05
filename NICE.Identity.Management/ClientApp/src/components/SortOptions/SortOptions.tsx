import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	sortOptions,
	SortOptions as AllSortOptions,
} from "src/helpers/sortOptions";
import { useListInfo } from "src/helpers/useListInfo";

export type SortOptionsProps = {
	defaultSortOrder?: AllSortOptions;
};

export const SortOptions: FC<SortOptionsProps> = ({
	defaultSortOrder = "alpha-asc",
}) => {
	const { currentSortOrder } = useListInfo();
	const { search: querystring, pathname } = useLocation();
	const querystringObject = new URLSearchParams(querystring);
	const currentSortOrderOrDefault = currentSortOrder || defaultSortOrder;

	return (
		<ul className="list list--piped">
			{Object.entries(sortOptions).map((option, index, sortOptions) => {
				const [key, value] = option;
				querystringObject.set("sort", key);

				return (
					<li key={key}>
						{key === currentSortOrderOrDefault ? (
							<span
								className={`pv--c ${
									index === 0
										? "pr--c"
										: index == sortOptions.length - 1
										? "pl--c"
										: "ph--c"
								}`}
							>
								{value}
							</span>
						) : (
							<Link
								to={`${pathname}?${querystringObject}`}
								data-qa-sel={`sort-${key}`}
							>
								{value}
							</Link>
						)}
					</li>
				);
			})}
		</ul>
	);
};
