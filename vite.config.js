import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "inline",
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,json,png}"],
			},
			includeAssets: ["Mage-qr-fav.png", "Mage-qr.svg"],
			manifest: {
				name: "Mage-QR",
				short_name: "Ma-QR",
				description: "the powerful QR reader/maker.",
				theme_color: "#F9FFF1",
				icons: [
					{
						src: "mask_icon.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "Mage-qr-fav.svg",
						sizes: "512x512",
						type: "image/svg",
					},
				],
			},
		}),
	],
});
