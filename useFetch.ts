import { useState, useEffect } from "react";

interface RequestProps {
	url: string | null;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
}
import axios from "axios";
import { BASE_URL } from "./constants";

axios.defaults.baseURL = BASE_URL;

const useFetch = ({ url, onSuccess, onError }: RequestProps) => {
	useEffect(() => {
		if (!url) return;

		const fetchApi = async () => {
			try {
				const { data: response } = await axios.request({ url });

				onSuccess && onSuccess(response);
			} catch (e) {
				console.error(`Error ${e}`);
				onError && onError(e);
			}
		};
		fetchApi();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);
};
export default useFetch;
