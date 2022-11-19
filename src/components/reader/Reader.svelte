<script>
	import { _ } from "svelte-i18n";
	import linkifyStr from "linkify-string";
	import { readerResult } from "../../store";
	import FromClipboard from "./FromClipboard.svelte";
	import FromInput from "./FromInput.svelte";
	import FromCamera from "./FromCamera.svelte";
	import CopyIcon from "../../icons/Copy.svelte";
	import CloseIcon from "../../icons/Close.svelte";

	let result;

	readerResult.subscribe((rresult) => (result = rresult));
	$: readerResult.set(result);

	const linkifyOption = {
		rel: "nofollow noreferrer noopener",
		target: "_blank",
	};

	let scanFromClipboard;
</script>

<main on:paste={scanFromClipboard}>
	{#if result}
		<div class="result">
			{#await result}
				<p>{$_("reading_now")}</p>
			{:then reading_result}
				<dl>
					<dt>{$_("read_result")}</dt>
					<dd>{@html linkifyStr(reading_result, linkifyOption)}</dd>
				</dl>
				<div class="buttons">
					<button
						aria-label={$_("copy")}
						title={$_("copy")}
						on:click={() => {
							navigator.clipboard.writeText(reading_result);
						}}>
						<span class="icon"><CopyIcon /></span>
					</button>
					<button
						aria-label={$_("close")}
						title={$_("close")}
						on:click={() => {
							result = undefined;
						}}>
						<span class="icon"><CloseIcon /></span></button>
				</div>
			{:catch error}
				<p>{$_("read_failed")}</p>
				<div class="buttons">
					<button
						aria-label={$_("close")}
						title={$_("close")}
						on:click={() => {
							result = undefined;
						}}>
						<span class="icon-v"><CloseIcon /></span></button>
				</div>
			{/await}
		</div>
	{/if}

	<FromClipboard bind:result bind:scanFromClipboard />
	<FromInput bind:result />
	<FromCamera bind:result />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 2em;
		padding: 1rem 2%;

		overflow-y: auto;
	}

	.result {
		background-color: var(--quaternary);
		color: var(--quaternary-text);
		fill: var(--quaternary-text);
		border: solid var(--quaternary-border) 2px;
		border-radius: 0.5rem;
		padding: 1rem 2%;
		position: relative;
		min-height: 0;

		animation: fadein 0.5s linear 0s 1 normal;
	}

	.result dl {
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.result dt,
	.result p {
		margin: 0;
		font-weight: bold;
		min-height: 2rem;
	}

	.result dd {
		margin: 0;
		word-break: break-all;
		min-height: 0;
	}

	.result .buttons {
		position: absolute;
		right: 2%;
		top: 1rem;
		display: flex;
		flex-direction: row;
	}

	.result button {
		flex-shrink: 0;
		width: 2rem;
		aspect-ratio: 1/1;
		max-width: 50vw;
		border-radius: 0.5rem;
		background-color: transparent;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		height: 75%;
		width: 75%;
	}
</style>
