import React, { ElementType } from "react";

type ResultsListProps<T> = {
	data: T[];
	elementType: ElementType<{ item: T }>;
	qaSelExtract: string;
};

export const ResultsList = <T,>({
	data,
	elementType: ElementType,
	qaSelExtract,
}: ResultsListProps<T>): React.ReactElement => (
	<ul className="list--unstyled mt--d" aria-label={qaSelExtract} data-qa-sel={`list-of-${qaSelExtract}`}>
		{data.map((item, index) => (
			<li key={index}>
				<ElementType item={item} />
			</li>
		))}
	</ul>
);
