/**
 *
 * @param {HTMLImageElement} imgElement
 * @returns {Promise<Blob>}
 */
export function imgToBlob(imgElement) {
	/**
	 * @type {HTMLImageElement}
	 */
	// @ts-ignore
	const img = imgElement.cloneNode(false);

	let blob = new Promise((resolve) => {
		let canvas = document.createElement("canvas");
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;

		let context = canvas.getContext("2d");

		context.drawImage(img, 0, 0);

		canvas.toBlob((b) => {
			resolve(b);
		}, "image/png");
	});

	return blob;
}
