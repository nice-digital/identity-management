import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPaginationRange } from "./getPaginationRange";

type UseListInfoType = (dataLength?: number | null) => {
    pageNumber: number,
    itemsPerPage: string | number,
    totalPages: number | null,
    outOfRange: boolean | null,
    paginationStart: number | null,
    paginationFinish: number | null,
	searchQuery: string,
	currentSortOrder: string,
};

export const useListInfo: UseListInfoType = (dataLength) => {
	const [data, setData] = useState(Object);
	const { search: querystring } = useLocation();

	useEffect(() => {
		const querystringObject = new URLSearchParams(querystring);
		const { page, amount, sort, q: searchQuery } = Object.fromEntries(querystringObject);
		
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

		setData({ pageNumber, itemsPerPage, totalPages, outOfRange, paginationStart, paginationFinish, searchQuery, currentSortOrder });
	}, [querystring, dataLength]);

	return data;
};