import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:81/';

export default new Vuex.Store({
  state: {
    nombreCompleto: '',
    token: ''
  },
  actions: {
  },
  mutations: {
      setNombreCompleto(state, nombreCompleto){
        state.nombreCompleto = nombreCompleto;
      },
      setToken(state, token){
        state.token = token;
      },
  },
  getters:{
    //nombreCompleto: state => state.nombreCompleto,
    //token: state => state.token
    userLogin(state){
        return state.nombreCompleto;
    }
  }
})