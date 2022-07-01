import { useState } from "react";
import Head from "next/head";

import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

import { People, PeopleResponse } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { PEOPLE_ENDPOINT } from "../constants";

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

	const { loading } = useFetch({
		url: page,
		onSuccess,
		onError: (error) => setError(error),
		delay: 600,
	});

	const loadMore = () => nextPage && setPage(nextPage);

	const fetchError = () => setPage("/people/?page=500");

	const tryAgain = () => setPage(PEOPLE_ENDPOINT);

	return (
		<div className="home">
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars Characters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="home__title">Star Wars Characters</h1>

			{error ? (
				<div className="home__error">
					<ErrorMessage
						textStyle={{ fontSize: "2rem" }}
						iconStyles={{ width: "70", height: "70" }}
						buttonStyles={{ width: "7rem", fontSize: "1.5rem" }}
						onClick={tryAgain}
					/>
				</div>
			) : (
				<>
					<div className="home__wrapper">
						{people.map((people, key) => (
							<Card character={people} key={key} />
						))}
					</div>

					{nextPage && (
						<div className="home__more">
							<button onClick={loadMore}>Load More</button>
						</div>
					)}
				</>
			)}

			<div className="home__error-button">
				{!loading && <button onClick={fetchError}>Error</button>}
			</div>
		</div>
	);
}
