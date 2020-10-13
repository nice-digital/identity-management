import React from "react";

import { StatisticsType } from "../../models/types";

import styles from "./DashboardTable.module.scss";

type DashboardTableProps = {
	statistics: Array<StatisticsType>;
	amount?: number;
	startAt?: number;
	scroll?: boolean;
};

export const DashboardTable = (props: DashboardTableProps) => {
	const amount = props.amount || props.statistics.length;
	const startAt = props.startAt || 0;
	const statistics = [...props.statistics].reverse();
	const scroll = props.scroll !== undefined ? props.scroll : true;

	return (
		<div className={scroll ? styles.responsiveTable : ""}>
			<table className={styles.fixedTable}>
				<thead>
					<tr>
						<th className={styles.tableCells}>Date</th>
						<th className={styles.tableCells}>Logins</th>
						<th className={styles.tableCells}>Registrations</th>
						<th className={styles.tableCells}>Errors</th>
					</tr>
				</thead>
				<tbody>
					{statistics.slice(startAt, amount).map((statistic, index) => {
						return (
							<tr key={index}>
								<td className={styles.tableCells}>
									{new Date(statistic.date).toLocaleDateString()}
								</td>
								<td className={styles.tableCells}>{statistic.logins}</td>
								<td className={styles.tableCells}>{statistic.signups}</td>
								<td className={styles.tableCells}>
									{statistic.leaked_passwords}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
