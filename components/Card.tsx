import React from "react";
import Link from "next/link";

import { People } from "../types";

type CardProps = {
	character: People;
};

export default function Card({ character, ...props }: CardProps) {
	const id = character.url.split("/api").splice(-1).toString();

	return (
		<div {...props} className="card">
			<div className="card__body">
				<Link href={id}>
					<p className="card__name">{character.name}</p>
				</Link>
				<div className="card__info">
					<span>{character.films.length} films</span>
					<span>birth year: {character.birth_year}</span>
				</div>
			</div>
		</div>
	);
}
