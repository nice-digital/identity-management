import React from "react";

import styles from "./DashboardFilter.module.scss";

type DashboardFilterProps = {
	onCheckboxChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const DashboardFilter = (props: DashboardFilterProps) => {
	return (
		<select defaultValue="0" onChange={props.onCheckboxChange}>
			<option value="0">All</option>
			<option value="7">One week</option>
			<option value="14">Two weeks</option>
			<option value="30">One month</option>
		</select>
	);
};
