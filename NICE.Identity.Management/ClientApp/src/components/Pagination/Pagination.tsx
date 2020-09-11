import React, { Fragment } from "react";
import { Pager } from "../Pager/Pager";

import styles from "./Pagination.module.scss";

type PaginationProps = {
	onChangePage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	onChangeAmount: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	itemsPerPage: number | string;
	consultationCount: number;
	currentPage: number;
};

export const Pagination = (props: PaginationProps) => {
	let generatePageList = (pageCount: number, currentPage: number) => {
		let pageListArray = [currentPage - 1, currentPage, currentPage + 1];

		if (currentPage <= 3) {
			pageListArray = [1, 2, 3, 4];
		}

		if (currentPage >= pageCount - 2) {
			pageListArray = [pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
		}

		if (pageCount <= 5) {
			pageListArray = Array.from({ length: pageCount }, (x, y) => y + 1);
		}

		return pageListArray;
	};

	const {
		onChangePage,
		onChangeAmount,
		itemsPerPage,
		consultationCount,
		currentPage,
	} = props;

	const paginationNeeded =
		typeof itemsPerPage === "string" ? false : consultationCount > itemsPerPage;
	const pageCount = Math.ceil(
		consultationCount / parseInt(itemsPerPage!.toString(), 10),
	);

	const pageListArray = generatePageList(pageCount, currentPage);

	return (
		<div className={`${styles.flex} ${styles.flexAlignCenter}`}>
			<div className="mr--e" data-qa-sel="number-of-results-on-page">
				<label htmlFor="itemsPerPage" className="bold mr--c">
					Items per page
				</label>
				<select
					id="itemsPerPage"
					name="itemsPerPage"
					onChange={onChangeAmount}
					value={itemsPerPage}
					data-qa-sel="result-on-the-page-index"
				>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="all">All</option>
				</select>
			</div>

			{paginationNeeded && (
				<nav role="navigation" aria-label="Select page to navigate to">
					<ul className={styles.pagination} data-qa-sel="pagination-section">
						{currentPage > 1 && (
							<Pager
								active={false}
								label="previous"
								type="previous"
								data-qa-sel="pagination-previous"
								onChangePage={onChangePage}
							/>
						)}

						{pageListArray.map((page, index) => {
							let showFirstLink = index === 0 && page > 1 && pageCount > 5;
							let showLastLink =
								index === pageListArray.length - 1 &&
								page < pageCount &&
								pageCount > 5;

							return (
								<Fragment key={page}>
									{showFirstLink && (
										<Pager
											active={false}
											label="1"
											type="first"
											data-qa-sel="pagination-first"
											onChangePage={onChangePage}
										/>
									)}

									<Pager
										active={page === currentPage}
										label={page.toString()}
										type="normal"
										onChangePage={onChangePage}
									/>

									{showLastLink && (
										<Pager
											active={false}
											label={pageCount.toString()}
											type="last"
											data-qa-sel="pagination-last"
											onChangePage={onChangePage}
										/>
									)}
								</Fragment>
							);
						})}

						<span
							className={styles.paginationCounter}
						>{`Page ${currentPage} of ${pageCount}`}</span>

						{currentPage < pageCount && (
							<Pager
								active={false}
								data-qa-sel="pagination-next"
								label="next"
								type="next"
								onChangePage={onChangePage}
							/>
						)}
					</ul>
				</nav>
			)}
		</div>
	);
};
