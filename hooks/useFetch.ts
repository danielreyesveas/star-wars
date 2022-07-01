import { useState, useEffect } from "react";
import { usePageLoader } from "../contexts/page-loader.context";

interface RequestProps {
	url: string | null;
	loader?: boolean;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	delay?: number;
}
import axios from "axios";
import { BASE_URL, DELAY } from "../constants";

axios.defaults.baseURL = BASE_URL;

// Function to delay the fetch (to display spinner)
function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const useFetch = ({
	url,
	onSuccess,
	onError,
	loader = true,
	delay,
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

				delay && (await timeout(delay * DELAY));

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
