import { App } from 'vue';
import DateInput from './Index.vue';

const install = (app: App) => {
  app.component(DateInput.name, DateInput);
};

export default install;
