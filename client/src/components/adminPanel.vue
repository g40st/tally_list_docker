<template>
    <b-container>
        <b-row>
            <b-col cols=6>  
                <br />
                <h2><b>Admin Panel</b></h2>

                <Users></Users>

                <Products></Products>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Users from '../helper_components/adminPanelUsers';
import Products from '../helper_components/adminPanelProducts';

export default {
    components: {
        'Users': Users,
        'Products': Products
    }
}
</script>

<style scoped>
</style>