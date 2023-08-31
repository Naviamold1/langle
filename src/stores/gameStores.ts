import { persistentWritable } from '$lib/persistentStore';
import { writable } from 'svelte/store';
import type { Language } from '../types/language';

export const correctLanguage = persistentWritable<Language>('correctLanguage', {
	name: '',
	recording: ''
});
export const userGuessArray = persistentWritable<string[]>('guesses', []);
export const guessIndex = persistentWritable('guessIndex', 0);
export const lastSetDate = persistentWritable('lastSetDate', '');
export const canGuess = writable(true);
