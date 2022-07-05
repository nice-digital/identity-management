import React, { FC } from "react";
import { UserType } from "src/models/types";

type SuggestionUserProps = {
	item: UserType;
	id: string;
	onClick: (item: UserType) => void;
	onMouseOver: (index: number) => void;
};

export const SuggestionUser: FC<SuggestionUserProps> = ({
	item,
	id,
	onClick,
	onMouseOver,
}) => {
	const { firstName, lastName, emailAddress } = item;
	const idNumberArray = id.match(/\d+$/);
	const activeSuggestionIndex = idNumberArray ? Number(idNumberArray[0]) : 0;

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		onClick(item);
	};

	return (
		<a
			id={id}
			onClick={handleClick}
			onMouseOver={() => onMouseOver(activeSuggestionIndex)}
			href="#add-org-user"
			tabIndex={-1}
		>
			{`${firstName} ${lastName}`}
			<br />
			<small>{emailAddress}</small>
		</a>
	);
};
