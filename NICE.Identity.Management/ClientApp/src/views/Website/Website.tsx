import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import {
	queryStringToObject,
	appendQueryParameter,
	removeQueryParameter,
	stripMultipleQueries,
} from "../../utils/querystring";
import { Table } from "@nice-digital/nds-table";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import {
	RoleType,
	UserAndRolesType,
	WebsiteUsersAndRolesType,
} from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { FilterBox } from "../../components/FilterBox/FilterBox";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./Website.module.scss";

type TParams = { id: string };

type WebsiteProps = Record<string, unknown> & RouteComponentProps<TParams>;

type WebsiteState = {
	path: string;
	websiteUsersAndRoles: WebsiteUsersAndRolesType;
	usersAndRoles: Array<UserAndRolesType>;
	allRoles: Array<RoleType>;
	error?: Error;
	isLoading: boolean;
	pageNumber: number;
	itemsPerPage: number | string;
	rolesForFilter: Array<string>;
	roleFiltersChecked: Array<string>;
};

export class Website extends Component<WebsiteProps, WebsiteState> {
	constructor(props: WebsiteProps) {
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
			websiteUsersAndRoles: {} as WebsiteUsersAndRolesType,
			usersAndRoles: [],
			allRoles: [],
			isLoading: true,
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
			rolesForFilter: [],
			roleFiltersChecked: [],
		};
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const websiteUsersAndRoles = await fetchData(
			Endpoints.usersAndRolesByWebsite(this.props.match.params.id),
		);

		if (isDataError(websiteUsersAndRoles)) {
			this.setState({ error: websiteUsersAndRoles });
		} else {
			const allRoles: Array<string> = [];
			websiteUsersAndRoles.allRoles.slice(0).map((role: RoleType) => {
				allRoles.push(role.name);
			});

			const rolesForFilter = allRoles.reduce(function (
				accumulatedRoles: string[],
				currentRoles: string,
			) {
				if (accumulatedRoles.indexOf(currentRoles) === -1) {
					accumulatedRoles.push(currentRoles);
				}
				return accumulatedRoles;
			},
			[]);

			rolesForFilter.sort();
			this.setState({ rolesForFilter });

			document.title = `NICE Accounts - ${websiteUsersAndRoles.website.host}`;
		}

		this.setState({
			websiteUsersAndRoles,
			usersAndRoles: websiteUsersAndRoles.usersAndRoles,
			isLoading: false,
		});
	}

	getListOfUsersByFilteredRole = (
		roleFiltersChecked: Array<string>,
		usersAndRoles: Array<UserAndRolesType>,
	): Array<UserAndRolesType> => {
		const usersfilteredByRoles: Array<UserAndRolesType> = [];
		let currentUsersRoles: Array<string> = [];

		usersAndRoles.slice(0).map((user: UserAndRolesType) => {
			currentUsersRoles = [];
			user.roles.slice(0).map((role) => {
				currentUsersRoles.push(role.name);
			});

			const matchesFilter = roleFiltersChecked.every((element) => {
				return currentUsersRoles.includes(element);
			});

			if (matchesFilter) {
				usersfilteredByRoles.push(user);
			}
		});

		return usersfilteredByRoles;
	};

	filterUsersByRoles = (role: string): void => {
		this.setState({ isLoading: true });

		let roleFiltersChecked = this.state.roleFiltersChecked;
		// let pageNumber = this.state.pageNumber;
		// commented out as it appears not to be in use

		roleFiltersChecked = roleFiltersChecked.includes(role)
			? roleFiltersChecked.filter((roleFilter) => roleFilter !== role)
			: roleFiltersChecked.concat(role);

		// const itemsPerPage = Number(this.state.itemsPerPage)
		// 	? Number(this.state.itemsPerPage)
		// 	: this.state.itemsPerPage;
		// commented out as it appears not to be in use

		let usersAndRoles = this.state.websiteUsersAndRoles.usersAndRoles;

		if (roleFiltersChecked.length) {
			usersAndRoles = this.getListOfUsersByFilteredRole(
				roleFiltersChecked,
				usersAndRoles,
			);
		}

		// pageNumber = this.pastPageRange(
		// 	itemsPerPage,
		// 	pageNumber,
		// 	this.state.usersAndRoles.length,
		// );
		// commented out as it appears not to be in use

		// should pageNumber be set below?
		this.setState({ usersAndRoles, isLoading: false, roleFiltersChecked });
	};

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

	getPaginateStartAndFinishPosition = (
		userCount: number,
		pageNumber: number,
		itemsPerPage: number | string,
	): { start: number; finish: number } => {
		const paginatePositions = {
			start: 0,
			finish: userCount,
		};

		const itemAmountIsNumber = Number(itemsPerPage);

		if (itemAmountIsNumber) {
			paginatePositions.start = (pageNumber - 1) * itemAmountIsNumber;
			paginatePositions.finish =
				paginatePositions.start + itemAmountIsNumber <= userCount
					? paginatePositions.start + itemAmountIsNumber
					: userCount;
		}

		return paginatePositions;
	};

	changeAmount = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		let itemsPerPage = (e.target as HTMLSelectElement).value || 25,
			pageNumber = this.state.pageNumber,
			path = stripMultipleQueries(this.state.path, ["amount", "page"]);

		itemsPerPage = Number(itemsPerPage) ? Number(itemsPerPage) : itemsPerPage;

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.usersAndRoles.length,
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
			websiteUsersAndRoles,
			usersAndRoles,
			error,
			isLoading,
			pageNumber,
			itemsPerPage,
		} = this.state;

		const lastBreadcrumb = isLoading
			? "Loading service details"
			: websiteUsersAndRoles.website?.service?.name;

		const paginatePositions = this.getPaginateStartAndFinishPosition(
			usersAndRoles?.length,
			pageNumber,
			itemsPerPage,
		);

		const paginationText = this.getPaginationText(
			usersAndRoles?.length,
			paginatePositions.start,
			paginatePositions.finish,
		);

		const usersAndRolesPaginated = usersAndRoles?.length
			? usersAndRoles.slice(paginatePositions.start, paginatePositions.finish)
			: usersAndRoles;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb
						data-qa-sel="breadcrumb-administration-link"
						to="/"
						elementType={Link}
					>
						Administration
					</Breadcrumb>
					<Breadcrumb
						data-qa-sel="breadcrumb-service-link"
						to="/services"
						elementType={Link}
					>
						Services
					</Breadcrumb>
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>
				
				{!error ? (
					<>
						<PageHeader
							heading={
								isLoading
									? "Service name"
									: `${websiteUsersAndRoles.website.service.name} (${websiteUsersAndRoles.website.environment.name})`
							}
						/>

						{isLoading ? (
							<p>Loading...</p>
						) : (
							<Grid>
								<GridItem cols={12} md={3}>
									<FilterBox
										name="Roles"
										filters={this.state.rolesForFilter}
										selected={this.state.roleFiltersChecked}
										onCheckboxChange={this.filterUsersByRoles}
										hideFilterPanelHeading={true}
									/>
								</GridItem>
								<GridItem cols={12} md={9} aria-busy={true}>
									<h2
										className={styles.websiteSummary}
										data-qa-sel="users-returned"
									>
										{paginationText}
									</h2>
									<Table
										style={{ display: "table" }}
										data-qa-sel="list-of-users"
									>
										<thead>
											<tr>
												<th>User name</th>
												<th>Email address</th>
												<th>Roles(s)</th>
												<th>Is staff</th>
											</tr>
										</thead>
										<tbody>
											{usersAndRoles.length ? (
												usersAndRolesPaginated.slice(0).map((userAndRole) => {
													const {
														user: {
															firstName,
															lastName,
															emailAddress,
															nameIdentifier,
															isStaffMember,
														},
														roles,
													} = userAndRole;
													return (
														<tr key={nameIdentifier} className="userRecord">
															<td>
																{firstName} {lastName}
															</td>
															<td>{emailAddress}</td>
															<td>
																{roles.slice(0).map((role, index) => {
																	if (
																		this.state.roleFiltersChecked.includes(
																			role.name,
																		) ||
																		this.state.roleFiltersChecked.length === 0
																	) {
																		return <div key={index}>{role.name}</div>;
																	}
																})}
															</td>
															<td>{isStaffMember ? "Yes" : "No"}</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td colSpan={4}>0 results found</td>
												</tr>
											)}
										</tbody>
									</Table>
									<Pagination
										onChangePage={this.changePage}
										onChangeAmount={this.changeAmount}
										itemsPerPage={itemsPerPage}
										consultationCount={usersAndRoles.length}
										currentPage={pageNumber}
									/>
								</GridItem>
							</Grid>
						)}
					</>
				) : (					
					<>
						<PageHeader heading="Error" />
						<ErrorMessage error={error}></ErrorMessage>
					</>
				)}
			</>
		);
	}
}
