import React, { FC } from "react";
import { useListInfo } from "src/helpers/useListInfo";

type PaginationTextProps = {
	dataLength: number;
	labelSingular: string;
	labelPlural: string;
};

export const PaginationText: FC<PaginationTextProps> = ({
	dataLength,
	labelSingular,
	labelPlural,
}) => {
	const { paginationStart, paginationFinish, itemsPerPage } =
		useListInfo(dataLength);

	return (
		<h2
			className="results-heading"
			data-qa-sel={`${labelPlural}-returned`}
		>
			{`Showing ${
				dataLength > itemsPerPage
					? `${paginationStart} to ${paginationFinish} of `
					: ""
			}${dataLength} ${
				dataLength === 1 ? `${labelSingular}` : `${labelPlural}`
			}`}
		</h2>
	);
};
