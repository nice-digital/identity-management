import { useState, useEffect } from "react";

export const useFetch = <T>(url: string, options = {}) => {
	const [data, setData] = useState<T>({} as T);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>();

	const doFetch = async (overrideUrl = url, overrideOptions = options) => {
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
