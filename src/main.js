/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// 樣式
import "@/assets/scss/style.scss";

const app = createApp(App);

registerPlugins(app);

app.config.devtools = true

app.mount("#app");
