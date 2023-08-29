import { writable } from 'svelte/store';
import { languages } from './languages';
import type { Language } from '../types/language';

export const correctLanguage = writable<Language>();
export const userGuessArray = writable<string[]>([]);
export const guessIndex = writable(0);

export async function loadCurrentLanguage() {
	const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
	correctLanguage.set(randomLanguage);
}

export function addGuess(guess: string) {
	userGuessArray.update((value) => [...value, guess]);
	guessIndex.update((val) => val + 1);

	// setAndSaveUserGuessesArray(loadUserGuessArray());
}

// function loadUserGuessArray() {
// 	const localGuess = localStorage.getItem('guesses');
// 	try {
// 		if (!localGuess) return [];
// 		return JSON.parse(localGuess);
// 	} catch (err) {
// 		return [];
// 	}
// }

// function setAndSaveUserGuessesArray(guesses: string[]) {
// 	userGuessArray.set(guesses);
// 	localStorage.setItem('guesses', JSON.stringify(guesses));
// }

loadCurrentLanguage();
