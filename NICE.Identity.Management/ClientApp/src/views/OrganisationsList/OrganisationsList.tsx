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
import { SortOptions } from "../../components/SortOptions/SortOptions";
import { ItemsPerPage } from "../../components/ItemsPerPage/ItemsPerPage";
import { ResultOrganisation } from "../../components/ResultOrganisation/ResultOrganisation";
import { PaginationText } from "../../components/PaginationText/PaginationText";

import styles from "./OrganisationsList.module.scss";

type CustomError = {
	error: Error;
	status: number;
};

type DataObjectType = {
	data: Array<OrganisationType>;
	totalCount: number;
};

export const OrganisationsList: FC = () => {
	const [organisations, setOrganisations] =
		useState<Array<OrganisationType>>(Object);
	const [organisationsCount, setOrganisationsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { pageNumber, totalPages, outOfRange, searchQuery } =
		useListInfo(organisationsCount);
	const doFetch = useFetch();
	const { search: querystring } = useLocation();
	const querystringObject = new URLSearchParams(querystring);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const dataObject = await doFetch<DataObjectType | CustomError>(
				`${Endpoints.organisationsList}?q=${searchQuery || ""}`,
				{},
				true,
			);

			if (containsError(dataObject)) {
				const errorObject = dataObject as CustomError;
				setError(errorObject.error);
			} else {
				const organisationsData = dataObject as unknown;
				setOrganisations((organisationsData as DataObjectType).data);
				setOrganisationsCount((organisationsData as DataObjectType).totalCount);
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
								<div className={`${styles.flex} ${styles.flexSpaceBetween}`}>
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
