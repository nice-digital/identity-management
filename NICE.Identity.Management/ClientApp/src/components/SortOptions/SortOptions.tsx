import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	sortOptions,
	SortOptions as AllSortOptions,
} from "../../helpers/sortOptions";

export type SortOptionsProps = {
	defaultSortOrder?: AllSortOptions;
};

export const SortOptions: FC<SortOptionsProps> = ({
	defaultSortOrder = "alpha-asc",
}) => {
	const { search: querystring } = useLocation();
	const qs = new URLSearchParams(querystring);
	const currentSortOrder = qs.get("sort") || defaultSortOrder;

	return (
		<ul className="list list--piped">
			{Object.entries(sortOptions).map((option, index, sortOptions) => {
				const [key, value] = option;
				qs.set("sort", key);

				return (
					<li key={key}>
						{key === currentSortOrder ? (
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
							<Link to={`${qs}`} data-qa-sel={`sort-${key}`}>
								{value}
							</Link>
						)}
					</li>
				);
			})}
		</ul>
	);
};
