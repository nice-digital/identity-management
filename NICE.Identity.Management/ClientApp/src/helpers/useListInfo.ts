import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getPaginationRange } from "./getPaginationRange";

type ListInfo = {
    pageNumber: number,
    itemsPerPage: string | number,
    totalPages: number | null,
    outOfRange: boolean | null,
    paginationStart: number | null,
    paginationFinish: number | null,
	searchQuery: string | null,
	currentSortOrder: string | null,
};

export const useListInfo = (dataLength?: number): ListInfo => {
	const { search: querystring } = useLocation();
	
	return useMemo<ListInfo>(() => {
		const { page, amount, sort, q: searchQuery } = Object.fromEntries(new URLSearchParams(querystring));
		
		const pageNumber = Number(page) || 1;
		const showAllItemsPerPage = amount === "all";
		const itemsPerPage = showAllItemsPerPage ? "all" : Number(amount) || 25;
		const currentSortOrder = sort;
		
		let totalPages = null;
		let paginationStart = null;
		let paginationFinish = null;
		
		if (dataLength) {
			({ start: paginationStart, finish: paginationFinish } = getPaginationRange(pageNumber, itemsPerPage, dataLength));
			totalPages = showAllItemsPerPage ? 1 : Math.ceil(dataLength / Number(itemsPerPage));
		}
		
		const outOfRange = totalPages ? pageNumber < 0 || pageNumber > totalPages : null;

		return { pageNumber, itemsPerPage, totalPages, outOfRange, paginationStart, paginationFinish, searchQuery, currentSortOrder };
	}, [querystring, dataLength]);
};