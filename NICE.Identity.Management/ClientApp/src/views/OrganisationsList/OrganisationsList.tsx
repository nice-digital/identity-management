import React, { FC, useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useListFetch, isError } from "src/helpers/useListFetch";
import { useListInfo } from "src/helpers/useListInfo";
import { Endpoints } from "src/data/endpoints";
import { OrganisationType } from "src/models/types";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { EnhancedPagination } from "@nice-digital/nds-enhanced-pagination";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";
import { FilterSearch } from "src/components/FilterSearch/FilterSearch";
import { ResultsList } from "src/components/ResultsList/ResultsList";
import { SortOptions } from "src/components/SortOptions/SortOptions";
import { ItemsPerPage } from "src/components/ItemsPerPage/ItemsPerPage";
import { ResultOrganisation } from "src/components/ResultOrganisation/ResultOrganisation";
import { PaginationText } from "src/components/PaginationText/PaginationText";
import styles from "./OrganisationsList.module.scss";

export const OrganisationsList: FC = () => {
	const [organisations, setOrganisations] =
		useState<Array<OrganisationType>>(Object);
	const [organisationsCount, setOrganisationsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { pageNumber, totalPages, outOfRange, searchQuery } =
		useListInfo(organisationsCount);
	const listFetch = useListFetch<OrganisationType>();
	const { search: querystring } = useLocation();
	const querystringObject = new URLSearchParams(querystring);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const listData = await listFetch(
				`${Endpoints.organisationsList}?q=${searchQuery || ""}`,
			);

			if (isError(listData)) {
				setError(listData.error);
			} else {
				setOrganisations(listData.items);
				setOrganisationsCount(listData.totalCount);
			}
			setIsLoading(false);
		})();
	}, [searchQuery, listFetch]);

	if (outOfRange) {
		querystringObject.set("page", "1");
		return <Redirect to={`/organisations?${querystringObject}`} />;
	}

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="/overview" elementType={Link}>
					Administration
				</Breadcrumb>
				<Breadcrumb>Organisations</Breadcrumb>
			</Breadcrumbs>
			
			{!error ? (
				<>
					<PageHeader heading="Organisations" className="page-header mb--d" />
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
									<PaginationText
										dataLength={organisationsCount}
										labelSingular="organisation"
										labelPlural="organisations"
									/>
									<ResultsList
										data={organisations}
										elementType={ResultOrganisation}
										qaSelExtract="organisations"
									/>
									<div className={`${styles.flex} ${styles.flexAlignCenter}`}>
										<ItemsPerPage />
										<EnhancedPagination
											currentPage={pageNumber}
											elementType={Link}
											method="to"
											mapPageNumberToHref={(pageNumber) => {
												const querystringObject = new URLSearchParams(
													querystring,
												);
												querystringObject.set("page", pageNumber.toString());
												return `?${querystringObject}`;
											}}
											totalPages={totalPages || 1}
											data-qa-sel="pagination-section"
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
				</>
			) : (
				<>
					<PageHeader heading="Error" />
					<ErrorMessage error={error}></ErrorMessage>
				</>
			)}
		</>
	);
};
