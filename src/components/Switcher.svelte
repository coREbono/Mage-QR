<script>
	import { _ } from "svelte-i18n";
	import QrReaderIcon from "../icons/QrReader.svelte";
	import QrMakerIcon from "../icons/QrMaker.svelte";
	import Reader from "./reader/Reader.svelte";
	import Maker from "./maker/Maker.svelte";

	export let mode = Reader;
</script>

<nav role="tablist">
	<button
		role="tab"
		class="reader"
		on:click={() => {
			mode = Reader;
		}}
		class:selecting={mode === Reader}>
		<span class="icon"><QrReaderIcon /></span>
		<span>{$_("qr_reader")}</span>
	</button>
	<button
		role="tab"
		class="maker"
		on:click={() => {
			mode = Maker;
		}}
		class:selecting={mode === Maker}>
		<span class="icon"><QrMakerIcon /></span>
		<span>{$_("qr_maker")}</span>
	</button>
</nav>

<style>
	nav {
		display: flex;
		height: 100%;
		flex-wrap: nowrap;
		justify-content: space-evenly;
	}

	button {
		height: 100%;
		display: flex;
		font-weight: normal;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		align-items: center;
		font-size: 1rem;
		max-width: 50%;
		padding: 0 1em;
		border-radius: 1rem;
	}

	span {
		display: block;
	}

	.icon {
		width: 2em;
		height: 2em;
	}

	@media screen and (min-width: 43rem) {
		nav {
			border-radius: 1rem;
		}

		button {
			flex-direction: row;
			gap: 0.5rem;
		}
	}

	/* color */
	nav {
		background-color: var(--primary);
		color: var(--primary-text);
	}

	button {
		background-color: var(--primary);
		color: var(--primary-text);
		fill: var(--primary-text);
	}
	button:hover {
		background-color: var(--primary-hover);
	}
	button:active {
		background-color: var(--primary-active);
	}
	button.selecting {
		text-shadow: 0px 0px 2px var(--primary-selecting-text);
		color: var(--primary-selecting-text);
		fill: var(--primary-selecting-text);
	}
</style>
