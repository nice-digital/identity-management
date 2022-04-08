import React, { FC } from "react";
import { UserType } from "../../models/types";

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
	const index = Number(id.slice(id.length - 1));

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		onClick(item);
	};

	return (
		<a
			id={id}
			onClick={handleClick}
			onMouseOver={() => onMouseOver(index)}
			href="#add-org-user"
			tabIndex={-1}
		>
			{`${firstName} ${lastName}`}
			<br />
			<small>{emailAddress}</small>
		</a>
	);
};
