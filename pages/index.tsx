import { useEffect, useState, useCallback } from "react";
import Head from "next/head";

import { People } from "../types";
import Card from "../components/Card";
import useFetch from "../useFetch";

export default function Home() {
	const [people, setPeople] = useState<People[]>([]);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [page, setPage] = useState<string>("/people");
	useFetch({
		url: page,
		onSuccess: (data) => {
			if (!data) return;
			const { results, next } = data;
			setPeople((prev) => [...prev, ...results]);
			setNextPage(next);
		},
		onError: (e) => console.log(e),
	});

	const loadMore = () => nextPage && setPage(nextPage);

	return (
		<div className="wrapper">
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars Characters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="title">Star Wars Characters</h1>

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
		</div>
	);
}
