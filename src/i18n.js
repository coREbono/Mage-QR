import { addMessages, init } from "svelte-i18n";

import en from "../locale/en.json";
import ja from "../locale/ja.json";

addMessages("en", en);
addMessages("ja", ja);

init({
	fallbackLocale: "en",
	initialLocale: localStorage.getItem("locale")
		? localStorage.getItem("locale")
		: navigator.language,
});
