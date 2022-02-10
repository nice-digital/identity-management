import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
	sortOptions,
	SortOptions,
} from "./sortOptions";

type CustomError = {
	error: Error;
	status: number;
}
type doFetchType = <T>(url?: string, options?: Record<string, unknown>) => Promise<T | CustomError>;

type SortableListEntry = { name: string; dateAdded: string; };

const sortFunctions: Record<SortOptions, (a: SortableListEntry, b: SortableListEntry) => number> = {
	"alpha-asc": (a, b) => a.name.localeCompare(b.name),
	"alpha-desc": (a, b) => b.name.localeCompare(a.name),
	"date-asc": (a, b) => a.dateAdded.localeCompare(b.dateAdded),
	"date-desc": (a, b) => b.dateAdded.localeCompare(a.dateAdded),
};

export const useFetch = (): doFetchType => {
	const { search: querystring } = useLocation();
	//const { search: querystring } = useListInfo();
	
	const doFetch: doFetchType = useCallback(async (url = "", options = {}) => {
		let response, data;

		try {
			response = await fetch(url, options);
			data = await response.json();
		} catch (err: unknown) {
			const error = err as Error;
			const typedErr = err as Record<string, unknown>;
			console.error(error);
			return { error, status: typedErr.response };
		}

		if (response.status === 200 || response.status === 201) {
			const qs = new URLSearchParams(querystring);
			
			return data.length
				? data.sort(sortFunctions[qs.get("sort") as SortOptions || "alpha-asc"])
				: data;
		} else {
			const error = new Error(data.message || data.title);
			console.error(error);
			return { error, status: data.status };
		}
	}, [querystring]);

	return doFetch;
};
