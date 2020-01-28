<template>
<div class="row vld-parent">
    <loading
       :active="loading"
       :is-full-page="true"
       loader="dots"
       color="#5e72e4"
    ></loading>

    <div class="col-12">
        <h6 class="dashboard-home-title text-uppercase">{{$t("Status")}}</h6>
    </div>
    <div class="col-sm-6 col-12 mt-3 mt-sm-0">
        <status-card :title="$t('This Month Sales')" :amount="monthlySale"></status-card>
    </div>

    <div class="col-sm-6 col-12 mt-3 mt-sm-0">
        <status-card :title="$t('Total Sales')" :amount="totalSale"></status-card>
    </div>

    <div class="col-12 col-sm-6 col-md-4 mt-3">
        <shoutout title="Purchased Shoutouts" :total_info="purchaseStats"></shoutout>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-3">
        <shoutout title="Sold Shoutouts" :total_info="salesStats"></shoutout>
    </div>
    <div class="col-12 col-md-4 mt-3">
        <success-rate-chart
            :success_rate="0"
            :success_shout="0">

        </success-rate-chart>
    </div>
    <div class="mt-3 col-12">
        <h6 class="text-uppercase">{{$t("upcoming schedule")}}</h6>
        <div class="d-flex flex-column card card-transparent">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>{{$t("Schedule")}}</th>
                    <th>{{$t("Username")}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(order, index) in upcomingOrders" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{$t(`order_status.shoutout.${getOrderShoutoutStatus(order)}`)}}</td>
                    <td>{{order.buyer_name}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
</template>

<script>
    import StatusCard from '../components/Dashboard/StatusCard';
    import Shoutout from '../components/Dashboard/Shoutout';
    import SuccessRateChart from '../components/Dashboard/SuccessRateChart';
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'
    import httpService from "../../services/http.service"
    import {getOrderShoutoutStatus} from "../../helpers"
    export default {
        name: "Overview",
        components: {
            StatusCard,
            Shoutout,
            SuccessRateChart,
            Loading
        },
        data (){
            return {
                loading: true,
                monthlySale: 0,
                totalSale: 0,
                purchaseStats: {
                    started: 0,
                    expired: 0,
                    rejected: 0,
                    completed: 0,
                    failed: 0
                },
                salesStats: {
                    started: 0,
                    expired: 0,
                    rejected: 0,
                    completed: 0,
                    failed: 0
                },
                upcomingOrders: []
            }
        },
        methods: {
            getOrderShoutoutStatus
        },
        mounted() {
            httpService.get('/statistics/dashboard').then(res => {
                if (res.status == 200) {
                    this.monthlySale = res.data.data.monthlySale
                    this.totalSale = res.data.data.totalSale
                    this.purchaseStats = res.data.data.purchaseStats
                    this.salesStats = res.data.data.salesStats
                    this.upcomingOrders = res.data.data.upcomingOrders
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