import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type ListInfoType = {
    pageNumber: number;
    itemsPerPage: string | number;
    totalPages: number;
    outOfRange: boolean;
    paginationStart: number;
    paginationFinish: number;
};

export const useListInfo = (dataLength: number) => {
  const [data, setData] = useState<ListInfoType>(Object);
  const { search: querystring } = useLocation();
  
  useEffect(() => {
    const qs = new URLSearchParams(querystring);
	const { page, amount, q: searchQuery } = Object.fromEntries(qs);

    const pageNumber = Number(page) || 1;
	const showAllItemsPerPage = amount === "all";
	const itemsPerPage = showAllItemsPerPage ? "all" : Number(amount) || 25;
	const totalPages = showAllItemsPerPage ? 1 : Math.ceil(dataLength / Number(itemsPerPage));
	const outOfRange = pageNumber > 0 && pageNumber <= totalPages ? false : true;

	let paginationStart = 0;
	let paginationFinish = dataLength;

	if (Number(itemsPerPage)) {
		paginationStart = pageNumber * Number(itemsPerPage) - (Number(itemsPerPage) - 1);
		paginationFinish = pageNumber * Number(itemsPerPage);
	}

    setData({ pageNumber, itemsPerPage, totalPages, outOfRange, paginationStart, paginationFinish });
  }, [querystring, dataLength]);

  return data;
};