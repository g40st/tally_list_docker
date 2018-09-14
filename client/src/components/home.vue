<template>
  <div class="overview-table container">
    <br />
    <table v-if="preparedDataAvailable" class="table table-striped table-bordered table-hover table-sm">
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

  </div>
</template>

<script>
import NoData from '../helper_components/noData'
import {HTTP} from '../helpers/http_common.js';
import errorObject from '../helpers/error_object'

export default {
  name: 'Home',
  data () {
    return {
      preparedDataAvailable: false,
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
    'noData': NoData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
