<template>
  <b-navbar size="sm" toggleable="sm" type="dark" variant="primary">
   <b-navbar-nav>
      <b-nav-item><router-link class="nav-link" to="/" exact>Home</router-link></b-nav-item>
      <b-nav-item><router-link class="nav-link" to="/checkout" exact>Checkout</router-link></b-nav-item>
      <b-nav-item v-if="isLoggedIn"><router-link class="nav-link" to="/logout" exact>Log out</router-link></b-nav-item>
      <!-- <b-nav-item v-if="!isLoggedIn"><router-link class="nav-link" to="/login" exact>Log in</router-link></b-nav-item> -->
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  props: ['isLoggedIn']
}
</script>

<style scoped>
.router-link-active {
    color: white !important;
    font-weight: 900 !important;
}

.navbar {
  padding: 0;
}
a.nav-link {
  padding: 0.1em;
}
</style>