export const fetchData = async (url: string, options?: Record<string, unknown>, returnErrorMessage = false): Promise<any>  => {
	let response, data;
	try {
		response = await fetch(url, options);
		data = await response.json();
	} catch (err: unknown) {
		const error = err as Error;
		console.error(error);
		return error;
	}

	if (response.status === 200 || response.status === 201) {
		return data;
	} else {
		const dataMessage = data.message || data.title;
		const error = new Error(dataMessage);
		const errorMessage = returnErrorMessage ? { error, dataMessage } : null;
		console.error(error);
		return errorMessage ?? error;
	}
};
