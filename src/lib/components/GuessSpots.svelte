<script lang="ts">
	import { guessIndex, userGuessArray } from '../../stores/gameStores';
</script>

<div class="grid gap-2">
	{#each { length: 5 } as _, i}
		<div
			class="col-span-7 transition-all duration-300 mb-0 h-8 w-96 bg-gray-200 border-slate-300 bg-opacity-50 dark:bg-opacity-50 border-dashed dark:bg-slate-700 dark:border-slate-700 border rounded flex justify-center items-center"
		>
			{#if $guessIndex >= i + 1}
				<div
					class="bg-transparent mb-0 h-8 w-96 border-slate-600 border-dashed border rounded flex justify-center items-center"
				>
					<span>
						{$userGuessArray[i]}
					</span>
				</div>
			{/if}
		</div>
	{/each}
</div>
