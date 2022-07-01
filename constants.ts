const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://swapi.dev/api";
const PEOPLE_ENDPOINT = process.env.NEXT_PUBLIC_PEOPLE_ENDPOINT || "/people";
const FILMS_ENDPOINT = process.env.NEXT_PUBLIC_FILMS_ENDPOINT || "/films";
const DELAY = process.env.NEXT_PUBLIC_DELAY
	? process.env.NEXT_PUBLIC_DELAY === "true"
	: false;

const constants = {
	BASE_URL,
	PEOPLE_ENDPOINT,
	FILMS_ENDPOINT,
	DELAY,
};

export { BASE_URL, PEOPLE_ENDPOINT, FILMS_ENDPOINT, DELAY };

export default constants;
