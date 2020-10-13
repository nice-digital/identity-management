import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { StatisticsType } from "../../models/types";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";

import { DashboardTable } from "../../components/DashboardTable/DashboardTable";

type DashboardProps = {
	basename: string;
};

type DashboardState = {
	isLoading: boolean;
	error?: Error;
	statistics: Array<StatisticsType>;
};

export class Dashboard extends Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			isLoading: true,
			statistics: [],
		};
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		let managementApiToken = await fetchData(Endpoints.managementApiToken);

		if (isDataError(managementApiToken)) {
			this.setState({ error: managementApiToken });
		}

		let statisticFetchOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${managementApiToken.token_type} ${managementApiToken.access_token}`,
			},
		};

		let statistics = await fetchData(
			Endpoints.statistics,
			statisticFetchOptions,
		);

		if (isDataError(statistics)) {
			this.setState({ error: statistics });
		}

		this.setState({ statistics, isLoading: false });
	}

	render() {
		const { isLoading, statistics } = this.state;

		// const statisticsToday = [statistics[statistics.length - 1]];

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb>Dashboard</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Dashboard" />

				<Grid>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							<GridItem cols={8}>
								<h2>Today</h2>
								<DashboardTable statistics={statistics} amount={1} />
							</GridItem>

							<GridItem cols={8}>
								<h2>Historical</h2>
								<DashboardTable
									statistics={statistics}
									amount={28}
									startAt={1}
									scroll={true}
								/>
								<Link to="/dashboard/historical">See more</Link>
							</GridItem>
						</>
					)}
				</Grid>
			</>
		);
	}
}
