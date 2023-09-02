<script lang="ts">
	import { guessIndex, userGuessArray } from '../../stores/gameStores';
</script>

<div class="grid gap-2">
	{#each { length: 5 } as _, i}
		<div
			class="col-span-7 mb-0 flex h-8 w-96 items-center justify-center rounded border border-dashed border-slate-300 bg-gray-200 bg-opacity-50 transition-all duration-300 dark:border-slate-700 dark:bg-slate-700 dark:bg-opacity-50"
		>
			{#if $guessIndex >= i + 1}
				<div
					class="mb-0 flex h-8 w-96 items-center justify-center rounded border border-dashed border-slate-600 bg-transparent"
				>
					<span>
						{$userGuessArray[i]}
					</span>
				</div>
			{/if}
		</div>
	{/each}
</div>
