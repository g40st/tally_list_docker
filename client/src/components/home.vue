<template>
  <b-container class="overview-table">
    <br />
    <spinner v-if="preparedDataAvailable === null" v-show="!error.flag"></spinner>    
    
    <table v-else-if="preparedDataAvailable" class="table table-striped table-bordered table-hover table-sm">
      <thead class="bg-primary">
        <tr>
          <th>#</th>
          <th v-for="product in productsArr">{{product.name}}</th>
          <th>Summe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersArr">
          <td>{{user.name}}</td>
          <td v-for="quantity in user.product_quantites">{{quantity}}</td>
          <td>{{user.cost_sum | formatDecimal}}</td>
        </tr>
      </tbody>
    </table>
   
    <noData v-else v-show="!error.flag"></noData> 

  </b-container>
</template>

<script>
import NoData from '../helper_components/noData'
import Spinner from '../helper_components/spinner'
import {HTTP} from '../helpers/http_common.js';
import errorObject from '../helpers/error_object'

export default {
  name: 'Home',
  data () {
    return {
      preparedDataAvailable: null,
      productsArr: [],
      usersArr: [],
      error: []
    }    
  },
  filters: {
    formatDecimal: function (value) {
        return (value).toFixed(2).toString() + " €";
    }
  },
  created() {
    HTTP.get('prepared').then(result => {
      this.preparedDataAvailable = JSON.parse(result.data.preparedData);
      this.productsArr = result.data.data.products;
      this.usersArr = result.data.data.users;
    }, error => {
      this.error = errorObject.setError(this, error.response.status, "HTTP-GET Abfrage", error.response.data.error.customMsg);
    });
  },
  components: {
    'noData': NoData,
    'spinner': Spinner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
