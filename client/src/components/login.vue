<template>
    <b-container>
        <b-row>
            <b-col cols="5">           
                <br>
                <h3>Login Adminpanel</h3>
                <br />
                <b-form @submit.prevent="login">
                    <b-form-group label="Username:" label-for="username">
                        <b-form-input id="username" type="text" v-model="username" placeholder="Username" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password:" label-for="password">
                        <b-form-input id="password" type="password" v-model="password" placeholder="Password" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import errorObject from '../helpers/error_object'

export default {
    data () {
        return {
            username: '',
            password: '',
            error: []
        }
    },
    methods: {
        login () {
            this.error.flag = false;
            let username = this.username; 
            let password = this.password;
            this.$store.dispatch('login', { username, password })
                .then(() => this.$router.push('/adminPanel'))
                .catch(error => {
                    this.error = errorObject.setError(this, error.response.status, "HTTP-POST", error.response.data.error.customMsg);
                })
        }
    },
    components: {
        'Error': Error
    }
}
</script>

<style scoped>
</style>