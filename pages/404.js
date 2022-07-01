// 404.js
import Head from "next/head";
import Link from "next/link";

import ErrorMessage from "../components/ErrorMessage";

export default function NotFound() {
	return (
		<div className="not-found">
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars Characters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ErrorMessage
				showButton={false}
				message="Look like you are lost..."
			/>

			<div className="not-found__button">
				<Link href="/">
					<button>back home</button>
				</Link>
			</div>
		</div>
	);
}
