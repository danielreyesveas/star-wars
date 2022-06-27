import Link from "next/link";
import { useRouter } from "next/router";

import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { People, Film } from "../../types";

dayjs.extend(relativeTime);

export default function Character() {
	const router = useRouter();
	const [character, setCharacter] = useState<People | null>(null);
	const { id } = router.query;

	const fetchCharacter = useCallback(async () => {
		if (!id) return;

		try {
			const res = await axios.get(`/people/${id}`);
			const { data: character } = res;

			// get films to attatch the character films prop
			const {
				data: { results: films },
			} = await axios.get(`/films`);

			const filmsDetails = films.filter((item: Film) =>
				character.films.includes(item.url)
			);

			setCharacter({ ...character, films_details: filmsDetails });
		} catch (e) {
			throw new Error(e);
		}
	}, [id]);

	useEffect(() => {
		fetchCharacter();
	}, [id, fetchCharacter]);

	return (
		<div>
			{character && (
				<>
					<div>
						<p>Name: {character.name}</p>
						<p>Height: {character.height}</p>
						<p>Mass: {character.mass}</p>
						<p>Hair Color: {character.hair_color}</p>
						<p>Skin Color: {character.skin_color}</p>
						<p>Eye Color: {character.eye_color}</p>
						<p>Birth Year: {character.birth_year}</p>
						<p>Gender: {character.gender}</p>
					</div>
					<div>
						<p>{character.films.length} Films</p>
						{character.films_details.map((item, key) => (
							<p key={key}>
								{item.title}: {dayjs(item.created).fromNow()}
							</p>
						))}
					</div>
				</>
			)}
			<Link href="/">
				<button>Back</button>
			</Link>
		</div>
	);
}
