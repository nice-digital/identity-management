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
import { UserType, HistoryType, ServiceType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { FilterBox } from "../../components/FilterBox/FilterBox";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./UsersList.module.scss";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type FiltersType = {
	name: string;
	value: string;
};

type ServicesByEnvironmentType = {
	[key: string]: Array<FiltersType>;
};

type statusFilters = {
	[key: string]: (user: UserType) => boolean;
};

type UsersListProps = {
	basename: string;
	location: {
		pathname: string;
		search: string;
	};
	history: HistoryType;
};

type UsersListState = {
	path: string;
	originalUsers: Array<UserType>;
	users: Array<UserType>;
	services: ServicesByEnvironmentType;
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
	statusFiltersChecked: Array<string>;
	serviceFiltersChecked: Array<string>;
	pageNumber: number;
	itemsPerPage: number | string;
};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
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
			originalUsers: [],
			users: [],
			services: {} as ServicesByEnvironmentType,
			isLoading: true,
			statusFiltersChecked: [],
			serviceFiltersChecked: [],
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
		};

		document.title = "NICE Accounts - Users list";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const users = await fetchData(Endpoints.usersList);
		const services = await fetchData(Endpoints.servicesList);

		if (isDataError(users)) {
			this.setState({ error: users });
		}

		if (isDataError(services)) {
			this.setState({ error: services });
		}

		const servicesByEnvironment = Array.isArray(services)
			? services.reduce(
					(result: ServicesByEnvironmentType, service: ServiceType) => {
						service.websites.map((website) => {
							const environmentName = website.environment.name;
							const updatedService = { ...service, value: `${website.id}` };
							updatedService.websites = [{ ...website }];
							result[environmentName] = result[environmentName] || [];
							result[environmentName].push(updatedService);
						});
						return result;
					},
					Object.create(null),
			  ) // eslint-disable-line
			: {};

		this.setState({
			originalUsers: users,
			users,
			services: servicesByEnvironment,
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

	filterUsersByStatus = (status: string): void => {
		this.setState({ isLoading: true });

		let statusFiltersChecked = this.state.statusFiltersChecked;

		statusFiltersChecked = statusFiltersChecked.includes(status)
			? statusFiltersChecked.filter((statusFilter) => statusFilter !== status)
			: statusFiltersChecked.concat(status);

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		let users = this.state.searchQuery
				? this.state.users
				: this.state.originalUsers,
			pageNumber = this.state.pageNumber;

		if (statusFiltersChecked.length)
			users = this.usersByStatus(statusFiltersChecked, users);

		if (this.state.serviceFiltersChecked.length)
			users = this.usersByService(this.state.serviceFiltersChecked, users);

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.users.length,
		);

		this.setState({
			users,
			statusFiltersChecked,
			pageNumber,
			isLoading: false,
		});
	};

	filterUsersByService = (serviceId: string): void => {
		this.setState({ isLoading: true });

		let serviceFiltersChecked = this.state.serviceFiltersChecked;

		serviceFiltersChecked = serviceFiltersChecked.includes(serviceId)
			? serviceFiltersChecked.filter((filter) => filter !== serviceId)
			: serviceFiltersChecked.concat(serviceId);

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		let users = this.state.searchQuery
				? this.state.users
				: this.state.originalUsers,
			pageNumber = this.state.pageNumber,
			filtersActive = false;

		if (serviceFiltersChecked.length) {
			users = this.usersByService(serviceFiltersChecked, users);
			filtersActive = true;
		}

		if (this.state.statusFiltersChecked.length) {
			users = this.usersByStatus(this.state.statusFiltersChecked, users);
			filtersActive = true;
		}

		if (!filtersActive) {
			users = this.state.originalUsers;
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.users.length,
		);

		this.setState({
			users,
			serviceFiltersChecked,
			pageNumber,
			isLoading: false,
		});
	};

	filterUsersBySearch = async (searchQuery: string): Promise<void> => {
		this.setState({ isLoading: true });

		const originalUsers = await fetchData(
			`${Endpoints.usersList}?q=${searchQuery}`,
		);

		let users = originalUsers,
			pageNumber = this.state.pageNumber;

		const itemsPerPage = Number(this.state.itemsPerPage)
			? Number(this.state.itemsPerPage)
			: this.state.itemsPerPage;

		if (isDataError(originalUsers)) {
			this.setState({ error: originalUsers });
		}

		if (this.state.statusFiltersChecked.length) {
			users = this.usersByStatus(this.state.statusFiltersChecked, users);
		}

		if (this.state.serviceFiltersChecked.length) {
			users = this.usersByService(this.state.serviceFiltersChecked, users);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.users.length,
		);

		this.setState({
			originalUsers,
			users,
			searchQuery,
			pageNumber,
			isLoading: false,
		});
	};

	usersByService = (
		serviceFiltersChecked: Array<string>,
		users: Array<UserType>,
	): Array<UserType> => {
		return (users = users.filter((user) => {
			const userServices = user.hasAccessToWebsiteIds;

			if (
				userServices.some((id) => serviceFiltersChecked.indexOf(`${id}`) >= 0)
			) {
				return user;
			}
		}));
	};

	usersByStatus = (
		statusFiltersChecked: Array<string>,
		users: Array<UserType>,
	): Array<UserType> => {
		const statusFilters: statusFilters = {
			Active: (user) => !user.isLockedOut && user.hasVerifiedEmailAddress,
			Pending: (user) => !user.hasVerifiedEmailAddress,
			Locked: (user) => user.isLockedOut,
		};

		let filteredUsers: Array<UserType> = [];

		statusFiltersChecked.map((statusFilter) => {
			const filteredUsersIds = filteredUsers.map((user) => user.userId);
			let filteredByStatus = users.filter(statusFilters[statusFilter]);

			filteredByStatus = filteredByStatus.filter(
				(user) => filteredUsersIds.indexOf(user.userId) < 0,
			);

			filteredUsers = filteredUsers.concat(filteredByStatus);
		});

		return filteredUsers;
	};

	getPaginateStartAndFinishPosition = (
		consultationsCount: number,
		pageNumber: number,
		itemsPerPage: number | string,
	): { start: number; finish: number } => {
		const paginationPositions = {
			start: 0,
			finish: consultationsCount,
		};

		const itemAmountIsNumber = Number(itemsPerPage);

		if (itemAmountIsNumber) {
			paginationPositions.start = (pageNumber - 1) * itemAmountIsNumber;
			paginationPositions.finish =
				paginationPositions.start + itemAmountIsNumber <= consultationsCount
					? paginationPositions.start + itemAmountIsNumber
					: consultationsCount;
		}

		return paginationPositions;
	};

	getPaginationText = (
		usersCount: number,
		start: number,
		finish: number,
	): string => {
		const amountPerPage = finish - start;
		const paginationExtract =
			usersCount > amountPerPage ? `${start + 1} to ${finish} of ` : "";

		return `Showing ${paginationExtract}${usersCount} user${
			usersCount === 1 ? "" : "s"
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
			this.state.users.length,
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
		const {
			users,
			services,
			searchQuery,
			error,
			isLoading,
			pageNumber,
			itemsPerPage,
			serviceFiltersChecked,
			statusFiltersChecked,
		} = this.state;

		const paginationPositions = this.getPaginateStartAndFinishPosition(
			users.length,
			pageNumber,
			itemsPerPage,
		);

		const paginationText = this.getPaginationText(
			users.length,
			paginationPositions.start,
			paginationPositions.finish,
		);

		const usersPaginated = users.length
			? users.slice(paginationPositions.start, paginationPositions.finish)
			: users;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb>Users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Users" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterSearch onInputChange={this.filterUsersBySearch} />
							<FilterBox
								name="Status"
								filters={["Active", "Pending", "Locked"]}
								selected={statusFiltersChecked}
								onCheckboxChange={this.filterUsersByStatus}
							/>
							{Object.keys(services).map((key, index) => (
								<FilterBox
									name={key}
									filters={services[key]}
									selected={serviceFiltersChecked}
									onCheckboxChange={this.filterUsersByService}
									key={index}
								/>
							))}
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={!users.length}>
							{isLoading ? (
								<p>Loading...</p>
							) : users.length ? (
								<>
									<h2 className={styles.usersListSummary}>{paginationText}</h2>
									<ul className="list--unstyled" data-qa-sel="list-of-users">
										{usersPaginated.map((user) => {
											const {
												userId,
												emailAddress,
												nameIdentifier,
												firstName,
												lastName,
											} = user;
											const usersListHeading = {
												headingText: `${firstName} ${lastName}`,
												link: {
													elementType: Link,
													destination: `/users/${userId}`,
												},
											};

											const usersListMetadata: Array<CardMetaData> = [
												{
													value: <UserStatus user={user} />,
												},
												{
													label: "Email address",
													value: emailAddress,
												},
											];

											return (
												<li key={nameIdentifier}>
													<Card
														{...usersListHeading}
														metadata={usersListMetadata}
														key={nameIdentifier}
													/>
												</li>
											);
										})}
									</ul>
									<Pagination
										onChangePage={this.changePage}
										onChangeAmount={this.changeAmount}
										itemsPerPage={itemsPerPage}
										consultationCount={users.length}
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
