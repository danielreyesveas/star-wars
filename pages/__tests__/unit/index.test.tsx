import { render, screen, fireEvent, act } from "@testing-library/react";

import Home from "../../index";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { BASE_URL } from "../../../constants";

const successResponse = require("../fixtures/people/200.json");
const successResponseNoPagination = require("../fixtures/people/200-no-pagination.json");
const emptyResponse = { data: { results: [] } };

describe("Home", () => {
	let spy, url;
	let mock: any;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		mock.reset();
	});

	it("should render people list after fetching", async () => {
		url = `${BASE_URL}/people`;
		spy = jest.spyOn(mock, "onGet");
		mock.onGet(url).reply(200, successResponse);

		await act(async () => {
			render(<Home />);
		});

		expect(spy).toHaveBeenCalledTimes(1);

		expect(
			screen.getByRole("heading", { level: 2, name: /luke skywalker/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", { level: 2, name: /c-3po/i })
		).toBeInTheDocument();
	});

	it("should render load more button if there are next page available", async () => {
		url = `${BASE_URL}/people`;
		mock.onGet(url).reply(200, successResponse);

		await act(async () => {
			render(<Home />);
		});

		expect(
			screen.getByRole("button", { name: /load more/i })
		).toBeInTheDocument();
	});

	it("should not render load more button if there are not next page available", async () => {
		url = `${BASE_URL}/people`;
		mock.onGet(url).reply(200, successResponseNoPagination);

		await act(async () => {
			render(<Home />);
		});

		expect(
			screen.queryByRole("button", { name: /load more/i })
		).not.toBeInTheDocument();
	});

	it("should fetch again when load more button is pressed", async () => {
		url = `${BASE_URL}/people`;
		spy = jest.spyOn(mock, "onGet");
		mock.onGet(url).reply(200, successResponse);

		await act(async () => {
			render(<Home />);
		});

		expect(spy).toHaveBeenCalledTimes(1);

		const button = screen.getByRole("button", { name: /load more/i });

		url = `${BASE_URL}/people/?page=2`;
		spy = jest.spyOn(mock, "onGet");
		mock.onGet(url).reply(200, successResponseNoPagination);

		await act(async () => {
			fireEvent.click(button);
		});

		expect(spy).toHaveBeenCalledTimes(2);
	});
});
