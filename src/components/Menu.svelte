<script>
	import License, { showLicense } from "./License.svelte";
	import About, { showAbout } from "./About.svelte";
	import { _, locale, locales } from "svelte-i18n";
	import MenuIcon from "../icons/Menu.svelte";
	import CloseButton from "../lib/DialogCloseButton.svelte";

	let menuDialog;

	$: {
		localStorage.setItem("locale", $locale);
	}
</script>

<button class="menu" title={$_("menu")} on:click={menuDialog.showModal()}>
	<span class="icon">
		<MenuIcon />
	</span>
</button>

<!-- Menu -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={menuDialog}
	class="menuDialog"
	on:click={(e) => {
		e.target.tagName === "DIALOG" ? menuDialog.close() : "";
	}}>
	<div class="inner">
		<div role="menu" class="menuPanel">
			<select
				role="menuitem"
				name="language"
				id="language"
				bind:value={$locale}>
				{#each $locales as locale}
					<option value={locale}>{locale}</option>
				{/each}
			</select>
			<button
				role="menuitem"
				on:click={() => {
					showAbout();
					menuDialog.close();
				}}>
				{$_("about_mage_qr")}</button>
			<button
				role="menuitem"
				on:click={() => {
					showLicense();
					menuDialog.close();
				}}>
				{$_("open_source_license")}</button>
			<a
				role="menuitem"
				href="https://github.com/coREbono/Mage-QR"
				target="_blank"
				rel="noreferrer noopener">Github</a>
			<CloseButton on:close={() => menuDialog.close()} />
		</div>
	</div>
</dialog>

<License />
<About />

<style>
	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 100%;
		height: 3rem;
		margin: 0;
		padding: 0;
		border: none;
		aspect-ratio: 1/1;
		border-radius: 45%;
		background-color: var(--therdary);
		fill: var(--therdary-text);
		color: var(--therdary-text);
	}
	.menu:hover {
		background-color: var(--therdary-hover);
	}
	.menu:active {
		background-color: var(--therdary-active);
	}

	.icon {
		display: block;
		width: 75%;
		height: 75%;
	}

	dialog {
		border-radius: 1rem;
		animation: popup 0.2s ease 0s 1 normal;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(3px);
	}

	.menuPanel {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: 1rem;
		padding: calc(3% + 2.5rem + 1rem) 1rem 5rem 1rem;
	}
	.menuPanel a,
	.menuPanel button,
	.menuPanel select {
		display: flex;
		font-size: 1.4rem;
		padding: 0.5em 1em;
		cursor: pointer;
		border-radius: 0.5em;
		border: none;
		text-decoration: none;

		background-color: var(--therdary);
		color: var(--therdary-text);
	}
	.menuPanel a:hover,
	.menuPanel button:hover,
	.menuPanel select:hover {
		background-color: var(--therdary-hover);
	}
	.menuPanel a:active,
	.menuPanel button:active,
	.menuPanel select:active {
		background-color: var(--therdary-active);
	}
</style>
