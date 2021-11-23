type CustomError = {
	error: Error;
	status: number;
}
type doFetchType = <T>(overrideUrl?: string, overrideOptions?: Record<string, unknown>) => Promise<T | CustomError>;

export const useFetch = (url: string, options = {}): doFetchType => {

	const doFetch: doFetchType = async (overrideUrl = url, overrideOptions = options) => {
		let response, data;

		try {
			response = await fetch(overrideUrl, overrideOptions);
			data = await response.json();
		} catch (err) {
			const error: Error = err;
			console.error(error);
			return { error, status: err.response };
		}

		if (response.status === 200 || response.status === 201) {
			return data;
		} else {
			const error = new Error(data.message || data.title);
			console.error(error);
			return { error, status: data.status };
		}
	};

	return doFetch;
};
