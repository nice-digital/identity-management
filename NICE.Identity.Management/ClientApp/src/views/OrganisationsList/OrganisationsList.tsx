import React, { FC, useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useFetch } from "../../helpers/useFetch";
import { useListInfo } from "../../helpers/useListInfo";
import { Endpoints } from "../../data/endpoints";
import { OrganisationType } from "../../models/types";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { EnhancedPagination } from "@nice-digital/nds-enhanced-pagination";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { ResultsList } from "../../components/ResultsList/ResultsList";
import {
	SortOptions,
	SortOptionsProps,
} from "../../components/SortOptions/SortOptions";
import { ItemsPerPage } from "../../components/ItemsPerPage/ItemsPerPage";
import { ResultOrganisation } from "../../components/ResultOrganisation/ResultOrganisation";

import styles from "./OrganisationsList.module.scss";

type CustomError = {
	error: Error;
	status: number;
};

export const OrganisationsList = (): React.ReactElement => {
	const [organisations, setOrganisations] =
		useState<Array<OrganisationType>>(Object);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { pageNumber, itemsPerPage, totalPages, outOfRange } = useListInfo(
		isLoading ? 0 : organisations.length,
	);
	const { search: querystring } = useLocation();
	const qs = new URLSearchParams(querystring);
	const { q: searchQuery } = Object.fromEntries(qs);
	const doFetch = useFetch();

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const data = await doFetch<Array<OrganisationType>>(
				`${Endpoints.organisationsList}?q=${searchQuery || ""}`,
			);

			if (containsError(data)) {
				const errorObject = data as CustomError;
				setError(errorObject.error);
			} else {
				const organisationsData = data as Array<OrganisationType>;
				setOrganisations(organisationsData);
			}
			setIsLoading(false);
		})();
	}, [searchQuery, doFetch]);

	const containsError = (
		data: Array<Record<string, unknown>> | Record<string, unknown>,
	) => {
		return Object.prototype.hasOwnProperty.call(data, "error");
	};

	if (outOfRange) {
		qs.set("page", "1");
		return <Redirect to={`/organisations2?${qs}`} />;
	}

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
						<FilterSearch label={"Filter by organisation name"} />
					</GridItem>
					<GridItem cols={12} md={9} aria-busy={true}>
						{isLoading ? (
							<p>Loading...</p>
						) : organisations.length ? (
							<>
								<div className="text-right">
									<SortOptions />
								</div>
								<PaginationText dataLength={organisations.length} />
								<ResultsList
									data={organisations}
									elementType={ResultOrganisation}
									qaSelExtract="organisations"
								/>
								<div className={`${styles.flex} ${styles.flexSpaceBetween}`}>
									<ItemsPerPage amount={itemsPerPage} />
									<EnhancedPagination
										currentPage={pageNumber}
										elementType={Link}
										method="to"
										mapPageNumberToHref={(pageNumber) => {
											const qs = new URLSearchParams(querystring);
											qs.set("page", pageNumber.toString());
											return `?${qs}`;
										}}
										totalPages={totalPages}
									/>
								</div>
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
};

type PaginationTextProps = { dataLength: number };

export const PaginationText: FC<PaginationTextProps> = ({ dataLength }) => {
	const { paginationStart, paginationFinish, itemsPerPage } =
		useListInfo(dataLength);

	return (
		<h2
			className={styles.organisationsListSummary}
			data-qa-sel="organisations-returned"
		>
			{`Showing ${
				dataLength > itemsPerPage
					? `${paginationStart} to ${paginationFinish} of `
					: ""
			}${dataLength} organisation${dataLength === 1 ? "" : "s"}`}
		</h2>
	);
};
