<script>
	import { _ } from "svelte-i18n";
	import Switcher from "./components/Switcher.svelte";
	import Theme from "./components/Theme.svelte";
	import Menu from "./components/Menu.svelte";
	import Logo from "./components/Logo.svelte";

	let mode;
</script>

<svelte:head>
	<meta name="description" content={$_("description")} />
</svelte:head>

<main>
	<div class="header">
		<Logo />
		<nav class="menus">
			<Theme />
			<Menu />
		</nav>
	</div>

	<div class="switcher">
		<Switcher bind:mode />
	</div>

	<!--content-->
	<div class="content">
		<svelte:component this={mode} />
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: grid;
		flex-direction: column;

		grid-template-rows: clamp(4rem, 4rem, 30%) 1fr clamp(6rem, 6rem, 30%);
		grid-template-columns: 0 1fr 0;
	}

	.header {
		grid-row: 1/2;
		grid-column: 2/3;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.menus {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.switcher {
		grid-row: 3/4;
		grid-column: 2/3;
	}

	.content {
		grid-row: 2/3;
		grid-column: 2/3;
	}

	@media screen and (min-width: 43rem) {
		main {
			grid-template-columns: 1fr 43rem 1fr;
			grid-template-rows: clamp(4rem, 4rem, 30%) clamp(4rem, 4rem, 15%) 1fr;
		}

		.switcher {
			grid-row: 2/3;
		}

		.content {
			grid-row: 3/4;
		}
	}
</style>
