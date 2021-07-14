import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { ServiceType } from "../../models/types";

type ServiceEnvironmentProps = {
	service: ServiceType;
};

export const ServiceEnvironment = (props: ServiceEnvironmentProps): React.ReactElement => (
	<>
		{/* {!props.service.isLockedOut && props.service.hasVerifiedEmailAddress && (
			<Tag data-qa-sel="user-status" consultation>
				Active
			</Tag>
		)}

		{!props.service.hasVerifiedEmailAddress && (
			<>
				<Tag data-qa-sel="user-pending" beta>
					Pending
				</Tag>
				&nbsp;
			</>
		)}

		{props.service.isLockedOut && <Tag data-qa-sel="user-status">Locked</Tag>} */}
	</>
);
