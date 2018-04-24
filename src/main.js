import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store.js'
import VueRouter from 'vue-router';
import { routes } from './router/routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes:routes
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
