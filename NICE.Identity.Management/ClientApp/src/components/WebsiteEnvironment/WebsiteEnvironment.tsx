import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { WebsiteType } from "../../models/types";

type WebsiteEnvironmentProps = {
	website: WebsiteType;
};

export const WebsiteEnvironment = (props: WebsiteEnvironmentProps): React.ReactElement => (
	<>
		{props.website.environment.name == "live" && (
			<Tag data-qa-sel="environment-live" live>
				Live
			</Tag>
		)}

		{props.website.environment.name == "beta" && (
			<Tag data-qa-sel="environment-beta" beta>
				Beta
			</Tag>
		)}

		{props.website.environment.name == "alpha" && (
			<Tag data-qa-sel="environment-alpha" alpha>
				Alpha
			</Tag>
		)}

		{props.website.environment.name == "test" && (
			<Tag data-qa-sel="environment-test" isNew>
				Test
			</Tag>
		)}

		{props.website.environment.name == "dev" && (
			<Tag data-qa-sel="environment-dev" updated>
				Dev
			</Tag>
		)}

		{props.website.environment.name == "local" && (
			<Tag data-qa-sel="environment-local" consultation>
				Local
			</Tag>
		)}

	</>
);