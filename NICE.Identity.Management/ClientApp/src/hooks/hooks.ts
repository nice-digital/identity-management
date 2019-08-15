import { useState, useEffect } from "react";

type User = {
	_id: string;
	name: string;
	email: string;
};

export function useFetch(url: string): [Array<User>, boolean] {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function fetchUrl() {
		const response = await fetch(url);
		const json = await response.json();
		setData(json);
		setIsLoading(false);
	}

	// https://reactjs.org/docs/hooks-effect.html
	useEffect(() => {
		fetchUrl(); // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument
	});

	return [data, isLoading];
}
