import "../styles/_globals.scss";
import { AppProps } from "next/app";

import PageLoader from "../components/PageLoader";
import { PageLoaderProvider } from "../contexts/page-loader.context";

function App({ Component, pageProps }: AppProps) {
	return (
		<PageLoaderProvider>
			<PageLoader />
			<Component {...pageProps} />
		</PageLoaderProvider>
	);
}

export default App;
