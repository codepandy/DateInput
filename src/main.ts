import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin with optional defaults
const app = createApp(App);
app.use(VCalendar, {});

app.mount('#app');
