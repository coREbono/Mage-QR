<script>
	export let width = "100%";
	export let height = "100%";
</script>

<span style="width: {width}; height: {height};">
	<slot />
</span>

<style>
	span {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	span :global(svg) {
		width: 100%;
		height: 100%;
		fill: inherit;
	}
</style>
