import React from "react";
import { People } from "../types";
import Link from "next/link";

type CardProps = {
	id: number;
	character: People;
};

export default function Card({ character, id, ...props }: CardProps) {
	return (
		<div {...props}>
			<Link href={`/character/${id}`}>
				<h2>{character.name}</h2>
			</Link>

			<p>
				{character.films.length} films birth year:{" "}
				{character.birth_year}
			</p>
		</div>
	);
}
