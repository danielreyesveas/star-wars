import Head from "next/head";
import Image from "next/image";

import { useEffect, useState, useCallback } from "react";

import axios from "axios";

import { People, PeopleResponse } from "../types";
import Card from "../components/Card";

import styles from "../styles/Home.module.css";

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
		<div className={styles.container}>
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Star Wars</h1>

				<div>
					{people.map((people, key) => (
						<Card character={people} key={key} />
					))}
				</div>
				{nextPage && (
					<div>
						<button onClick={loadMore}>Load More</button>
					</div>
				)}
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
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
