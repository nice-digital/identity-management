import { useCallback, useState } from "react";

type doFetchType = <T>(overrideUrl?: string, overrideOptions?: Record<string, unknown>) => Promise<T | Error>;

export const useFetch = (url: string, options = {}): doFetchType => {

	const doFetch: doFetchType = async (overrideUrl = url, overrideOptions = options) => {
		let response, data;

		try {
			response = await fetch(overrideUrl, overrideOptions);
			data = await response.json();
		} catch (err) {			
			const error: Error = err;
			console.error(error);
			return error;
		}

		if (response.status === 200 || response.status === 201) {
			return data;
		} else {
			// need to change this to use the data
			const error = new Error("Multiple users found with same email address.");
			console.error(error);
			return error;
		}
	};

	return doFetch;
};
