import Head from "next/head";
import Image from "next/image";

import { useEffect, useState, useCallback } from "react";

import axios from "axios";

import { People, PeopleResponse } from "../types";
import Card from "../components/Card";

export default function Home() {
	const [people, setPeople] = useState<People[]>([]);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [page, setPage] = useState<string>("/people");

	// Prevent infinite loop as useEffect dependency
	const fetchPeople = useCallback(async () => {
		let res: PeopleResponse;

		try {
			res = await axios.get(page);
		} catch (e) {
			throw new Error(e);
		}

		const {
			data: { results, next },
		} = res;

		setPeople((prev) => [...prev, ...results]);
		setNextPage(next);
	}, [page]);

	const loadMore = () => nextPage && setPage(nextPage);

	useEffect(() => {
		if (page) fetchPeople();
	}, [page, fetchPeople]);

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
				<div>
					<button className="btn" onClick={loadMore}>
						Load More
					</button>
				</div>
			)}

			<footer className="footer">
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className="footer__logo">
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
