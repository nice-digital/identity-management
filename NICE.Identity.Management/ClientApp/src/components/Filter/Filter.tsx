import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Radio, Input } from "@nice-digital/nds-forms";

export const Filter = () => (
	<Panel>
		<p>Filter options</p>
		<Input type="text" label="Search" unique="userSearch" name="user-search" />
		<Radio label="Label here" />
	</Panel>
);
