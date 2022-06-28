import React from "react";
import Link from "next/link";

import { People } from "../types";

type CardProps = {
	character: People;
};

export default function Card({ character, ...props }: CardProps) {
	const id = character.url.split("/api").splice(-1).toString();

	return (
		<Link href={id}>
			<div {...props} className="card">
				<div className="card__body">
					<h2 className="card__name">{character.name}</h2>
					<div className="card__info">
						<span>{character.films.length} films</span>
						<span>birth year: {character.birth_year}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
