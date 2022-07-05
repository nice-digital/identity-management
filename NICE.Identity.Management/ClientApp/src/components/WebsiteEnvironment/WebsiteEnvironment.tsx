import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { WebsiteType } from "src/models/types";

type WebsiteEnvironmentProps = {
	website: WebsiteType;
};

export const WebsiteEnvironment = (props: WebsiteEnvironmentProps): React.ReactElement => (
	<>
		{props.website.environment.name == "Live" && (
			<Tag data-qa-sel="environment-live" live>
				Live
			</Tag>
		)}

		{props.website.environment.name == "Beta" && (
			<Tag data-qa-sel="environment-beta" beta>
				Beta
			</Tag>
		)}

		{props.website.environment.name == "Alpha" && (
			<Tag data-qa-sel="environment-alpha" alpha>
				Alpha
			</Tag>
		)}

		{props.website.environment.name == "Test" && (
			<Tag data-qa-sel="environment-test" isNew>
				Test
			</Tag>
		)}

		{props.website.environment.name == "Dev" && (
			<Tag data-qa-sel="environment-dev" updated>
				Dev
			</Tag>
		)}

		{props.website.environment.name == "Local" && (
			<Tag data-qa-sel="environment-local" consultation>
				Local
			</Tag>
		)}

	</>
);