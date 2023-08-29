<script lang="ts">
	import type { PageData } from './$types';
	import type { Language } from '../types/language';
	import { addGuess, guessIndex, userGuessArray, correctLanguage } from './game';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { languages } from './languages';
	// @ts-ignore
	import Svelecte from 'svelecte';
	import { CheckCircle2, XCircle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';

	// export let data: PageData;

	let guess = '';

	$: isInputDisabled = false;
	$: isButtonDisabled = false;

	async function inputDisable(type: 'input' | 'button' | 'both') {
		if (type === 'input') {
			isInputDisabled = true;
		} else if (type === 'button') {
			isButtonDisabled = true;
		} else if (type === 'both') {
			isInputDisabled = true;
			isButtonDisabled = true;
		}
	}

	$: console.log(guess);

	console.log($correctLanguage);
</script>

<div>
	<div class="flex flex-col items-center justify-center gap-20 m-10">
		{#if $userGuessArray.slice(-1).toString() === $correctLanguage.name}
			{#await inputDisable('both') then}
				<Alert.Root class="bg-green-600 flex justify-center content-center w-96">
					<CheckCircle2 class="h-4 w-4" />
					<Alert.Title><strong>{$correctLanguage.name}</strong> Correct!</Alert.Title>
				</Alert.Root>
			{/await}
		{/if}
		{#if $userGuessArray.length >= 5}
			{#await inputDisable('both') then}
				<Alert.Root class="bg-red-600 flex justify-center content-center w-96">
					<XCircle class="h-4 w-4" />
					<Alert.Title
						>Ran out of attempts! It was <strong>{$correctLanguage.name}</strong></Alert.Title
					>
				</Alert.Root>
			{/await}
		{/if}
	</div>
	<div class="flex flex-col items-center justify-center gap-20 m-10">
		<div>
			<audio controls controlslist="nodownload" src={$correctLanguage.recording} />
		</div>
		<div class="grid gap-2">
			{#each { length: 5 } as _, i}
				<div
					class="col-span-7 transition-all duration-300 mb-0 h-8 w-96 bg-gray-200 border-slate-300 bg-opacity-50 dark:bg-opacity-50 border-dashed dark:bg-slate-700 dark:border-slate-700 border rounded flex justify-center items-center"
				>
					{#if $guessIndex >= i + 1}
						<span class="opacity-70">{$userGuessArray[i]}</span>
					{/if}
				</div>
			{/each}
		</div>
		<div>
			<form
				class="flex w-full max-w-sm items-center space-x-2"
				on:submit|preventDefault={() => addGuess(guess)}
			>
				<Svelecte
					options={languages}
					selectOnTab={'true'}
					clearable={'true'}
					disabled={isInputDisabled}
					type="text"
					name="languageInput"
					id="linput"
					spellcheck="true"
					placeholder="Guess the language..."
					class="flex-auto svelecte-control w-80 !text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					bind:value={guess}
					required
				/>

				<Button type="submit" disabled={isButtonDisabled}>Submit</Button>
			</form>
		</div>
	</div>
</div>
