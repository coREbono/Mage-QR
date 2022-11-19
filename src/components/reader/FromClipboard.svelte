<script>
	import { _ } from "svelte-i18n";
	import QrScanner from "qr-scanner";

	export let result;

	export function scanFromClipboard(e) {
		e.stopImmediatePropagation();

		const files = e.clipboardData.files;
		if (files.length == 0) return;
		const file = files[0];
		result = QrScanner.scanImage(file);
	}
</script>

<div
	contenteditable="true"
	class="paste placeholder"
	spellcheck="false"
	data-placeholder={$_("paste_from_clipboard")}
	aria-label={$_("paste_from_clipboard")}
	on:input={(e) => {
		e.target.textContent = "";
		e.preventDefault();
	}}
	on:paste={scanFromClipboard} />

<style>
	.paste {
		height: 30%;
		padding: 2rem 1em;
		border-radius: 0.5em;
		border: 2px var(--secondary) solid;
	}

	.placeholder::before {
		content: attr(data-placeholder);
		position: relative;
		font-style: italic;
		color: gray;
		cursor: text;
		font-size: 1em;
	}
</style>
