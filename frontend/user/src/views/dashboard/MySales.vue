
<template>
    <div class="vid-parent">
        <loading
           :active="loading"
           :is-full-page="true"
           loader="dots"
           color="#5e72e4"
        ></loading>
        <Tabs orientation="vertical" :options="{ useUrlFragment: false }">
            <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.CREATED}`)">
                <sales-accordion :orders="orders.created" v-if="orders.created" @order-changed="updateData">
                </sales-accordion>
                <no-data v-if="(!orders.created || !orders.created.length) && !loading"></no-data>
            </Tab>
            <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.ACCEPTED}`)">
                <sales-accordion :orders="orders.accepted" v-if="orders.accepted" @order-changed="updateData">
                </sales-accordion>
                <no-data v-if="(!orders.accepted || !orders.accepted.length) && !loading"></no-data>
            </Tab>
            <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.STARTED}`)">
                <sales-accordion :orders="orders.started" v-if="orders.started" @order-changed="updateData">
                </sales-accordion>
                <no-data v-if="(!orders.started || !orders.started.length) && !loading"></no-data>
            </Tab>
            <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.COMPLETED}`)">
                <sales-accordion :orders="orders.completed" v-if="orders.completed" @order-changed="updateData">
                </sales-accordion>
                <no-data v-if="(!orders.completed || !orders.completed.length) && !loading"></no-data>
            </Tab>
        </Tabs>
    </div>
</template>

<script>
    import {Tabs , Tab} from 'vue-tabs-component'
    import SalesAccordion from '../components/Dashboard/SalesAccordion';
    import NoData from '../components/Dashboard/NoData';
    import {OrderStatus, getOrderShoutoutStatus, getOrderPaymentStatus} from '../../helpers/order'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
    import httpService from "../../services/http.service"
    window.toastr = require('toastr')

    export default {
        name: "Purchases",
        components: {
            Tabs,
            Tab,
            SalesAccordion,
            NoData,
            Loading
        },
        mounted() {
            this.updateData()
        },

        data(){
            return {
                loading: true,
                OrderStatus,
                orders: {created: [], accepted: [], started: [], completed: []}
            }
        },
        methods: {
            updateData: function() {
                this.loading = true
                httpService.get('orders?type=sales').then((resp) => {
                    const created = []
                    const accepted = []
                    const started = []
                    const completed = []
                    if(resp.data && resp.data.data) {
                        resp.data.data.forEach((order) => {
                            switch(getOrderShoutoutStatus(order)) {
                                case OrderStatus.SHOUTOUT.CREATED:
                                    created.push(order)
                                    break
                                case OrderStatus.SHOUTOUT.ACCEPTED:
                                    accepted.push(order)
                                    break
                                case OrderStatus.SHOUTOUT.STARTED:
                                    started.push(order)
                                    break
                                case OrderStatus.SHOUTOUT.COMPLETED:
                                    completed.push(order)
                                    break
                                default: break
                            }
                        })
                    }
                    this.orders = { created, accepted, started, completed }
                    this.loading = false
                }).catch((e) => {
                    this.loading = false
                    if (e.resp && e.resp.status === 500) {
                        toastr.error("Oops! Something is wrong. Please try again later...", "", {timeOut: 3000})
                    } else {
                        throw e;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>