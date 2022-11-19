<script>
	import DarkModeIcon from "../icons/DarkMode.svelte";
	import LightModeIcon from "../icons/LightMode.svelte";
	import { _ } from "svelte-i18n";

	let darkMode =
		typeof JSON.parse(localStorage.getItem("dark_mode")) == "boolean"
			? JSON.parse(localStorage.getItem("dark_mode"))
			: false;

	$: {
		darkMode
			? document.documentElement.classList.add("dark_mode")
			: document.documentElement.classList.remove("dark_mode");
		localStorage.setItem("dark_mode", darkMode.toString());
	}
</script>

<button
	aria-label={darkMode
		? $_("switch_to_light_theme")
		: $_("switch_to_dark_theme")}
	title={darkMode ? $_("switch_to_light_theme") : $_("switch_to_dark_theme")}
	on:click={() => (darkMode = !darkMode)}>
	<span class="icon">
		{#if darkMode}
			<DarkModeIcon />
		{:else}
			<LightModeIcon />
		{/if}
	</span>
</button>

<style>
	button {
		max-height: 100%;
		height: 3rem;
		aspect-ratio: 1/1;
		padding: 0;
		margin: 0;
		border: none;
		border-radius: 45%;
		background-color: var(--therdary);
		fill: var(--therdary-text);
		color: var(--therdary-text);

		display: flex;
		justify-content: center;
		align-items: center;
	}
	button:hover {
		background-color: var(--therdary-hover);
	}
	button:active {
		background-color: var(--therdary-active);
	}

	.icon {
		display: block;
		width: 75%;
		height: 75%;
	}
</style>
