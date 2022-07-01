import Link from "next/link";

import { People } from "../../types";
import Birthday from "../Icons/Birthday";
import Films from "../Icons/Films";

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
						<p>
							<Films width={30} height={30} fill={"#3a2c1c"} />{" "}
							<span>{character.films.length}</span>
						</p>
						<p>
							<Birthday
								width={30}
								height={30}
								fill={"#3a2c1c"}
								className="card__info__birthday"
							/>
							<span>{character.birth_year}</span>
						</p>
					</div>
				</div>
				<button />
			</div>
		</Link>
	);
}
