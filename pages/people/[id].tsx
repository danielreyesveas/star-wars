import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { People, Film } from "../../types";
import useFetch from "../../useFetch";

dayjs.extend(relativeTime);

export default function PeopleComponent() {
	const router = useRouter();
	const [character, setCharacter] = useState<People | null>(null);
	const [films, setFilms] = useState<Film[] | null>(null);
	const [url, setURL] = useState<string | null>(null);
	const { id } = router.query;

	// Fetch character
	useFetch({
		url,
		onSuccess: (data) => data && setCharacter(data),
		onError: (e) => console.log(e),
	});

	// Fetch films
	useFetch({
		url: "films",
		onSuccess: (data) => data && setFilms(data.results),
		onError: (e) => console.log(e),
	});

	useEffect(() => {
		if (character && films) {
			if (!!character.films_details) return;

			const filmsDetails = films.filter((item: Film) =>
				character.films.includes(item.url)
			);

			setCharacter({ ...character, films_details: filmsDetails });
		}
	}, [character, films]);

	useEffect(() => {
		id && setURL(`people/${id}`);
	}, [id]);

	return (
		<div className="details">
			{character && (
				<div className="details__wrapper">
					<div className="details__main">
						<Link href="/">{backArrow()}</Link>

						<div className="details__name">
							<p>{character.name}</p>
						</div>
						<div className="details__body">
							<p>
								Height: <span>{character.height}</span>
							</p>
							<p>
								Mass: <span>{character.mass}</span>
							</p>
							<p>
								Hair Color: <span>{character.hair_color}</span>
							</p>
							<p>
								Skin Color: <span>{character.skin_color}</span>
							</p>
							<p>
								Eye Color: <span>{character.eye_color}</span>
							</p>
							<p>
								Birth Year: <span>{character.birth_year}</span>
							</p>
							<p>
								Gender: <span>{character.gender}</span>
							</p>
						</div>
						<div className="details__films">
							<p className="details__films__title">
								{character.films.length} Films
							</p>
							<div className="details__films__list">
								{character.films_details?.map((item, key) => (
									<p key={key}>
										{item.title}:{" "}
										{dayjs(item.release_date).fromNow()}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function backArrow() {
	return (
		<p className="details__back">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50"
				height="25"
				fill="none"
				viewBox="50 0 100 100"
			>
				<path
					fill="#596DD0"
					d="M44.084 40.947c8.027 4.692 14.153 8.318 20.068 11.73 2.112 1.28 4.225 2.346 6.126 3.839 2.746 1.919 6.548 4.052 4.436 8.104-2.112 3.839-6.126 2.132-9.083 1.066-3.169-.853-6.337-2.56-9.295-4.052-13.73-6.611-27.46-13.436-40.98-20.26-3.591-1.92-7.394-3.626-10.562-6.185-6.76-5.118-6.337-10.237 1.056-14.076 9.928-5.118 20.068-9.81 30.207-14.502C40.282 4.48 44.718 2.346 49.154.853 51.689 0 54.646.213 57.392 0c.845 5.971-2.535 7.251-5.492 8.744-7.393 4.052-14.998 7.89-22.391 11.943-2.535 1.493-5.281 2.986-7.816 6.398 3.802.426 7.393 1.066 11.196 1.28 28.517 1.492 56.823 2.985 85.34 4.478 41.403 2.133 82.595 4.265 123.998 6.611 3.38.214 6.759 1.493 10.773 2.56-3.802 5.758-8.238 4.478-11.829 4.265-20.279-.427-40.77-1.28-61.049-1.92l-131.18-4.478c-1.055.213-1.69.426-4.858 1.066z"
				></path>
			</svg>
		</p>
	);
}
