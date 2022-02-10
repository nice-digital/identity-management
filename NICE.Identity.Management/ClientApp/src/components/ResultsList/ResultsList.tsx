import React, { ElementType } from "react";
import { useListInfo } from "../../helpers/useListInfo";

type ResultsListProps<T> = {
	data: T[];
	elementType: ElementType<{ item: T }>;
	qaSelExtract: string;
};

export const ResultsList = <T extends unknown>({
	data,
	elementType: ElementType,
	qaSelExtract,
}: ResultsListProps<T>): React.ReactElement => {
	const { paginationStart, paginationFinish } = useListInfo(data.length);

	const dataPaginated = data.length
		? data.slice(paginationStart - 1, paginationFinish)
		: data;

	return (
		<ul className="list--unstyled" data-qa-sel={`list-of-${qaSelExtract}`}>
			{dataPaginated.map((item, index) => (
				<li key={index}>
					<ElementType item={item} />
				</li>
			))}
		</ul>
	);
};
