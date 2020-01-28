<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="d-inline">{{$t("My Accounts")}}</h5>
            <RouterLink class="btn button-primary btn-grad-effect" to="/addproduct">{{$t("Add Account")}}</RouterLink>
        </div>
        <div class="row vld-parent px-3">
            <loading
               :active="loading"
               :is-full-page="true"
               loader="dots"
               color="#5e72e4"/>
            <NoData v-if="!this.loading && this.instaaccounts.length === 0"/>
            <product-pad v-for="instaaccount in instaaccounts" :key="instaaccount._id" :instaaccount="instaaccount"></product-pad>
        </div>
    </div>
</template>

<script>
    import NoData from '../components/Dashboard/NoData'
    import ProductPad from '../components/Dashboard/ProductPad'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'
    import httpService from '../../services/http.service'
    export default {
        name: "MyProducts",
        components: {
            ProductPad, Loading, NoData
        },
        data() {
            return {
                loading: true,
                instaaccounts: []
            }
        },
        mounted() {
            httpService.get('/instaaccounts/myproducts').then(res => {
                if (res.status === 200) {
                    this.instaaccounts = res.data.data
                } else {
                    this.$toastr.error(this.$t("error.default"), "", {timeOut: 3000})
                }
            }).catch(e => {
                console.error(e)
                this.$toastr.error(this.$t("error.default"), "", {timeOut: 3000})
            }).finally(() => {
                this.loading = false
            })
        }
    }
</script>

<style scoped>

</style>