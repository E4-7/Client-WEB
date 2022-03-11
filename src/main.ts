import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routers";

import "@/assets/css/reset.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");