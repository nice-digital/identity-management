import { useCallback } from "react";

export type CustomError = {
	error: Error;
	status: number;
}

type doFetchType = <T>(url?: string, options?: Record<string, unknown>) => Promise<T | CustomError>;

export const isError = <T>(data: T | CustomError): data is CustomError => {
    return (data as CustomError).error !== undefined;
};

export const useFetch = (): doFetchType => {

	const doFetch: doFetchType = useCallback(async (url = "", options = {}) => {
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
			return data;
		} else {
			const error = new Error(data.message || data.title);
			console.error(error);
			return { error, status: data.status } as CustomError;
		}
	}, []);

	return doFetch;
};
