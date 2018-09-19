<template>
  <b-container fluid>
    <br />
    <spinner v-if="preparedDataAvailable === null" v-show="!error.flag"></spinner>  
    
    <b-row v-else-if="preparedDataAvailable">
      <b-col md="3" lg="2" xl="2" v-for="(user, user_index) in usersArr" :key="user.id">
        <b-card :title="user.name" style="max-width: 30rem;" >
          <p class="card-text">
            <!-- not all icons -->
            <b-button-group vertical v-if="!gotAllProductIcons">
              <b-button size="sm" variant="primary" v-on:click="updateOderData(user.id, user_index, product.id, product_index, user.product_quantites[product_index])" v-for="(product, product_index) in productsArr" :key="product.id">{{product.name | split10}}
                      <b-badge pill variant="light">{{user.product_quantites[product_index]}}</b-badge>
              </b-button>
            </b-button-group>
            <!-- all icons -->
            <b-button v-else size="sm" class="iconButton" :title="product.name" variant="primary" v-on:click="updateOderData(user.id, user_index, product.id, product_index, user.product_quantites[product_index])" v-for="(product, product_index) in productsArr" :key="product.id">
              <icon :name="product.icon"></icon> <b-badge pill variant="light">{{user.product_quantites[product_index]}}</b-badge>
            </b-button>
          </p>
        </b-card>
      </b-col>
    </b-row>
    <noData v-else v-show="!error.flag"></noData> 
  </b-container>
</template>

<script>
import NoData from '../helper_components/noData'
import Spinner from '../helper_components/spinner'
import {HTTP} from '../helpers/http_common.js';
import errorObject from '../helpers/error_object'

export default {
  name: 'Checkout',
  data () {
    return {
      preparedDataAvailable: null,
      productsArr: [],
      usersArr: [],
      gotAllProductIcons: true,
      error: []
    }    
  },
  filters: {
    split10: function (value) {
        return (value).slice(0, 10);
    }
  },
  methods: {
    updateOderData: function (user_id, user_index, product_id, product_index, act_value) {
      const actualComponent = this;
      this.error.flag = false;

      // send the data to the API
      HTTP.post('/orders', {
        userId: user_id,
        productId: product_id
      })
      .then(function (response) {
        if(response.data.message.includes("Incremented")) {
          const new_value = act_value + 1;
          actualComponent.$set(actualComponent.usersArr[user_index].product_quantites, product_index, new_value);
             actualComponent.$notify({
              group: 'notify',
              title: 'OK',
              duration: 100,
              type: 'success',
          });
        } else {
          actualComponent.error = errorObject.setError(actualComponent, 500, "HTTP-POST", "DB error");
        }
      })
      .catch(function(error) {
        actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-POST", error.response.data.error.customMsg);
      });
    },
  },
  created() {  
    HTTP.get('prepared').then(result => {
      this.preparedDataAvailable = JSON.parse(result.data.preparedData);
      this.productsArr = result.data.data.products;
      this.usersArr = result.data.data.users;

      // got all products icons
      var product = "";
      for(product of this.productsArr) {
        if(product.icon === null) {
          this.gotAllProductIcons = false;
          break;
        }
      }
    }, error => {
        this.error = errorObject.setError(this, error.response.status, "HTTP-GET", error.response.data.error.customMsg);
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
.card {
  text-align: center;
  margin-top: 0.5em;
}

.card-body {
  padding: 0.2em;
}

.iconButton {
  margin-right: 0.5em;
  margin-top: 0.25em;
}
</style>
