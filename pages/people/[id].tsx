import Link from "next/link";
import { useRouter } from "next/router";

import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { People, Film } from "../../types";

dayjs.extend(relativeTime);

export default function PeopleComponent() {
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
		<div className="details">
			{character && (
				<div className="details__wrapper">
					<div className="details__main">
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
								{character.films_details.map((item, key) => (
									<p key={key}>
										{item.title}:{" "}
										{dayjs(item.created).fromNow()}
									</p>
								))}
							</div>
						</div>
						<Link href="/">
							<button>Back</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
