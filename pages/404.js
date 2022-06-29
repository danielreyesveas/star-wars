// 404.js
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="error-wrapper">
			<Head>
				<title>Star Wars</title>
				<meta name="description" content="Star Wars Characters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="error">
				Look like you are lost...
				<Link href="/">
					<button>back home</button>
				</Link>
			</div>
		</div>
	);
}
