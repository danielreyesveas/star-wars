export interface Film {
	created: string;
	director: string;
	episode_id: string;
	title: string;
	url: string;
	release_date: string;
}

export interface People {
	birth_year: string;
	eye_color: string;
	films: string[];
	films_details: Film[];
	gender: string;
	hair_color: string;
	height: string;
	mass: string;
	name: string;
	skin_color: string;
	url: string;
}

export interface PeopleResponse {
	previous: string | null;
	next: string | null;
	results: People[];
}

export interface CharacterResponse {
	data: People;
}
