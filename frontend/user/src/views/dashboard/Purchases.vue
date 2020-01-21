<template>
   <div class="vid-parent">
      <loading
         :active="loading"
         :is-full-page="true"
         loader="dots"
         color="#5e72e4"
      ></loading>
      <Tabs orientation="vertical" :options="{ useUrlFragment: false }" class="">
         <Tab :name="$t(`order_status.payment.${OrderStatus.PAYMENT.NOT_PAID}`)" :selected="true">
            <request-accordion :orders="orders.not_paid" v-if="orders.not_paid">
            </request-accordion>
            <no-data v-if="(!orders.not_paid || !orders.not_paid.length) && !loading"></no-data>
         </Tab>
         <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.CREATED}`)">
            <request-accordion :orders="orders.created" v-if="orders.created">
            </request-accordion>
            <no-data v-if="(!orders.created || !orders.created.length) && !loading"></no-data>
         </Tab>
         <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.ACCEPTED}`)">
            <request-accordion :orders="orders.accepted" v-if="orders.accepted">
            </request-accordion>
            <no-data v-if="(!orders.accepted || !orders.accepted.length) && !loading"></no-data>
         </Tab>
         <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.STARTED}`)">
            <request-accordion :orders="orders.started" v-if="orders.started">
            </request-accordion>
            <no-data v-if="(!orders.started || !orders.started.length) && !loading"></no-data>
         </Tab>
         <Tab :name="$t(`order_status.shoutout.${OrderStatus.SHOUTOUT.COMPLETED}`)">
            <request-accordion :orders="orders.completed" v-if="orders.completed">
            </request-accordion>
            <no-data v-if="(!orders.completed || !orders.completed.length) && !loading"></no-data>
         </Tab>
      </Tabs>
   </div>
</template>

<script>
   import {Tabs, Tab} from 'vue-tabs-component'
   import RequestAccordion from '../components/Dashboard/RequestAccordion';
   import NoData from '../components/Dashboard/NoData';
   import {OrderStatus, getOrderShoutoutStatus, getOrderPaymentStatus} from '../../helpers/order'
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css';
   import httpService from "../../services/http.service"
   window.toastr = require('toastr')
   export default {
      name: "Purchases",
      components: {
         // PurchaseTabs,
         Tabs,
         Tab,
         RequestAccordion,
         NoData,
         Loading
      },
      mounted() {
         httpService.get('orders?type=purchase').then((resp) => {
            this.orders = {not_paid: [], created: [], accepted: [], started: [], completed: []}
            if(resp.data && resp.data.data) {
               resp.data.data.forEach((order) => {
                  if (getOrderPaymentStatus(order) === OrderStatus.PAYMENT.NOT_PAID) {
                     this.orders.not_paid.push(order)
                  }
                  switch(getOrderShoutoutStatus(order)) {
                     case OrderStatus.SHOUTOUT.CREATED:
                        this.orders.created.push(order)
                        break
                     case OrderStatus.SHOUTOUT.ACCEPTED:
                        this.orders.accepted.push(order)
                        break
                     case OrderStatus.SHOUTOUT.STARTED:
                        this.orders.started.push(order)
                        break
                     case OrderStatus.SHOUTOUT.COMPLETED:
                        this.orders.completed.push(order)
                        break
                     default: break
                  }
               })
            }
            this.loading = false
         }).catch((e) => {
            this.loading = false
            if (e.resp && e.resp.status === 500) {
               toastr.error("Oops! Something is wrong. Please try again later...", "", {timeOut: 3000})
            } else {
               throw e;
            }

         })
      },
      data() {
         return {
            loading: true,
            OrderStatus,
            orders: {not_paid: [], created: [], accepted: [], started: [], completed: []}
         }
      }
   }
</script>

<style scoped>

</style>