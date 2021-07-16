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
import { FilterStatus } from "../../components/FilterStatus/FilterStatus";
import { WebsiteEnvironment } from "../../components/WebsiteEnvironment/WebsiteEnvironment";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./ServicesList.module.scss";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type environmentFilterOptions = {
	[key: string]: (website: WebsiteType) => boolean;
};

type ServicesListProps = {
	basename: string;
	location: {
		pathname: string;
		search: string;
	};
	history: HistoryType;
};

type ServicesListState = {
	path: string;
	originalWebsites: Array<WebsiteType>;
	websites: Array<WebsiteType>;
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
	environmentFilter?: string;
	pageNumber: number;
	itemsPerPage: number | string;
};

export class ServicesList extends Component<ServicesListProps, ServicesListState> {
	constructor(props: ServicesListProps) {
		super(props);

		const querystring = this.props.location.search;

		const querystringObject = queryStringToObject(querystring);

		const pageNumber = Number(
			querystringObject.page
				? Array.isArray(querystringObject.page)
					? querystringObject.page[0]
					: querystringObject.page
				: 1,
		);

		let itemsPerPage = querystringObject.amount
			? Array.isArray(querystringObject.amount)
				? querystringObject.amount[0]
				: querystringObject.amount
			: 25;

		itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

		this.state = {
			path: "",
			originalWebsites: [],
			websites: [],
			isLoading: true,
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
		};

		document.title = "NICE Accounts - Services list";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const websites = await fetchData(Endpoints.websitesList);

		if (isDataError(websites)) {
			this.setState({ error: websites });
		}

		this.setState({ originalWebsites: websites, websites: websites, isLoading: false });
	}

	pastPageRange = (
		itemsPerPage: string | number,
		pageNumber: number,
		dataCount: number,
	): number => {
		let pastPageRange = false;

		if (Number(itemsPerPage)) {
			itemsPerPage = Number(itemsPerPage);
			pastPageRange = pageNumber * itemsPerPage >= dataCount;
		}

		if (pastPageRange || itemsPerPage === "all") {
			pageNumber = 1;
		}

		return pageNumber;
	};

	filterWebsitesByEnvironment = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ isLoading: true });

		const environmentFilter = e.target.value;

		let websites = this.state.originalWebsites,
			pageNumber = this.state.pageNumber;

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		if (environmentFilter) {
			websites = this.websitesByEnvironment(environmentFilter, websites);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.websites.length,
		);

		this.setState({ websites: websites, environmentFilter: environmentFilter, pageNumber, isLoading: false });
	};

	filterWebsitesBySearch = async (searchQuery: string): Promise<void> => {
		this.setState({ isLoading: true });

		const originalWebsites = await fetchData(
			`${Endpoints.websitesList}?q=${searchQuery}`,
		);

		let websites = originalWebsites,
		pageNumber = this.state.pageNumber;

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		if (isDataError(originalWebsites)) {
			this.setState({ error: originalWebsites });
		}

		if (this.state.environmentFilter) {
			websites = this.websitesByEnvironment(this.state.environmentFilter, websites);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.websites.length,
		);

		this.setState({
			originalWebsites: originalWebsites,
			websites: websites,
			searchQuery,
			pageNumber,
			isLoading: false,
		});
	};

	websitesByEnvironment = (
		environmentFilter: string,
		websites: Array<WebsiteType>,
	): Array<WebsiteType> => {
		const environmentFilterOptions: environmentFilterOptions = {
			live: (website) => website.environment.name == "live",
			beta: (website) => website.environment.name == "beta",
			alpha: (website) => website.environment.name == "alpha",
			test: (website) => website.environment.name == "test",
			dev: (website) => website.environment.name == "dev",
			local: (website) => website.environment.name == "local",
		};

		const filteredWebsites = websites.filter(environmentFilterOptions[environmentFilter]);

		return filteredWebsites;
	};

	getPaginateStartAndFinishPosition = (
		servicesCount: number,
		pageNumber: number,
		itemsPerPage: number | string,
	): { start: number; finish: number } => {
		const paginationPositions = {
			start: 0,
			finish: servicesCount,
		};

		const itemAmountIsNumber = Number(itemsPerPage);

		if (itemAmountIsNumber) {
			paginationPositions.start = (pageNumber - 1) * itemAmountIsNumber;
			paginationPositions.finish =
				paginationPositions.start + itemAmountIsNumber <= servicesCount
					? paginationPositions.start + itemAmountIsNumber
					: servicesCount;
		}

		return paginationPositions;
	};

	getPaginationText = (
		servicesCount: number,
		start: number,
		finish: number,
	): string => {
		const amountPerPage = finish - start;
		const paginationExtract =
			servicesCount > amountPerPage ? `${start + 1} to ${finish} of ` : "";

		return `Showing ${paginationExtract}${servicesCount} service${
			servicesCount === 1 ? "" : "s"
		}`;
	};

	changeAmount = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		let itemsPerPage = (e.target as HTMLSelectElement).value || 25,
			pageNumber = this.state.pageNumber,
			path = stripMultipleQueries(this.state.path, ["amount", "page"]);

		itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.websites.length,
		);

		path = appendQueryParameter(path, "amount", itemsPerPage.toString());
		path = appendQueryParameter(path, "page", pageNumber);

		this.setState({ itemsPerPage, path, pageNumber }, () => {
			this.props.history.push(path);
		});
	};

	changePage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();

		let pageNumber =
				(e.target as HTMLAnchorElement).getAttribute("data-pager") || 1,
			path = removeQueryParameter(this.state.path, "page");

		if (pageNumber === "previous") {
			pageNumber = this.state.pageNumber - 1;
		}
		if (pageNumber === "next") {
			pageNumber = this.state.pageNumber + 1;
		}

		pageNumber = Number(pageNumber);
		path = appendQueryParameter(path, "page", pageNumber);

		this.setState({ pageNumber, path }, () => {
			this.props.history.push(path);
		});
	};

	render(): JSX.Element {
		const { websites: services, searchQuery, error, isLoading, pageNumber, itemsPerPage } =
			this.state;

		const paginationPositions = this.getPaginateStartAndFinishPosition(
			services.length,
			pageNumber,
			itemsPerPage,
		);

		const paginationText = this.getPaginationText(
			services.length,
			paginationPositions.start,
			paginationPositions.finish,
		);

		const servicesPaginated = services.length
			? services.slice(paginationPositions.start, paginationPositions.finish)
			: services;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb>Services</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Services" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterSearch onInputChange={this.filterWebsitesBySearch} label={"Filter by service name or URL"}/>
							<FilterStatus onCheckboxChange={this.filterWebsitesByEnvironment} />
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={!services.length}>
							{isLoading ? (
								<p>Loading...</p>
							) : services.length ? (
								<>
									<h2 className={styles.servicesListSummary}>{paginationText}</h2>
									<ul className="list--unstyled" data-qa-sel="list-of-websites">
										{servicesPaginated.map((website) => {
											const {
												id,
												serviceId,
												host,
												environment,
												service
											} = website;
											const servicesListHeading = {
												headingText: `${service.name}`,
												link: {
													elementType: Link,
													destination: `/websites/${id}`,
												},
											};

											const servicesListMetadata: Array<CardMetaData> = [
												{
													value: <WebsiteEnvironment website={website} />,
												},
												{
													label: "Website",
													value: host,
												},
											];

											return (
												<li key={id}>
													<Card
														{...servicesListHeading}
														metadata={servicesListMetadata}
														key={id}
													/>
												</li>
											);
										})}
									</ul>
									<Pagination
										onChangePage={this.changePage}
										onChangeAmount={this.changeAmount}
										itemsPerPage={itemsPerPage}
										consultationCount={services.length}
										currentPage={pageNumber}
									/>
								</>
							) : searchQuery ? (
								<p>No results found for {searchQuery}</p>
							) : (
								<p>No results found</p>
							)}
						</GridItem>
					</Grid>
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}
