import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../helpers/http_common.js';
//import { runInNewContext } from 'vm';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        
        // send the data to the API
        HTTP.post('/sysuser/login', {
          user: user.username,
          pwd: user.password
        })
        .then(function (response) {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem('token', token);
          HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          commit('auth_success', token, user);
          resolve(response);
        })
        .catch(function(err) {
          commit('auth_error');
          localStorage.removeItem('token');
          reject(err);
        });
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete HTTP.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})