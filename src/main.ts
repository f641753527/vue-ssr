import { createSSRApp } from 'vue';

import App from './App.vue';
import router from './router';
import i18n from './lang';
import element, { ID_INJECTION_KEY } from 'element-plus';
import 'element-plus/dist/index.css';
import store, { key } from './store';

import 'normalize.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(store, key);
  app.use(router);
  app.use(i18n);
  app.use(element).provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  });
  return { app, router };
}
