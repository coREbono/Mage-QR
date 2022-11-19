<script>
	import { _ } from "svelte-i18n";
	import QrScanner from "qr-scanner";
	import FileIcon from "../../icons/File.svelte";

	export let result;
	let inputFileEl;

	function scanFromInput(e) {
		const file = e.target.files[0];
		result = QrScanner.scanImage(file);
		e.target.value = "";
	}
</script>

<button
	class="file"
	on:click={() => {
		inputFileEl.click();
	}}>
	<span class="icon"><FileIcon /></span>
	<span class="text">{$_("choose_file")}</span>
</button>
<input
	bind:this={inputFileEl}
	type="file"
	name="QRCode File"
	id="QRCodeFile"
	accept="image/*"
	on:change={scanFromInput} />

<style>
	.file {
		margin: 0 auto;
		background-color: var(--secondary);
		color: var(--secondary-text);
		fill: var(--secondary-text);
		padding: 1em 2em;
		border-radius: 0.5em;
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
		font-size: 1rem;
	}
	.file:hover {
		background-color: var(--secondary-hover);
	}
	.file:active {
		background-color: var(--secondary-active);
	}

	.icon {
		width: 2em;
		height: 2em;
		display: block;
	}

	input[type="file"] {
		display: none;
	}
</style>
