<script>
	import { _ } from "svelte-i18n";
	import { makerText, makerCoLev } from "../../store";
	import QRCode from "qrcode";
	import CopyIcon from "../../icons/Copy.svelte";
	import DownloadIcon from "../../icons/Download.svelte";
	import { imgToBlob } from "../../lib/imgToBlob";

	let text = "";
	let correctionLevel = "M";

	makerText.subscribe((mtext) => (text = mtext));
	makerCoLev.subscribe((mcolev) => (correctionLevel = mcolev));

	let qrImgUrl = "";

	let imgEl;

	$: {
		QRCode.toDataURL(
			text,
			{ errorCorrectionLevel: correctionLevel },
			(err, url) => {
				qrImgUrl = url;
			},
		);
	}

	$: makerText.set(text);
	$: makerCoLev.set(correctionLevel);

	async function copy() {
		const blob = await imgToBlob(imgEl);

		try {
			await navigator.clipboard.write([
				new window.ClipboardItem({
					"image/png": blob,
				}),
			]);
		} catch (err) {
			console.error(err);
		}
	}

	async function download() {
		const blob = await imgToBlob(imgEl);

		let link = document.createElement("a");
		link.download = "qrCode.png";

		link.href = URL.createObjectURL(blob);
		link.click();

		URL.revokeObjectURL(link.href);
	}
</script>

<main>
	<div class="img-container">
		<img src={qrImgUrl} alt="" bind:this={imgEl} />
		<div class="action-buttons">
			<button
				aria-label={$_("copy")}
				title={$_("copy")}
				on:click={() => copy()}>
				<span class="icon"><CopyIcon /></span></button>
			<button
				aria-label={$_("download")}
				title={$_("download")}
				on:click={() => download()}>
				<span class="icon"><DownloadIcon /></span></button>
		</div>
	</div>
	<textarea
		name="text"
		id=""
		placeholder=""
		spellcheck="false"
		bind:value={text} />
	<dl>
		<dt>{$_("error_correction_level")}</dt>
		<dd>
			<select
				name="correction-level"
				id="correc-lev"
				bind:value={correctionLevel}>
				<option value="L">{$_("low")}</option>
				<option value="M">{$_("medium")}</option>
				<option value="Q">{$_("quartile")}</option>
				<option value="H">{$_("high")}</option>
			</select>
		</dd>
	</dl>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 3em;
		padding: 1rem 2%;

		overflow-y: auto;
	}

	.img-container {
		position: relative;
	}

	.img-container img {
		width: 40%;
		aspect-ratio: 1/1;
		margin: 0 auto;
		background-color: white;
		display: block;
	}

	.action-buttons {
		position: absolute;
		bottom: 0;
		right: 0;

		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 0.5rem;
	}

	button {
		width: 3rem;
		aspect-ratio: 1/1;
		max-width: 50%;
		border-radius: 0.5em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		width: 75%;
		height: 75%;
	}

	textarea {
		resize: vertical;
		height: 8em;
		min-height: 3em;
		padding: 2rem 1em;
		border-radius: 0.5em;
		border: 2px var(--secondary) solid;
		color: inherit;
		background-color: transparent;
		font-size: 1rem;
		white-space: pre-wrap;
	}

	dl {
		font-size: 1rem;

		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}

	dt {
		font-weight: bold;
	}

	dd {
		margin: 0;
	}

	select {
		font-size: 1rem;
		border: none;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
	}

	/* color */
	select,
	button {
		background-color: var(--secondary);
		color: var(--secondary-text);
		fill: var(--secondary-text);
	}
	select:hover,
	button:hover {
		background-color: var(--secondary-hover);
	}
	select:active,
	button:active {
		background-color: var(--secondary-active);
	}
</style>
