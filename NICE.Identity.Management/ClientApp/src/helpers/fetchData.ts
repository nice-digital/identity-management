export const fetchData = async (url: string, options?: {}) => {
	let response, data;
	try {
		response = await fetch(url, options);
		if (response.body){
            data = await response.json();
        }
	} catch (err) {
		let error: Error = err;
		return error;
	}

	if (response.status === 200 || response.status === 201) {
		return data;
	} else {
		let error = new Error(data.message);
		return error;
	}
};
