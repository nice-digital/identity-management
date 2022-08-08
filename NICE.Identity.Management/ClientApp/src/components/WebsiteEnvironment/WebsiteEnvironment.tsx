import React from "react";
import { Tag } from "@nice-digital/nds-tag";
import { type WebsiteType } from "src/models/types";
import styles from "./WebsiteEnvironment.module.scss";

type WebsiteEnvironmentProps = {
	website: WebsiteType;
};

export const WebsiteEnvironment = (props: WebsiteEnvironmentProps): React.ReactElement => (
	<>
		{props.website.environment.name == "Live" && (
			<Tag data-qa-sel="environment-live" className={`tag ${styles.liveTag}`}>
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
			<Tag data-qa-sel="environment-test" className={`tag ${styles.testTag}`}>
				Test
			</Tag>
		)}

		{props.website.environment.name == "Dev" && (
			<Tag data-qa-sel="environment-dev" className={`tag ${styles.devTag}`}>
				Dev
			</Tag>
		)}

		{props.website.environment.name == "Local" && (
			<Tag data-qa-sel="environment-local" className={`tag ${styles.localTag}`}>
				Local
			</Tag>
		)}

	</>
);