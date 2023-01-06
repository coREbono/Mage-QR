<script>
	import { _ } from "svelte-i18n";
	import QrScanner from "qr-scanner";
	import CameraIcon from "../../icons/Camera.svelte";
	import CloseIcon from "../../icons/Close.svelte";

	export let result;

	let cameraQrScanner;
	let cameraViewDialogEl;
	let cameraViewEl;

	function lunchCamera() {
		if (!cameraQrScanner) {
			cameraQrScanner = new QrScanner(cameraViewEl, (rst) => {
				result = new Promise((resolve) => {
					resolve(rst);
				});
			});
		}

		cameraViewDialogEl.showModal();
		cameraQrScanner.start();
	}
	function closeCamera() {
		cameraQrScanner.stop();
		cameraViewDialogEl.close();
	}
</script>

<button class="camera" on:click={lunchCamera}>
	<span class="icon"><CameraIcon /></span>
	<span class="text">{$_("launch_camera")}</span>
</button>

<dialog bind:this={cameraViewDialogEl} on:close={closeCamera}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={cameraViewEl} />
	<div class="controls">
		<button class="close" value="close" on:click={() => closeCamera()}>
			<span class="icon"><CloseIcon /></span></button>
	</div>
</dialog>

<style>
	.camera {
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
	.camera:hover {
		background-color: var(--secondary-hover);
	}
	.camera:active {
		background-color: var(--secondary-active);
	}

	.icon {
		width: 2em;
		height: 2em;
		display: block;
	}

	dialog {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		margin: 0;
		padding: 0;
		background-color: black;
		min-height: 100vh;
		min-height: 100dvh;
	}

	dialog video {
		height: 100%;
		width: 100%;
		object-fit: contain;
		margin: 0;
		padding: 0;
		display: block;
	}

	.controls {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
