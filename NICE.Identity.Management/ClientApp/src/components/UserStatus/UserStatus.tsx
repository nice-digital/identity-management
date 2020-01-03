import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { UserType } from "../../models/types";

type UserStatusProps = {
	user: UserType;
};

export const UserStatus = (props: UserStatusProps) => (
	<>
		{!props.user.isLockedOut && props.user.hasVerifiedEmailAddress && (
			<Tag data-qa-sel="user-status" consultation>
				Active
			</Tag>
		)}

		{!props.user.hasVerifiedEmailAddress && (
			<>
				<Tag data-qa-sel="user-status" beta>
					Pending
				</Tag>
				&nbsp;
			</>
		)}

		{props.user.isLockedOut && <Tag data-qa-sel="user-status">Locked</Tag>}
	</>
);
