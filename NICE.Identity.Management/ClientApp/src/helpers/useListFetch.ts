import { useCallback } from "react";
import { useFetch, isError, CustomError } from "./useFetch";
import { useListInfo } from "./useListInfo";
import { getPaginationRange } from "./getPaginationRange";
import { SortOptions } from "./sortOptions";

export { isError } from "./useFetch";

type ListData<TItem extends SortableItem> = {
	items: TItem[];
	totalCount: number;
};

type ListFetchType<T extends SortableItem> = (url?: string) => Promise<ListData<T> | CustomError>;

type SortableItem = { name: string; dateAdded: string; };

const sortFunctions: Record<SortOptions, (a: SortableItem, b: SortableItem) => number> = {
	"alpha-asc": (a, b) => a.name.localeCompare(b.name),
	"alpha-desc": (a, b) => b.name.localeCompare(a.name),
	"date-asc": (a, b) => a.dateAdded.localeCompare(b.dateAdded),
	"date-desc": (a, b) => b.dateAdded.localeCompare(a.dateAdded),
};

export const useListFetch = <TItem extends SortableItem>(): ListFetchType<TItem> => {
    const { pageNumber, itemsPerPage, currentSortOrder } = useListInfo();
	const doFetch = useFetch();

    const listFetch = useCallback(async (url = "") => {
        const data = await doFetch<TItem[]>(url);
        
        if (isError(data)) {
            return data;
        }
        
        const paginationRange = getPaginationRange(pageNumber, itemsPerPage, data.length);
        const processedData = data.sort(sortFunctions[currentSortOrder as SortOptions || "alpha-asc"])
            .slice(paginationRange.start - 1, paginationRange.finish);
        return { items: processedData, totalCount: data.length };
        
    }, [pageNumber, itemsPerPage, currentSortOrder, doFetch]);

	return listFetch;
};
