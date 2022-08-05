import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { type UserType } from "src/models/types";
import styles from "./UserStatus.module.scss";

type UserStatusProps = {
	user: UserType;
};

export const UserStatus = (props: UserStatusProps): React.ReactElement => (
	<>
		{!props.user.isLockedOut && props.user.hasVerifiedEmailAddress && (
			<Tag data-qa-sel="user-status" className={`tag ${styles.activeTag}`}>
				Active
			</Tag>
		)}

		{!props.user.hasVerifiedEmailAddress && (
			<>
				<Tag data-qa-sel="user-pending" beta>
					Pending
				</Tag>
				&nbsp;
			</>
		)}

		{props.user.isLockedOut && <Tag data-qa-sel="user-status">Locked</Tag>}
	</>
);
