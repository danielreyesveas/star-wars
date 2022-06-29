import { act, renderHook } from "@testing-library/react";

import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import useFetch from "../../useFetch";
import { BASE_URL } from "../../../constants";

describe("useFetch", () => {
	let spy, url;
	let mock: any;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		mock.reset();
	});

	it("should call axios with corresponding url", async () => {
		spy = jest.spyOn(mock, "onGet");
		url = `${BASE_URL}/URL`;
		mock.onGet(url).reply(200, { data: "DATA" });

		await act(async () => {
			renderHook(() => useFetch({ url: "/URL" }));
		});

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(url);
	});

	it("should bypass if url is not null", async () => {
		url = `${BASE_URL}/URL`;
		mock.onGet(url).reply(200, { data: "DATA" });
		spy = jest.spyOn(mock, "onGet");

		await act(async () => {
			renderHook(() => useFetch({ url: null }));
		});

		expect(spy).not.toHaveBeenCalled();
	});
});
