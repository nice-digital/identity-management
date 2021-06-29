export const fetchData = async (url: string, options?: Record<string, unknown>): Promise<any>  => {
	let response, data;
	try {
		response = await fetch(url, options);
		data = await response.json();
	} catch (err) {
		console.error(err);
		const error: Error = err;
		return error;
	}

	if (response.status === 200 || response.status === 201) {
		return data;
	} else {
		const error = new Error(data.message);
		console.error(error);
		return error;
	}
};
