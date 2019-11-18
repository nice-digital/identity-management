import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { UserType } from "../../models/types";

type UserStatusProps = {
	user: UserType;
};

export const UserStatus = (props: UserStatusProps) => (
	<Tag data-qa-sel="user-status" live={!props.user.isLockedOut} alpha={props.user.isLockedOut}>
		{!props.user.isLockedOut ? "Active" : "Locked"}
	</Tag>
);
