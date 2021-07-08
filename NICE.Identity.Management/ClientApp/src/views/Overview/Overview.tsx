import React, { Component, useState } from "react";
//import { RouteComponentProps, Link, Redirect } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Button } from "@nice-digital/nds-button";
import { Hero } from "@nice-digital/nds-hero";

import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

//type TParams = { id: string };

//type OverviewProps = {} & RouteComponentProps<TParams>;

type OverviewProps = {};

export const Overview = (props: OverviewProps): React.ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	return (
		<>
			{/* <Breadcrumbs>
				<Breadcrumb>Home</Breadcrumb>
			</Breadcrumbs> */}

			<Hero
				title="App support administration"
				intro="Manage NICE digital services, users and organisations."
			/>

			{!error ? (
				<Grid>
					<GridItem cols={12} md={4}>
						<p>User admin</p>
					</GridItem>
				</Grid>
			) : (
				<p>Error</p>
			)}
		</>
	);
};
