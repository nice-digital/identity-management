import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import {
	queryStringToObject,
	appendQueryParameter,
	removeQueryParameter,
	stripMultipleQueries,
} from "../../utils/querystring";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";
import { HistoryType, WebsiteType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { FilterBox } from "../../components/FilterBox/FilterBox";
import { WebsiteEnvironment } from "../../components/WebsiteEnvironment/WebsiteEnvironment";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

// import styles from "./OrganisationsList.module.scss";

type OrganisationsListProps = {
	basename: string;
	location: {
		pathname: string;
		search: string;
	};
	history: HistoryType;
};

type OrganisationsListState = {
	path: string;
	originalWebsites: Array<WebsiteType>;
	websites: Array<WebsiteType>;
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
	environmentFiltersChecked: Array<string>;
	// pageNumber: number;
	// itemsPerPage: number | string;
	environmentsForFilter: Array<string>;
};

export class OrganisationsList extends Component<
	OrganisationsListProps,
	OrganisationsListState
> {
	constructor(props: OrganisationsListProps) {
		super(props);

		// const querystring = this.props.location.search;

		// const querystringObject = queryStringToObject(querystring);

		// const pageNumber = Number(
		// 	querystringObject.page
		// 		? Array.isArray(querystringObject.page)
		// 			? querystringObject.page[0]
		// 			: querystringObject.page
		// 		: 1,
		// );

		// let itemsPerPage = querystringObject.amount
		// 	? Array.isArray(querystringObject.amount)
		// 		? querystringObject.amount[0]
		// 		: querystringObject.amount
		// 	: 25;

		// itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

		this.state = {
			path: "",
			originalWebsites: [],
			websites: [],
			isLoading: true,
			// pageNumber: pageNumber,
			// itemsPerPage: itemsPerPage,
			environmentFiltersChecked: [],
			environmentsForFilter: [],
		};

		document.title = "NICE Accounts - Organisations list";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const organisations = await fetchData(Endpoints.organisationsList);

		if (isDataError(websites)) {
			this.setState({ error: websites });
		} else {
			const allEnvironments = websites.map(
				(website: { environment: { name: string } }) =>
					website.environment.name,
			);

			const environmentsForFilter = allEnvironments.reduce(function (
				accumulatedEnvironments: string[],
				currentEnvironment: string,
			) {
				if (accumulatedEnvironments.indexOf(currentEnvironment) === -1) {
					accumulatedEnvironments.push(currentEnvironment);
				}
				return accumulatedEnvironments;
			},
			[]);

			this.setState({ environmentsForFilter });
		}

		this.setState({ originalWebsites: websites, websites, isLoading: false });
	}

	// pastPageRange = (
	// 	itemsPerPage: string | number,
	// 	pageNumber: number,
	// 	dataCount: number,
	// ): number => {
	// 	let pastPageRange = false;

	// 	if (Number(itemsPerPage)) {
	// 		itemsPerPage = Number(itemsPerPage);
	// 		pastPageRange = pageNumber * itemsPerPage >= dataCount;
	// 	}

	// 	if (pastPageRange || itemsPerPage === "all") {
	// 		pageNumber = 1;
	// 	}

	// 	return pageNumber;
	// };

	// filterWebsitesByEnvironment = (environment: string): void => {
	// 	this.setState({ isLoading: true });

	// 	let environmentFiltersChecked = this.state.environmentFiltersChecked;

	// 	environmentFiltersChecked = environmentFiltersChecked.includes(environment)
	// 		? environmentFiltersChecked.filter(
	// 				(environmentFilter) => environmentFilter !== environment,
	// 		  )
	// 		: environmentFiltersChecked.concat(environment);

	// 	const itemsPerPage = Number(this.state.itemsPerPage)
	// 		? Number(this.state.itemsPerPage)
	// 		: this.state.itemsPerPage;

	// 	let websites = this.state.originalWebsites,
	// 		pageNumber = this.state.pageNumber;

	// 	if (environmentFiltersChecked.length)
	// 		websites = this.websitesByEnvironment(
	// 			environmentFiltersChecked,
	// 			websites,
	// 		);

	// 	pageNumber = this.pastPageRange(
	// 		itemsPerPage,
	// 		pageNumber,
	// 		this.state.websites.length,
	// 	);

	// 	this.setState({
	// 		websites,
	// 		environmentFiltersChecked,
	// 		pageNumber,
	// 		isLoading: false,
	// 	});
	// };

	// filterWebsitesBySearch = async (searchQuery: string): Promise<void> => {
	// 	this.setState({ isLoading: true });

	// 	const originalWebsites = await fetchData(
	// 		`${Endpoints.websitesList}?q=${searchQuery}`,
	// 	);

	// 	let websites = originalWebsites,
	// 		pageNumber = this.state.pageNumber;

	// 	const itemsPerPage = Number(this.state.itemsPerPage)
	// 		? Number(this.state.itemsPerPage)
	// 		: this.state.itemsPerPage;

	// 	if (isDataError(originalWebsites)) {
	// 		this.setState({ error: originalWebsites });
	// 	}

	// 	if (this.state.environmentFiltersChecked.length) {
	// 		websites = this.websitesByEnvironment(
	// 			this.state.environmentFiltersChecked,
	// 			websites,
	// 		);
	// 	}

	// 	pageNumber = this.pastPageRange(
	// 		itemsPerPage,
	// 		pageNumber,
	// 		this.state.websites.length,
	// 	);

	// 	this.setState({
	// 		originalWebsites,
	// 		websites,
	// 		searchQuery,
	// 		pageNumber,
	// 		isLoading: false,
	// 	});
	// };

	// websitesByEnvironment = (
	// 	environmentFiltersChecked: Array<string>,
	// 	websites: Array<WebsiteType>,
	// ): Array<WebsiteType> => {
	// 	return (websites = websites.filter((website) => {
	// 		const websiteEnvironment = website.environment.name;

	// 		if (environmentFiltersChecked.includes(websiteEnvironment)) {
	// 			return website;
	// 		}
	// 	}));
	// };

	// getPaginateStartAndFinishPosition = (
	// 	websitesCount: number,
	// 	pageNumber: number,
	// 	itemsPerPage: number | string,
	// ): { start: number; finish: number } => {
	// 	const paginationPositions = {
	// 		start: 0,
	// 		finish: websitesCount,
	// 	};

	// 	const itemAmountIsNumber = Number(itemsPerPage);

	// 	if (itemAmountIsNumber) {
	// 		paginationPositions.start = (pageNumber - 1) * itemAmountIsNumber;
	// 		paginationPositions.finish =
	// 			paginationPositions.start + itemAmountIsNumber <= websitesCount
	// 				? paginationPositions.start + itemAmountIsNumber
	// 				: websitesCount;
	// 	}

	// 	return paginationPositions;
	// };

	// getPaginationText = (
	// 	websitesCount: number,
	// 	start: number,
	// 	finish: number,
	// ): string => {
	// 	const amountPerPage = finish - start;
	// 	const paginationExtract =
	// 		websitesCount > amountPerPage ? `${start + 1} to ${finish} of ` : "";

	// 	return `Showing ${paginationExtract}${websitesCount} service${
	// 		websitesCount === 1 ? "" : "s"
	// 	}`;
	// };

	// changeAmount = (e: React.ChangeEvent<HTMLSelectElement>): void => {
	// 	let itemsPerPage = (e.target as HTMLSelectElement).value || 25,
	// 		pageNumber = this.state.pageNumber,
	// 		path = stripMultipleQueries(this.state.path, ["amount", "page"]);

	// 	itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

	// 	pageNumber = this.pastPageRange(
	// 		itemsPerPage,
	// 		pageNumber,
	// 		this.state.websites.length,
	// 	);

	// 	path = appendQueryParameter(path, "amount", itemsPerPage.toString());
	// 	path = appendQueryParameter(path, "page", pageNumber);

	// 	this.setState({ itemsPerPage, path, pageNumber }, () => {
	// 		this.props.history.push(path);
	// 	});
	// };

	// changePage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
	// 	e.preventDefault();

	// 	let pageNumber =
	// 			(e.target as HTMLAnchorElement).getAttribute("data-pager") || 1,
	// 		path = removeQueryParameter(this.state.path, "page");

	// 	if (pageNumber === "previous") {
	// 		pageNumber = this.state.pageNumber - 1;
	// 	}
	// 	if (pageNumber === "next") {
	// 		pageNumber = this.state.pageNumber + 1;
	// 	}

	// 	pageNumber = Number(pageNumber);
	// 	path = appendQueryParameter(path, "page", pageNumber);

	// 	this.setState({ pageNumber, path }, () => {
	// 		this.props.history.push(path);
	// 	});
	// };

	render(): JSX.Element {
		const { error } = this.state;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb>Organisations</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Organisations" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							{/* <FilterSearch
								onInputChange={this.filterWebsitesBySearch}
								label={"Filter by service name or URL"}
							/> */}

							{/* <FilterBox
								name="Environments"
								filters={this.state.environmentsForFilter}
								selected={environmentFiltersChecked}
								onCheckboxChange={this.filterWebsitesByEnvironment}
								hideFilterPanelHeading={true}
							/> */}
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={true}>
							<p>Something</p>
						</GridItem>
					</Grid>
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}