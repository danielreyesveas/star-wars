import { useState, useEffect } from "react";
import { usePageLoader } from "../contexts/page-loader.context";

import axios from "axios";
import { timeout } from "../utils";
import { BASE_URL, DELAY } from "../constants";

interface RequestProps {
	url: string | null;
	loader?: boolean;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	delay?: number;
}

axios.defaults.baseURL = BASE_URL;

const useFetch = ({
	url,
	onSuccess,
	onError,
	loader = true,
	delay = 100,
}: RequestProps) => {
	const { setShowLoader } = usePageLoader();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return;

		const fetchApi = async () => {
			loader && setShowLoader(true);
			setLoading(true);
			setError(null);

			try {
				const { data: response } = await axios.request({ url });

				DELAY && (await timeout(delay));

				onSuccess && onSuccess(response);
				setData(response);
			} catch ({ message }) {
				setError(message);
				onError && onError(message);
			} finally {
				setLoading(false);
				loader && setShowLoader(false);
			}
		};
		fetchApi();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { loading, data, error };
};
export default useFetch;
