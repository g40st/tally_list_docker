<template>
  <div id="app">
    <notifications group="error" position="top center" />
    <notifications group="notify" position="bottom right" />
    <Navigation :isLoggedIn="isLoggedIn"></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './helper_components/navigation'
import {HTTP} from './helpers/http_common.js';

export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  }, 
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  created: function () {
    HTTP.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  }
}
</script>

<style lang="scss">
  @import './styles/custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import './styles/vue-awesome-notifications/style.scss';
</style>
