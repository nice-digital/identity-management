import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { UserType } from "../../models/types";

type UserStatusProps = {
	user: UserType;
};

export const UserStatus = (props: UserStatusProps) => (
	<Tag live={!props.user.blocked} alpha={props.user.blocked}>
		{!props.user.blocked ? "Active" : "Locked"}
	</Tag>
);
