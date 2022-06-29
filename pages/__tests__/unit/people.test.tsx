import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/router";

import People from "../../people/[id]";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { BASE_URL } from "../../../constants";

jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "",
			pathname: "",
			query: { id: 1 },
			asPath: "",
		};
	},
}));

const successResponsePeople = require("../fixtures/people/200-details.json");
const successResponseFilms = require("../fixtures/films/200.json");

describe("People", () => {
	let spy, url;
	let mock: any;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		mock.reset();
	});

	it("should render people detail after fetching", async () => {
		url = `${BASE_URL}/people/1`;
		spy = jest.spyOn(mock, "onGet");
		mock.onGet(url).reply(200, successResponsePeople);
		url = `${BASE_URL}/films`;
		mock.onGet(url).reply(200, successResponseFilms);

		await act(async () => {
			render(<People />);
		});

		expect(spy).toHaveBeenCalledTimes(2);

		expect(screen.getByText(/luke skywalker/i));

		screen.debug();
	});

	it("should render try again button if fetch character fails, and fetch again on click on it", async () => {
		url = `${BASE_URL}/people/1`;
		mock.onGet(url).reply(500, { message: "" });
		url = `${BASE_URL}/films`;
		mock.onGet(url).reply(200, successResponseFilms);

		await act(async () => {
			render(<People />);
		});

		const button = screen.getByRole("button", { name: /try again/i });

		expect(button).toBeInTheDocument();
	});

	it("should render try again button if fetch films fails, and fetch again on click on it", async () => {
		url = `${BASE_URL}/people/1`;
		mock.onGet(url).reply(200, successResponsePeople);
		url = `${BASE_URL}/films`;
		mock.onGet(url).reply(500, { message: "" });

		await act(async () => {
			render(<People />);
		});

		const button = screen.getByRole("button", { name: /try again/i });

		expect(button).toBeInTheDocument();
	});
});
