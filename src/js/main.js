import Vue from 'vue';
import HomePage from './components/HomePage.vue';
// import VueRouter from 'vue-router';

// const routes = [
//   { path: '/', component: HomePage },
// ];

// const router = new VueRouter({
//   routes,
// });

// Vue.use(VueRouter);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: "#app",
  // router,
  components: {
    HomePage
  }
});

