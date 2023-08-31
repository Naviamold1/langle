import { browser } from '$app/environment';
import { languages } from '../languages';
import { canGuess, correctLanguage, guessIndex, lastSetDate, userGuessArray } from './gameStores';

function loadCurrentLanguage() {
	if (browser) {
		const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
		lastSetDate.set(new Date().toISOString().split('T')[0]);
		return correctLanguage.set(randomLanguage);
	}
}

export function addGuess(guess: string) {
	if (browser) {
		languages.filter((value) => {
			if (value.name !== guess) return;
		});
		userGuessArray.update((value) => [...value, guess]);
		guessIndex.update((val) => val + 1);
	}
}

function initGame() {
	if (browser) {
		// Check if the user has guessed today
		const today = new Date().toISOString().split('T')[0];
		lastSetDate.subscribe((value) => {
			userGuessArray.subscribe((arr) => {
				if (value.split('T')[0] === today && arr.length >= 5) {
					canGuess.set(false); // User has already guessed today
				}
			});
			if (value.split('T')[0] !== today) {
				console.log(value.split('T')[0], today);
				loadCurrentLanguage();
			}
		});
	}
}

initGame();
