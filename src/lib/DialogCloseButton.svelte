<script>
	import { _ } from "svelte-i18n";
	import CloseIcon from "../icons/Close.svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function close() {
		dispatch("close");
	}
</script>

<button on:click={() => close()} aria-label={$_("close")} title={$_("close")}
	><CloseIcon /></button>

<style>
	button {
		width: 2.5rem;
		height: 2.5rem;
		max-width: 30vw;
		max-height: 30vh;
		border-radius: 0.5em;

		position: absolute;
		right: 3%;
		top: 3%;

		background-color: var(--therdary);
		fill: var(--therdary-text);
	}
	button:hover {
		background-color: var(--therdary-hover);
	}
	button:active {
		background-color: var(--therdary-active);
	}
</style>
