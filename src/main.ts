import vueEmitter from 'core/emitter';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import AppComponents from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './index.css';
import 'element-plus/dist/index.css';
import router from './router';
import setupInterceptors from './services/setupInterceptors';
import './registerServiceWorker';
// create new app instance
const createNewApp = () => {
  const app = createApp({
    render: () => h(App)
  });
  library.add(fas, fab);

  app.component('font-awesome-icon', FontAwesomeIcon);
  app.provide('eventHub', vueEmitter);
  app.use(router);
  app.use(ElementPlus);
  app.use(AppComponents);
  app.use(createPinia());
  setupInterceptors();
  app.mount('#app');
  app.config.performance = true;
};

const initApp = async () => {
  createNewApp();
};

initApp().then(() => {
  // initialized
});
