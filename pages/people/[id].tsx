import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";

import { getFilmsDetails, yearsFromNow } from "../../utils";
import { FILMS_ENDPOINT, PEOPLE_ENDPOINT } from "../../constants";
import { People, Film } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import BackArrow from "../../components/Icons/BackArrow";

export default function PeopleComponent() {
	const router = useRouter();

	const [character, setCharacter] = useState<People | null>(null);
	const [characterUrl, setCharacterURL] = useState<string | null>(null);

	const [films, setFilms] = useState<Film[] | null>(null);
	const [filmsUrl, setFilmsUrl] = useState<string | null>(FILMS_ENDPOINT);

	const [error, setError] = useState<string | null>(null);
	const { id } = router.query;

	// Fetch character
	const { error: charactersError } = useFetch({
		url: characterUrl,
		onSuccess: (data) => data && setCharacter(data),
		delay: 400,
	});

	// Fetch films
	const { loading, error: filmsError } = useFetch({
		url: filmsUrl,
		onSuccess: (data) => data && setFilms(data.results),
		loader: false,
		delay: 800,
	});

	useEffect(() => {
		if (character && films) {
			if (!!character.films_details) return;

			const filmsDetails = getFilmsDetails(films, character.films);

			setCharacter({ ...character, films_details: filmsDetails });
		}
	}, [character, films]);

	// setError if any fetch fails
	useEffect(() => {
		if (charactersError || filmsError) setError("Error");
		else setError(null);
	}, [charactersError, filmsError]);

	useEffect(() => {
		id && setCharacterURL(`${PEOPLE_ENDPOINT}/${id}`);
	}, [id]);

	const fetchError = () => setCharacterURL(`${PEOPLE_ENDPOINT}/500`);

	const tryAgain = () => {
		setCharacterURL(`${PEOPLE_ENDPOINT}/${id}`);
		setFilmsUrl(FILMS_ENDPOINT);
	};

	return (
		<div className="details">
			<div className="details__wrapper">
				{error ? (
					<div className="details__error">
						<ErrorMessage
							textStyle={{ fontSize: "2rem" }}
							iconStyles={{ width: "70", height: "70" }}
							buttonStyles={{ width: "7rem", fontSize: "1.5rem" }}
							onClick={tryAgain}
						/>
					</div>
				) : (
					character && (
						<div className="details__main">
							<Link href="/">
								<p className="details__back">
									<BackArrow
										width={50}
										height={25}
										fill="#bd3e6a"
									/>
									<span>back to main list</span>
								</p>
							</Link>

							<div className="details__name">
								<p>{character.name}</p>
							</div>
							<div className="details__body">
								<p>
									Height: <span>{character.height}cm</span>
								</p>
								<p>
									Gender: <span>{character.gender}</span>
								</p>
								<p>
									Mass: <span>{character.mass}Kg</span>
								</p>
								<p>
									Hair Color:{" "}
									<span>{character.hair_color}</span>
								</p>
								<p>
									Eye Color:{" "}
									<span>{character.eye_color}</span>
								</p>
								<p>
									Skin Color:{" "}
									<span>{character.skin_color}</span>
								</p>

								<p>
									Birth Year:{" "}
									<span>{character.birth_year}</span>
								</p>
							</div>
							{character && (
								<div className="details__films">
									<p className="details__films__title">
										{character.films.length} Films
									</p>
									<div className="details__films__list">
										{loading ? (
											<Spinner
												width={50}
												height={50}
												className="spinner"
											/>
										) : (
											character?.films_details?.map(
												(item, key) => (
													<p key={key}>
														{item.title}:{" "}
														<span>
															{yearsFromNow(
																item.release_date
															)}
														</span>
													</p>
												)
											)
										)}
									</div>
								</div>
							)}
						</div>
					)
				)}
			</div>

			<div className="details__error-button">
				{character && !loading && (
					<button onClick={fetchError}>Error</button>
				)}
			</div>
		</div>
	);
}
