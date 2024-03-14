import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { registerGlobal } from "./global";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "./style.css";

const pinia = createPinia();
// @ts-ignore
const app = createApp(App).use(Quasar, { quasarUserOptions });
app.use(pinia);
app.mount("#app");

registerGlobal();