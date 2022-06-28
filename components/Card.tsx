import React from "react";
import { People } from "../types";
import Link from "next/link";

type CardProps = {
	character: People;
};

export default function Card({ character, ...props }: CardProps) {
	const id = character.url.split("/api").splice(-1).toString();

	return (
		<div {...props}>
			<Link href={id}>
				<h2>{character.name}</h2>
			</Link>

			<p>
				{character.films.length} films birth year:{" "}
				{character.birth_year}
			</p>
		</div>
	);
}
