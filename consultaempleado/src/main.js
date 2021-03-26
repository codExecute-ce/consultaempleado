import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router';
import Login from './components/Login.vue'
import Buscar from './components/Buscar.vue'
import axios from "axios"
import VueAxios from 'vue-axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Vuelidate)
/*const cors = require('cors');
Vue.use(cors({ origin: true }));*/

Vue.use(VueAxios, axios); 

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/listaEmpleado',
    name: 'listaEmpleado',
    component: Buscar
  }
];

const router = new VueRouter({ 
  mode: 'history', 
  base: process.env.BASE_URL,
  routes
});

new Vue({ router, store, render: h => h(App) }).$mount('#app');
/*new Vue({
  router,
  render: h => h(App),
}).$mount('#app')*/
