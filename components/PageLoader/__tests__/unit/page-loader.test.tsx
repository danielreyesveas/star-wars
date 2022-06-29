import { render as rtlRender, screen } from "@testing-library/react";

import PageLoader from "../../PageLoader";
import {
	PageLoaderContext,
	PageLoaderProvider,
} from "../../../../contexts/page-loader.context";

const render = (ui: React.ReactElement, { value }: { value: any }) =>
	rtlRender(ui, {
		wrapper: ({ children }) => (
			<PageLoaderContext.Provider value={value}>
				{children}
			</PageLoaderContext.Provider>
		),
	});

describe("PageLoader", () => {
	it("should render Page Loader if showLoader value in context is true", () => {
		const value = { showLoader: true };

		render(<PageLoader />, { value });

		const pageLoader = screen.getByTestId("page-loader");

		expect(pageLoader).toBeInTheDocument();
	});

	it("should not render Page Loader if showLoader value in context is true", () => {
		rtlRender(<PageLoader />, { wrapper: PageLoaderProvider });

		const pageLoader = screen.queryByTestId("page-loader");

		expect(pageLoader).not.toBeInTheDocument();
	});
});
