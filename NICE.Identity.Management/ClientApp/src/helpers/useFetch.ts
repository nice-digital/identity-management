import { useCallback } from "react";
import { useListInfo } from "./useListInfo";
import { getPaginationRange } from "./getPaginationRange";
import { SortOptions } from "./sortOptions";

type CustomError = {
	error: Error;
	status: number;
}

type DataObject<T> = {
	data?: T;
	totalCount?: number;
};

type doFetchType = <T>(url?: string, options?: Record<string, unknown>, isListPage?: boolean) => Promise<DataObject<T> | CustomError >;

type SortableListEntry = { name: string; dateAdded: string; };

const sortFunctions: Record<SortOptions, (a: SortableListEntry, b: SortableListEntry) => number> = {
	"alpha-asc": (a, b) => a.name.localeCompare(b.name),
	"alpha-desc": (a, b) => b.name.localeCompare(a.name),
	"date-asc": (a, b) => a.dateAdded.localeCompare(b.dateAdded),
	"date-desc": (a, b) => b.dateAdded.localeCompare(a.dateAdded),
};

export const useFetch = (): doFetchType => {
	const listInfo = useListInfo();
	
	const doFetch: doFetchType = useCallback(async (url = "", options = {}, isListPage = false) => {
		const listInfoLoaded = !!Object.keys(listInfo).length;
		const { pageNumber, itemsPerPage, currentSortOrder } = listInfo;
		let response, data;

		try {
			response = await fetch(url, options);
			data = await response.json();
		} catch (err: unknown) {
			const error = err as Error;
			const typedErr = err as Record<string, unknown>;
			console.error(error);
			return { error, status: typedErr.response } as CustomError;
		}

		if (response.status === 200 || response.status === 201) {
			if (isListPage && data.length && listInfoLoaded) {
				const paginationRange = getPaginationRange(pageNumber, itemsPerPage, data.length);
				const processedData = data.sort(sortFunctions[currentSortOrder as SortOptions || "alpha-asc"])
					.slice(Number(paginationRange.start) - 1, Number(paginationRange.finish));
				return { data: processedData, totalCount: data.length };
			}
			return { data, totalCount: data.length};
		} else {
			const error = new Error(data.message || data.title);
			console.error(error);
			return { error, status: data.status } as CustomError;
		}
	}, [listInfo]);

	return doFetch;
};
