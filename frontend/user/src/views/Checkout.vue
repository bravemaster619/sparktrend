<template>
    <div class="row vld-parent">
        <loading
                :active="loading"
                :is-full-page="true"
                loader="dots"
                color="#5e72e4"></loading>
        <div class="col-12 col-md-6" v-if="order">
            <div class="card p-0">
                <div class="card-header">
                    <small class="font-weight-bold ">{{order._id}}</small>
                </div>
                <div class="card-body pt-0">
                    <div class="row border-bottom py-3">
                        <div class="col-12 col-md-4 text-center border-right">
                            <label class="font-weight-bold">{{$t("Start Date")}}</label>
                            <p>{{startTime}}</p>
                        </div>
                        <div class="col-12 col-md-4 text-center border-right">
                            <label class="font-weight-bold">{{$t("Duration")}}</label>
                            <p>{{order.time}} {{$t("hour(s)")}}</p>
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <label class="font-weight-bold">{{$t("Category Type")}}</label>
                            <p>{{order.category}}</p>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-3 image-preview" v-for="(attach, index) in order.posts" :key="index">
                            <img class="img-responsive" v-if="attach.type==='image'" :src="attach.path">
                            <video class="img-responsive" v-if="attach.type==='video'" :src="attach.path"></video>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label class="col-form-label">{{$t("Caption")}}</label>
                            <pre class="d-block">{{order.caption}}</pre>
                            <label class="col-form-label">{{$t("Additional Information")}}</label>
                            <pre class="d-block">{{order.additional_info}}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6" v-if="order">
            <div class="row">
                <div class="col-12">
                    <div class="card p-0">
                        <div class="card-header">
                            {{$t("Price Detail")}}
                        </div>
                        <div class="card-body">
                            <div class="price-detail border-bottom">
                                <dl class="d-flex justify-content-between">
                                    <dt>{{$t(order.category)}}</dt>
                                    <dd>${{order.subtotal.toFixed(2)}}</dd>
                                </dl>
                                <dl class="d-flex justify-content-between">
                                    <dt v-if="order.charge>0">{{$t("Charge")}}</dt>
                                    <dd v-if="order.charge>0">${{order.charge.toFixed(2)}}</dd>
                                </dl>
                            </div>
                            <div class="price-total mt-2">
                                <dl class="d-flex justify-content-between">
                                    <dt>{{$t("Grand Total")}}:</dt>
                                    <dd>${{order.total.toFixed(2)}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <div class="card p-0"  v-if="order && (!order.history || !order.history.paid_at)">
                        <div class="card-body">
                            <h6>{{$t("Pay With:")}}</h6>
                        </div>
                        <div id="paypal_button" class="p-3"></div>
                    </div>
                    <div class="card p-0">
                        <div class="card-body">
                            <p>{{$t("Order has been paid.")}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">

            </div>
        </div>
    </div>

</template>
<script>
   import httpService from "../services/http.service"
   import orderService from "../services/order.service"
   import Loading from 'vue-loading-overlay'
   const moment = require('moment')

   const addPayPalButton = function(order, cb) {
       let paypalScript = document.createElement('script')
       paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AZmZ06MLlFUMW3b9gBGbH2X5_vhUNlAATnqumGA1ajxixMmHpPz_8MBfqq4J2uAqcKbHjoI1yxHy0Bzx')
       paypalScript.onload = function() {
           paypal.Buttons({
               createOrder: function(data, actions) {
                   return actions.order.create({
                       purchase_units: [{
                           amount: {
                               value: parseFloat(order.total),
                               currency_code: "USD"
                           }
                       }]
                   })
               },
               onApprove: function(data, actions) {
                   return actions.order.capture().then(function(details) {
                       console.log(details)
                       cb(orderService.confirmPayment(order['_id'], details.id))
                   })
               }
           }).render(document.getElementById('paypal_button'));
       }
       document.body.appendChild(paypalScript)
   }
   export default {
       components: {
          Loading
       },
       data() {
          return {
             loading: true,
             order: null
          }
       },
       computed: {
          startTime: function() {
             return new moment(this.order.start_from).local().format("YYYY-MM-DD hh:mm:ss (Z)")
          }
       },
       methods: {
           payCallback: function(prom) {
               prom.then(({resp}) => {
                   if(resp.status == "200") {
                       this.$toastr.success(this.$t("order.success.order_paid"))
                       this.order = resp.data
                   } else {
                       let messageKey = 'error.default'
                       if(resp.data && resp.data.errors) {
                           messageKey = this.$te(`order.error.${e.response.data.errors}`) ? `order.error.${e.response.data.errors}` : 'error.default'
                       }
                       this.$toastr.error(this.$t(messageKey))
                   }
               }).catch(e => {
                   let messageKey = 'error.default'
                   if (e.response.data && e.response.data.errors) {
                       messageKey = this.$te(`order.error.${e.response.data.errors}`) ? `order.error.${e.response.data.errors}` : 'error.default'
                   }
                   this.$toastr.error(this.$t(messageKey))
                   window.console.error(e)
               })
           }
       },
       mounted() {
          httpService.get('orders/' + this.$route.params.id)
             .then(res => {
                if (res.status === 200 && res.data && res.data.data) {
                    this.order = res.data.data
                    this.loading = false
                    if(this.order && (!this.order.history || !this.order.history.paid_at)) {
                        addPayPalButton(this.order, this.payCallback)
                    }
                } else {
                   this.$router.push({ name: '500' })
                }
             })
             .catch(e => {
                 if (e.response && e.response.status == "404") {
                     this.$router.push({ name: '404' })
                 }
             })
       }
    }
</script>

<style scoped>

</style>