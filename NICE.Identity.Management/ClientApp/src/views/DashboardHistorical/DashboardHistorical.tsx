import React, { Component } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Button } from "@nice-digital/nds-button";

import { StatisticsType } from "../../models/types";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";

import { DashboardTable } from "../../components/DashboardTable/DashboardTable";
import { DashboardFilter } from "../../components/DashboardFilter/DashboardFilter";

type DashboardHistoricalProps = {
	basename: string;
};

type DashboardHistoricalState = {
	isLoading: boolean;
	error?: Error;
	statistics: Array<StatisticsType>;
	originalStatistics: Array<StatisticsType>;
	showGraph: boolean;
};

export class DashboardHistorical extends Component<
	DashboardHistoricalProps,
	DashboardHistoricalState
> {
	constructor(props: DashboardHistoricalProps) {
		super(props);

		this.state = {
			isLoading: true,
			statistics: [],
			originalStatistics: [],
			showGraph: false,
		};
	}

	filterStatsByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({ isLoading: true });

		// amount of days to go back
		let dateRange = +e.target.value;

		// date range start
		let dateStart = new Date(
			new Date().setDate(new Date().getDate() - dateRange),
		);

		let statisticsByDate = this.state.originalStatistics.filter((statistic) => {
			let statisticDate = new Date(statistic.date);

			return statisticDate > dateStart;
		});

		// if 0 days from option value then show all
		if (dateRange === 0) {
			statisticsByDate = this.state.originalStatistics;
		}

		this.setState({ statistics: statisticsByDate, isLoading: false });
	};

	handleGraphClick = () => {
		this.setState({ showGraph: !this.state.showGraph });
	};

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

		this.setState({
			originalStatistics: statistics,
			statistics,
			isLoading: false,
		});
	}

	render() {
		const { isLoading, statistics, showGraph } = this.state;

		return (
			<>
				<Breadcrumb to="/dashboard" elementType={Link}>
					Dashboard
				</Breadcrumb>
				<Breadcrumb>Historical</Breadcrumb>

				<PageHeader heading="Historical" />

				<Grid>
					{isLoading ? (
						<GridItem cols={8}>
							<p>Loading...</p>
						</GridItem>
					) : (
						<GridItem cols={8}>
							<Button variant="cta" onClick={this.handleGraphClick}>
								{showGraph ? "Show data" : "Show graph"}
							</Button>

							{showGraph ? (
								<div>
									<p>Graph here</p>
								</div>
							) : (
								<>
									<div className="text-right">
										<DashboardFilter
											onCheckboxChange={this.filterStatsByDate}
										/>
									</div>
									<DashboardTable statistics={statistics} scroll={false} />
								</>
							)}
						</GridItem>
					)}
				</Grid>
			</>
		);
	}
}
