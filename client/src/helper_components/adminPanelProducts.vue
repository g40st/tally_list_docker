<template>
    <div> 
            <h3>Produkte</h3>
            <br>
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                <tr v-for="(product, index) in productsArr" :key="product.id">
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.icon}}</td>
                    <td>
                        <b-button size="sm" v-b-modal="'editProduct'" user="'product'" 
                            @click="sendInfo(product, index)"> <icon name="cog"></icon>
                        </b-button>
                    </td>
                    <td>
                        <b-button size="sm" variant="danger" v-b-modal="'deleteProduct'" user="'product'" 
                            @click="sendInfo(product, index)"> <icon name="minus"></icon>
                        </b-button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b-button size="sm" class="bg-success" v-b-modal="'createProduct'"  
                            @click="sendInfo(null, null)"> <icon name="plus"></icon>
                        </b-button>
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- edit product -->
            <b-modal id="editProduct" title="Produkt anpassen" @ok="updateProduct(selectedObject, selectedIndex)">
                <b-form-group label="Producktname:" label-for="username">
                        <b-form-input v-model="selectedObject.name" type="text" placeholder="selectedObject.name"></b-form-input>
                </b-form-group>
                <b-form-group label="Preis:" label-for="price">
                        <b-form-input v-model="selectedObject.price" type="text" placeholder="selectedObject.price"></b-form-input>
                </b-form-group>
                <b-form-group label="icon:" label-for="icon">
                        <b-form-input v-model="selectedObject.icon" type="text" placeholder="selectedObject.icon"></b-form-input>
                </b-form-group>
            </b-modal>

            <!-- delete user -->
            <b-modal id="deleteProduct" title="Löschen" @ok="deleteProduct(selectedObject.id)">
                <p class="my-4">Möchten sie das Produkt "{{selectedObject.name}}" wirklich löschen? <br /><br />
                <strong>Offene Beträge werden gelöscht!</strong></p>
            </b-modal>

            <!-- create user -->
            <b-modal id="createProduct" title="Produkt erstellen" @ok="createProduct(selectedProduct,selectedPrice,selectedIcon)">
                <div class="form-group">
                    <label for="productname">Produktname</label>
                    <input type="text" v-model="selectedProduct" placeholder="Produktname" class="form-control"/>
                    <b-form-group label="Preis:" label-for="price">
                        <b-form-input v-model="selectedPrice" type="text" placeholder="Preis"></b-form-input>
                    </b-form-group>
                    <b-form-group label="icon:" label-for="icon">
                        <b-form-input v-model="selectedIcon" type="text" placeholder="Icon"></b-form-input>
                    </b-form-group>
                </div>
            </b-modal>
    </div>
</template>

<script>
import {HTTP} from '../helpers/http_common.js';
import errorObject from '../helpers/error_object'

export default {
    data() {
        return {
            productsArr: "",
            selectedObject: '',
            selectedIndex: '',
            selectedProduct: '',
            selectedPrice: '',
            selectedIcon: '',
        }    
    },
    methods: {
        sendInfo(object, index) {
            if(object != null && index != null) {
                this.selectedObject = object;
                this.selectedIndex = index;
            }
        },
        createProduct(productName, productPrice, productIcon){
            const actualComponent = this;

            HTTP.post('/products', {
                name: productName,
                price: productPrice,
                icon: productIcon
            })
            .then(function (response) {
                actualComponent.getProducts();
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Produkt angelegt!',
                    duration: 3000,
                    type: 'success',
                });
            })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-POST", error.response.data.error.customMsg);        
            })
        },
        deleteProduct(productid) {
            const actualComponent = this;

            HTTP.delete('/products/' + productid, {})
            .then(response => {
                actualComponent.getProducts();
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Produkt gelöscht!',
                    duration: 3000,
                    type: 'success',
                });
            })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-DELETE", error.response.data.error.customMsg);
            })
        },
        updateProduct(product, selectedIndex) {
            const actualComponent = this;

            HTTP.patch('/products/' + product.id, {
                name: product.name,
                price: product.price,
                icon: product.icon
            })
            .then(function (response) {
                actualComponent.getProducts();
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Produkt angepasst!',
                    duration: 3000,
                    type: 'success',
                });
            })
            .catch(error => {                
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-PATCH", error.response.data.error.customMsg);
            })
        },
        getProducts() {
            HTTP.get('/products').then(result => {
                this.productsArr = result.data.data;
            }, error => {
                this.error = errorObject.setError(this ,error.response.status, "HTTP-GET Product Query", error.response.data.error.customMsg);
            });
        }   
    },
    created() {
       this.getProducts();
    },
}
</script>

<style scoped>
</style>