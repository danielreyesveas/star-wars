import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import Home from "../../index";
import "@testing-library/jest-dom";

jest.mock("axios"); // This overwrites axios methods with jest Mock
import axios from "axios";

const successResponse = require("../fixtures/people/200.json");
const successResponseNoPagination = require("../fixtures/people/200-no-pagination.json");
const emptyResponse = { data: { results: [] } };

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home", () => {
	afterEach(() => {
		mockedAxios.get.mockClear();
	});

	it("should render people list after fetching", async () => {
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(successResponse)
		);

		await act(async () => {
			render(<Home />);
		});

		expect(mockedAxios.get).toHaveBeenCalledTimes(1);

		expect(
			screen.getByRole("heading", { level: 2, name: /luke skywalker/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", { level: 2, name: /c-3po/i })
		).toBeInTheDocument();
	});

	it("should render load more button if there are next page available", async () => {
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(successResponse)
		);

		await act(async () => {
			render(<Home />);
		});

		expect(
			screen.getByRole("button", { name: /load more/i })
		).toBeInTheDocument();
	});

	it("should not render load more button if there are not next page available", async () => {
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(successResponseNoPagination)
		);

		await act(async () => {
			render(<Home />);
		});

		expect(
			screen.queryByRole("button", { name: /load more/i })
		).not.toBeInTheDocument();
	});

	it("should fetch again when load more button is pressed", async () => {
		mockedAxios.get.mockImplementation(() =>
			Promise.resolve(successResponse)
		);

		await act(async () => {
			render(<Home />);
		});

		expect(mockedAxios.get).toHaveBeenCalledTimes(1);

		mockedAxios.get.mockImplementation(() =>
			Promise.resolve(successResponseNoPagination)
		);

		const button = screen.getByRole("button", { name: /load more/i });

		await act(async () => {
			fireEvent.click(button);
		});

		expect(mockedAxios.get).toHaveBeenCalledTimes(2);
	});
});
