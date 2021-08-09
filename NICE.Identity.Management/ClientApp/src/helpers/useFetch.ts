import { useState, useEffect } from "react";

export const useFetch = <T>(url: string, options = {}) => {
	const [data, setData] = useState<T>({} as T);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(url, options);
				const data = await response.json();
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		
		fetchData();
	}, []);

	return { data, isLoading, error };
};
