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
import { UserType, HistoryType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { FilterStatus } from "../../components/FilterStatus/FilterStatus";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./UsersList.module.scss";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
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
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
	statusFilter?: string;
	pageNumber: number;
	itemsPerPage: number | string;
};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
		super(props);

		const querystring = this.props.location.search;

		let querystringObject = queryStringToObject(querystring);

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
			isLoading: true,
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage,
		};

		document.title = "NICE Accounts - Users list"
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		let users = await fetchData(Endpoints.usersList);

		if (isDataError(users)) {
			this.setState({ error: users });
		}

		this.setState({ originalUsers: users, users, isLoading: false });
	}

	pastPageRange = (
		itemsPerPage: string | number,
		pageNumber: number,
		dataCount: number,
	) => {
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

	filterUsersByStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ isLoading: true });

		let statusFilter = e.target.value,
			users = this.state.originalUsers,
			pageNumber = this.state.pageNumber,
			itemsPerPage = Number(this.state.itemsPerPage)
				? Number(this.state.itemsPerPage)
				: this.state.itemsPerPage;

		if (statusFilter) {
			users = this.usersByStatus(statusFilter, users);
		}

		pageNumber = this.pastPageRange(
			itemsPerPage,
			pageNumber,
			this.state.users.length,
		);

		this.setState({ users, statusFilter, pageNumber, isLoading: false });
	};

	filterUsersBySearch = async (searchQuery: string) => {
		this.setState({ isLoading: true });

		let originalUsers = await fetchData(
				`${Endpoints.usersList}?q=${searchQuery}`,
			),
			users = originalUsers,
			pageNumber = this.state.pageNumber,
			itemsPerPage = Number(this.state.itemsPerPage)
				? Number(this.state.itemsPerPage)
				: this.state.itemsPerPage;

		if (isDataError(originalUsers)) {
			this.setState({ error: originalUsers });
		}

		if (this.state.statusFilter) {
			users = this.usersByStatus(this.state.statusFilter, users);
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

	usersByStatus = (
		statusFilter: string,
		users: Array<UserType>,
	): Array<UserType> => {
		return (users = users.filter((user) => {
			let userActive = !user.isLockedOut,
				userPending = !user.hasVerifiedEmailAddress;

			if (statusFilter === "active" && userActive && !userPending) {
				return user;
			}

			if (statusFilter === "pending" && userPending) {
				return user;
			}

			if (statusFilter === "locked" && !userActive) {
				return user;
			}
		}));
	};

	getPaginateStartAndFinishPosition = (
		consultationsCount: number,
		pageNumber: number,
		itemsPerPage: number | string,
	) => {
		let paginationPositions = {
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

	getPaginationText = (usersCount: number, start: number, finish: number) => {
		const amountPerPage = finish - start;
		const paginationExtract =
			usersCount > amountPerPage ? `${start + 1} to ${finish} of ` : "";

		return `Showing ${paginationExtract}${usersCount} user${
			usersCount === 1 ? "" : "s"
		}`;
	};

	changeAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

	changePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

	render() {
		const {
			users,
			searchQuery,
			error,
			isLoading,
			pageNumber,
			itemsPerPage,
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
					<Breadcrumb>Users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Users" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterSearch onInputChange={this.filterUsersBySearch} />
							<FilterStatus onCheckboxChange={this.filterUsersByStatus} />
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
												<Card
													{...usersListHeading}
													metadata={usersListMetadata}
													key={nameIdentifier}
												/>
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
