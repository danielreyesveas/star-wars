import { useState, useEffect } from "react";
import { usePageLoader } from "../contexts/page-loader.context";

interface RequestProps {
	url: string | null;
	loader?: boolean;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
}
import axios from "axios";
import { BASE_URL } from "../constants";

axios.defaults.baseURL = BASE_URL;

const useFetch = ({ url, onSuccess, onError, loader = true }: RequestProps) => {
	const { setShowLoader } = usePageLoader();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return;

		const fetchApi = async () => {
			loader && setShowLoader(true);
			setLoading(true);
			try {
				const { data: response } = await axios.request({ url });

				onSuccess && onSuccess(response);
				setData(response);
			} catch (e) {
				console.error(`Error ${e}`);
				onError && onError(e);
			} finally {
				setLoading(false);
				loader && setShowLoader(false);
			}
		};
		fetchApi();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { loading, data };
};
export default useFetch;
