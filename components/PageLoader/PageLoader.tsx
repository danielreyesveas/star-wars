import { usePageLoader } from "../../contexts/page-loader.context";
import Spinner from "../Spinner";

const PageLoader = () => {
	const { showLoader } = usePageLoader();
	return showLoader ? (
		<div data-testid="page-loader" className="loader">
			<div className="loader__container">
				<Spinner className="spinner" />
			</div>
		</div>
	) : null;
};

export default PageLoader;
