<script context="module">
	import logo from "../assets/Mage-qr.svg";

	let dialog;

	export function showAbout() {
		dialog.showModal();
	}
</script>

<script>
	import { _ } from "svelte-i18n";
	import CloseButton from "../lib/DialogCloseButton.svelte";
</script>

<dialog bind:this={dialog}>
	<article>
		<h1>{$_("about_mage_qr")}</h1>
		<img src={logo} alt="Mage-QR logo" />
		<p><b>Mage-QR</b> is the powerful QR reader/maker.</p>
		<h2>Features</h2>
		<ul>
			<li>Can read from Clipboard, Image File, Camera</li>
			<li>Can make QR directly into Clipboard and Image File</li>
		</ul>
	</article>
	<CloseButton on:close={() => dialog.close()} />
</dialog>

<style>
	dialog {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		margin: 0;
		padding: 0;
		overflow-y: auto;
	}

	article {
		text-align: center;
		font-family: Arial, Helvetica, sans-serif;
	}
	@media screen and (min-width: 43rem) {
		article {
			width: 43rem;
			margin: 0 auto;
		}
	}

	h1 {
		font-size: 3rem;
		margin: calc(3vh + 2.5rem + 0.5rem) 1rem 3rem 1rem;
	}

	ul {
		list-style: none;
	}
</style>
