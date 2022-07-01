import { Film } from "./types";

export const yearsFromNow = (birthday: string) => {
	var ageDifMs = Date.now() - new Date(birthday).getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970) + " years ago";
};

export const getFilmsDetails = (films: Film[], characterFilms: string[]) =>
	films.filter((item: Film) => characterFilms.includes(item.url));

export const timeout = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
