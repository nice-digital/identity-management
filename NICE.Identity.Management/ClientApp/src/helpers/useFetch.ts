import { useState } from "react";

type doFetchType = (overrideUrl?: string, overrideOptions?: Record<string, any>) => Promise<void>;

export const useFetch = <T>(url: string, options = {}): { data: T, isLoading: boolean, error: Error | undefined, doFetch: doFetchType } => {
	const [data, setData] = useState<T>({} as T);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>();

	const doFetch: doFetchType = async (overrideUrl = url, overrideOptions = options) => {
		try {
			setIsLoading(true);
			const response = await fetch(overrideUrl, overrideOptions);
			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, doFetch };
};
