import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
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
import { HistoryType, OrganisationType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./OrganisationsList.module.scss";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type sortOption = {
	identifier: string;
	label: string;
};

type OrganisationsListProps = {
	location: {
		search: string;
	};
	history: HistoryType;
};

type OrganisationsListState = {
	path: string;
	organisations: Array<OrganisationType>;
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
	pageNumber: number;
	itemsPerPage: number | string;
	sortedBy: string;
};

type SortOptionsProps = {
	options: Array<sortOption>;
	selectedIdentifier: string;
	onSortClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export class OrganisationsList extends Component<
	OrganisationsListProps,
	OrganisationsListState
> {
	constructor(props: OrganisationsListProps) {
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
		const sortedBy = querystringObject.sort
			? Array.isArray(querystringObject.sort)
				? querystringObject.sort[0]
				: querystringObject.sort
			: "alpha-asc";

		itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

		this.state = {
			path: querystring,
			organisations: [],
			isLoading: true,
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
			sortedBy: sortedBy,
		};

		document.title = "NICE Accounts - Organisations list";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		let organisations = await fetchData(Endpoints.organisationsList);

		if (isDataError(organisations)) {
			this.setState({ error: organisations });
		} else {
			organisations = this.sortOrganisations(
				this.state.sortedBy,
				organisations,
			);
		}

		this.setState({
			organisations,
			isLoading: false,
		});
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

	filterOrganisationsBySearch = async (searchQuery: string): Promise<void> => {
		this.setState({ isLoading: true });

		let organisations = await fetchData(
			`${Endpoints.organisationsList}?q=${searchQuery}`,
		);

		if (isDataError(organisations)) {
			this.setState({ error: organisations });
		}

		organisations = this.sortOrganisations(this.state.sortedBy, organisations);

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		const pageNumber = this.pastPageRange(
			itemsPerPage,
			this.state.pageNumber,
			this.state.organisations.length,
		);

		this.setState({
			organisations,
			searchQuery,
			pageNumber,
			isLoading: false,
		});
	};

	getPaginateStartAndFinishPosition = (
		websitesCount: number,
		pageNumber: number,
		itemsPerPage: number | string,
	): { start: number; finish: number } => {
		const paginationPositions = {
			start: 0,
			finish: websitesCount,
		};

		const itemAmountIsNumber = Number(itemsPerPage);

		if (itemAmountIsNumber) {
			paginationPositions.start = (pageNumber - 1) * itemAmountIsNumber;
			paginationPositions.finish =
				paginationPositions.start + itemAmountIsNumber <= websitesCount
					? paginationPositions.start + itemAmountIsNumber
					: websitesCount;
		}

		return paginationPositions;
	};

	getPaginationText = (
		websitesCount: number,
		start: number,
		finish: number,
	): string => {
		const amountPerPage = finish - start;
		const paginationExtract =
			websitesCount > amountPerPage ? `${start + 1} to ${finish} of ` : "";

		return `Showing ${paginationExtract}${websitesCount} organisation${
			websitesCount === 1 ? "" : "s"
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
			this.state.organisations.length,
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

	sortOrganisations = (
		sortBy: string,
		organisations: Array<OrganisationType>,
	): Array<OrganisationType> => {
		const sortFunctions: {
			[key: string]: (a: OrganisationType, b: OrganisationType) => number;
		} = {
			"alpha-asc": (a, b) => a.name.localeCompare(b.name),
			"alpha-desc": (a, b) => b.name.localeCompare(a.name),
			"date-asc": (a, b) => a.dateAdded.localeCompare(b.dateAdded),
			"date-desc": (a, b) => b.dateAdded.localeCompare(a.dateAdded),
		};

		const sortedOrganisations = organisations.sort(sortFunctions[sortBy]);

		return sortedOrganisations;
	};

	handleSortClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();

		let path = removeQueryParameter(this.state.path, "sort");

		const sortBy =
			(e.target as HTMLAnchorElement).getAttribute("data-sort") ?? "alpha-asc";
		const organisations = this.sortOrganisations(
			sortBy,
			this.state.organisations,
		);

		path = appendQueryParameter(path, "sort", sortBy);

		this.setState({ sortedBy: sortBy, path, organisations }, () => {
			this.props.history.push(path);
		});
	};

	render(): JSX.Element {
		const {
			organisations,
			searchQuery,
			error,
			isLoading,
			pageNumber,
			itemsPerPage,
		} = this.state;

		const paginatePositions = this.getPaginateStartAndFinishPosition(
			organisations.length,
			pageNumber,
			itemsPerPage,
		);

		const paginationText = this.getPaginationText(
			organisations.length,
			paginatePositions.start,
			paginatePositions.finish,
		);

		const organisationsPaginated = organisations.length
			? organisations.slice(paginatePositions.start, paginatePositions.finish)
			: organisations;

		const sortOptions = [
			{ identifier: "alpha-asc", label: "A - Z" },
			{ identifier: "alpha-desc", label: "Z - A" },
			{ identifier: "date-asc", label: "Date ascending" },
			{ identifier: "date-desc", label: "Date descending" },
		];

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb>Organisations</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Organisations" className="page-header mb--d" />

				{!error ? (
					<Grid>
						<GridItem cols={12}>
							<Button
								to={`/organisations/add`}
								variant="cta"
								elementType={Link}
								className="mb--e"
								data-qa-sel="add-organisation"
							>
								Add organisation
							</Button>
						</GridItem>
						<GridItem cols={12} md={3}>
							<FilterSearch
								onInputChange={this.filterOrganisationsBySearch}
								label={"Filter by organisation name"}
							/>
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={true}>
							{isLoading ? (
								<p>Loading...</p>
							) : organisationsPaginated.length ? (
								<>
									<div className="text-right">
										<SortOptions
											options={sortOptions}
											selectedIdentifier={this.state.sortedBy}
											onSortClick={this.handleSortClick}
										/>
									</div>
									<h2
										className={styles.organisationsListSummary}
										data-qa-sel="organisations-returned"
									>
										{paginationText}
									</h2>
									<ul
										className="list--unstyled"
										data-qa-sel="list-of-organisations"
									>
										{organisationsPaginated.map((organisation) => {
											const { id, name, dateAdded } = organisation;
											const organisationsListHeading = {
												headingText: `${name}`,
												link: {
													elementType: Link,
													destination: `/organisations/${id}`,
												},
											};

											const organisationsListMetadata: Array<CardMetaData> = [
												{
													label: "Date created",
													value: Moment(dateAdded).format("DD-MM-YYYY"),
												},
											];

											return (
												<li key={id}>
													<Card
														{...organisationsListHeading}
														metadata={organisationsListMetadata}
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
										consultationCount={organisations.length}
										currentPage={pageNumber}
									/>
								</>
							) : searchQuery ? (
								<p>No results found for &quot;{searchQuery}&quot;</p>
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

export const SortOptions = (props: SortOptionsProps): React.ReactElement => (
	<ul className="list list--piped">
		{props.options.map((option, index) => (
			<li key={option.identifier}>
				{option.identifier === props.selectedIdentifier ? (
					<span
						className={`pv--c ${
							index === 0
								? "pr--c"
								: index == props.options.length - 1
								? "pl--c"
								: "ph--c"
						}`}
					>
						{option.label}
					</span>
				) : (
					<a
						onClick={props.onSortClick}
						data-sort={option.identifier}
						data-qa-sel={`sort-${option.identifier}`}
					>
						{option.label}
					</a>
				)}
			</li>
		))}
	</ul>
);
