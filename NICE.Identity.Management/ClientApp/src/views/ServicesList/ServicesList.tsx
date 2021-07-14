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
import { ServiceType, HistoryType, ServiceWebsiteType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { FilterStatus } from "../../components/FilterStatus/FilterStatus";
import { ServiceEnvironment } from "../../components/ServiceEnvironment/ServiceEnvironment";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./SitesList.module.scss";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type environmentFilterOptions = {
	[key: string]: (service: ServiceType) => boolean;
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
	originalServices: Array<ServiceType>;
	services: Array<ServiceType>;
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
			originalServices: [],
			services: [],
			isLoading: true,
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
		};

		document.title = "NICE Accounts - Services list";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const services = await fetchData(Endpoints.servicesList);

		let splitServices: Array<ServiceType>;
		services.forEach((service: ServiceType) => {
			const id = service.id;
			const name = service.name;
			const websites: Array<ServiceWebsiteType> = [];

			service.websites.forEach((website: ServiceWebsiteType) => {
				websites.push(website);
				const splitService = {id, name, websites}; 
				splitServices.push(splitService)
			});
		});

		if (isDataError(services)) {
			this.setState({ error: services });
		}

		this.setState({ originalServices: services, services: splitServices, isLoading: false });
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

	filterServicesByEnvironment = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ isLoading: true });

		const environmentFilter = e.target.value;

		let services = this.state.originalServices,
			pageNumber = this.state.pageNumber;

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		if (environmentFilter) {
			services = this.servicesByEnvironment(environmentFilter, services);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.services.length,
		);

		this.setState({ services: services, environmentFilter: environmentFilter, pageNumber, isLoading: false });
	};

	filterServicesBySearch = async (searchQuery: string): Promise<void> => {
		this.setState({ isLoading: true });

		const originalServices = await fetchData(
			`${Endpoints.servicesList}?q=${searchQuery}`,
		);

		let services: Array<ServiceType>;
		originalServices.forEach((service: ServiceType) => {
			const id = service.id;
			const name = service.name;
			const websites: Array<ServiceWebsiteType> = [];

			service.websites.forEach((website: ServiceWebsiteType) => {
				websites.push(website);
				const splitService = {id, name, websites}; 
				services.push(splitService)
			});
		});

		let	pageNumber = this.state.pageNumber;

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		if (isDataError(originalServices)) {
			this.setState({ error: originalServices });
		}

		if (this.state.environmentFilter) {
			services = this.servicesByEnvironment(this.state.environmentFilter, services);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.services.length,
		);

		this.setState({
			originalServices: originalServices,
			services: services,
			searchQuery,
			pageNumber,
			isLoading: false,
		});
	};

	servicesByEnvironment = (
		environmentFilter: string,
		services: Array<ServiceType>,
	): Array<ServiceType> => {
		const environmentFilterOptions: environmentFilterOptions = {
			live: (service) => service.websites[0].environment.id == 6,
			beta: (service) => service.websites[0].environment.id == 5,
			alpha: (service) => service.websites[0].environment.id == 4,
			test: (service) => service.websites[0].environment.id == 3,
			dev: (service) => service.websites[0].environment.id == 2,
			local: (service) => service.websites[0].environment.id == 1,
		};

		const filteredServices = services.filter(environmentFilterOptions[environmentFilter]);

		return filteredServices;
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

		return `Showing ${paginationExtract}${servicesCount} user${
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
			this.state.services.length,
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
		const { services: services, searchQuery, error, isLoading, pageNumber, itemsPerPage } =
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
					<Breadcrumb>Services</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Services" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterSearch onInputChange={this.filterServicesBySearch} />
							<FilterStatus onCheckboxChange={this.filterServicesByEnvironment} />
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={!services.length}>
							{isLoading ? (
								<p>Loading...</p>
							) : services.length ? (
								<>
									<h2 className={styles.servicesListSummary}>{paginationText}</h2>
									<ul className="list--unstyled" data-qa-sel="list-of-services">
										{servicesPaginated.map((service) => {
											const {
												id,
												name,
												websites
											} = service;
											const servicesListHeading = {
												headingText: `${name}`,
												link: {
													elementType: Link,
													destination: `/services/${id}`,
												},
											};

											const servicesListMetadata: Array<CardMetaData> = [
												{
													value: <ServiceEnvironment service={service} />,
												},
												{
													label: "Website",
													value: websites,
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
