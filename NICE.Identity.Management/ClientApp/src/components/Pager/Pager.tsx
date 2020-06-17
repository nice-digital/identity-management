import React from "react";
import styles from "../Pagination/Pagination.module.scss";

type PagerProps = {
	active: boolean;
	label: string;
	type: string;
	onChangePage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const Pager = (props: PagerProps) => {
	const { active, label, type, onChangePage } = props;

	const listClasses = `${styles.paginationPager} ${
		type !== "normal" ? styles[type] : ""
	} ${active ? styles.active : ""}`.trimRight();

	let ariaLabel =
		type === "normal" ? `Go to page ${label}` : `Go to ${type} page`;

	ariaLabel = active ? `Current page, page ${label}` : ariaLabel;

	return (
		<>
			{type === "last" && (
				<li className={styles.paginationTruncate}>
					<span>&hellip;</span>
				</li>
			)}

			<li className={listClasses} key={label}>
				<a
					onClick={onChangePage}
					data-pager={label}
					href={`#${label}`}
					aria-label={ariaLabel}
				>
					{label}
				</a>
			</li>

			{type === "first" && (
				<li className={styles.paginationTruncate}>
					<span>&hellip;</span>
				</li>
			)}
		</>
	);
};
