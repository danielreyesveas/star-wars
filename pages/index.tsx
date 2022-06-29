import { useState } from "react";
import Head from "next/head";

import { People, PeopleResponse } from "../types";
import { PEOPLE_ENDPOINT } from "../constants";

import Card from "../components/Card";
import useFetch from "../hooks/useFetch";

export default function Home() {
	const [people, setPeople] = useState<People[]>([]);
	const [error, setError] = useState(null);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [page, setPage] = useState<string>("/people");

	const onSuccess = (data: PeopleResponse) => {
		if (!data) return;
		const { results, next } = data;
		setPeople((prev) => [...prev, ...results]);
		setNextPage(next);
		setError(null);
	};

	useFetch({
		url: page,
		onSuccess,
		onError: (error) => setError(error),
	});

	const loadMore = () => nextPage && setPage(nextPage);

	const tryAgain = () => setPage(PEOPLE_ENDPOINT);

	return (
		<div className="wrapper">
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars Characters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="title">Star Wars Characters</h1>

			{error ? (
				<>
					<div className="error">
						Oops, something went wrong...
						<button onClick={tryAgain}>try again</button>
					</div>
				</>
			) : (
				<>
					<div className="cards-wrapper">
						{people.map((people, key) => (
							<Card character={people} key={key} />
						))}
					</div>
					{nextPage && (
						<div className="load_more_btn">
							<button onClick={loadMore}>Load More</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
