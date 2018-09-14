<template>
    <div>
            <h3>Benutzer</h3>
            <br>
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                <tr v-for="(user, index) in usersArr" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>
                        <b-button size="sm" variant="success" v-b-modal="'setZero'" user="'user'" 
                            @click="sendInfo(user, index)"> = 0 €
                        </b-button>
                    </td>
                    <td>
                        <b-button size="sm" variant="warning" v-b-modal="'minusTen'" user="'user'" 
                            @click="sendInfo(user, index)"> - 10 €
                        </b-button>
                    </td>
                    <td>
                        <b-button size="sm" v-b-modal="'editUser'" user="'user'" 
                            @click="sendInfo(user, index)"> <icon name="cog"></icon>
                        </b-button>
                    </td>
                    <td>
                        <b-button size="sm" variant="danger" v-b-modal="'deleteUser'" user="'user'" 
                            @click="sendInfo(user, index)"> <icon name="minus"></icon>
                        </b-button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b-button size="sm" class="bg-success" v-b-modal="'createUser'"  
                            @click="sendInfo(null, null)"> <icon name="plus"></icon>
                        </b-button>
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- set zero -->
            <b-modal id="setZero" title="Benutzer hat bezahlt" @ok="setZero(selectedObject.id)">
                <p class="my-4">Der Benutzer "{{selectedObject.name}}" hat bezahlt? <br /><br />
                <strong>Die Beträge werden auf 0 gesetzt!</strong></p>
            </b-modal>

            <!-- set minusTen -->
            <b-modal id="minusTen" title="Benutzer hat 10 € bezahlt" @ok="minusTen(selectedObject.id)">
                <p class="my-4">Der Benutzer "{{selectedObject.name}}" hat 10 € bezahlt? </p>
            </b-modal>

            <!-- edit user -->
            <b-modal id="editUser" title="Benutzer" @ok="updateUser(selectedObject, selectedIndex)">
                <b-form-group label="Benutzername:" label-for="username">
                        <b-form-input v-model="selectedObject.name" type="text" placeholder="selectedObject.name"></b-form-input>
                </b-form-group>
            </b-modal>

            <!-- delete user -->
            <b-modal id="deleteUser" title="Löschen" @ok="deleteUser(selectedObject.id)">
                <p class="my-4">Möchten sie den Benutzer "{{selectedObject.name}}" wirklich löschen? <br /><br />
                <strong>Offene Beträge werden gelöscht!</strong></p>
            </b-modal>

            <!-- create user -->
            <b-modal id="createUser" title="Benutzer erstellen" @ok="createUser(selectedUsername)">
                <div class="form-group">
                    <label for="exampleInputEmail1">Benutzername</label>
                    <input type="text" v-model="selectedUsername" placeholder="Benutzername" class="form-control"/>
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
            message: "",
            productsArr: "",
            usersArr: [],
            selectedObject: '',
            selectedIndex: '',
            selectedUsername: '',
            ordersArr: [],
            productsArr: [],
        }    
    },
    methods: {
        sendInfo(object, index) {
            if(object != null && index != null) {
                this.selectedObject = object;
                this.selectedIndex = index;
            }
        },
        setZero(userid) {
            const actualComponent = this;

            HTTP.get('/users/setZero/' + userid, {})
            .then(response => {
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich auf 0 gesetzt!',
                    duration: 3000,
                    type: 'success',
                });
             })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-GET setZero", error.response.data.error.customMsg);
            })
        },
        minusTen(userid) {
            const actualComponent = this;
            
            var ordersArr = [];

            HTTP.get('/orders/' + userid, {})
            .then(response => {
                ordersArr = response.data.data;
                if(ordersArr.length === 0) {
                    actualComponent.error = errorObject.setError(actualComponent, "1000", "", "Es können keine 10 € abgezogen werden. Verhältnis passt nicht!");
                } else {
                    var productsArr = [];
                    // get all products
                    HTTP.get('/products/', {})
                        .then(response => {
                            productsArr = response.data.data;
                            var flag = false;
                            var product_price = 0;
                            var product_id = 0;

                            for(var order of ordersArr) {
                                if(flag) {
                                    break;
                                }
                                if(order.quantity > 0) {
                                    for(var product of productsArr) {
                                        if(order.product_id === product.id) {
                                            if(order.quantity * product.price >= 10) {
                                                product_price = product.price;
                                                product_id = product.id;
                                                flag = true;
                                            }
                                        }
                                    }
                                } 
                            }
                            if(!flag) {
                                actualComponent.error = errorObject.setError(actualComponent, "1001", "", "Es können keine 10 € abgezogen werden. Verhältnis passt nicht!");
                            } else {
                                var amount = Math.floor(10 / product_price);
                                HTTP.patch('/orders/', {
                                    userId: userid,
                                    productId: product_id,
                                    quantity: amount
                                })
                                .then(function (response) {
                                    if(amount * product_price < 10) {
                                        actualComponent.$notify({
                                            group: 'notify',
                                            title: 'Erfolgreich um ' + amount * product_price + ' € verringert!',
                                            duration: 7000,
                                            type: 'warn',
                                        });
                                    } else {
                                        actualComponent.$notify({
                                            group: 'notify',
                                            title: 'Erfolgreich um 10 € verringert!',
                                            duration: 3000,
                                            type: 'success',
                                        });
                                    }
                                })
                                .catch(error => {                
                                    actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-PATCH setMinusTen", error.response.data.error.customMsg);
                                })
                            }                            
                        })
                        .catch(error => {
                            actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-GET setMinusTen", error.response.data.error.customMsg);
                        })
                }
             })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-GET setMinusTen", error.response.data.error.customMsg);
            })
        },
        createUser(username){
            const actualComponent = this;
            
            HTTP.post('/users', {
                name: username
            })
            .then(function (response) {
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Benutzer angelegt!',
                    duration: 3000,
                    type: 'success',
                });
                actualComponent.getUsers();
            })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-POST", error.response.data.error.customMsg);
            })
        },
        deleteUser(userid) {
            const actualComponent = this;
            
            HTTP.delete('/users/' + userid, {})
            .then(response => {
                actualComponent.getUsers();
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Benutzer gelöscht!',
                    duration: 3000,
                    type: 'success',
                });
            })
            .catch(error => {
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-DELETE", error.response.data.error.customMsg);
            })
        },
        updateUser(user, selectedIndex) {
            const actualComponent = this;
            
            HTTP.patch('/users/' + user.id, {
                name: user.name
            })
            .then(function (response) {
                actualComponent.$notify({
                    group: 'notify',
                    title: 'Erfolgreich Benutzer angepasst!',
                    duration: 3000,
                    type: 'success',
                });
            })
            .catch(error => {                
                actualComponent.error = errorObject.setError(actualComponent, error.response.status, "HTTP-PATCH", error.response.data.error.customMsg);
            })
        },
        getUsers() {
            HTTP.get('/users').then(result => {
                this.usersArr = result.data.data;
            }, error => {
                this.error = errorObject.setError(this, error.response.status, "HTTP-GET User Query", error.response.data.error.customMsg);
            });
        }   
    },
    created() {
       this.getUsers();
    },
}
</script>

<style scoped>
</style>