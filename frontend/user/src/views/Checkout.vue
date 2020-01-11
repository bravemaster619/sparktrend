<template>
    <div class="row">
        <div class="col-12 col-md-6">
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
                            <p>{{order.category_type}}</p>
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
        <div class="col-12 col-md-6">
            <div class="row">
                <div class="col-12">
                    <div class="card p-0">
                        <div class="card-header">
                            {{$t("Price Detail")}}
                        </div>
                        <div class="card-body">
                            <div class="price-detail border-bottom">
                                <dl class="d-flex justify-content-between">
                                    <dt>{{$t(order.category_type)}}</dt>
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
                                    <dd>${{order.price.toFixed(2)}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <div class="card p-0">
                        <div class="card-body">
                            <h6>{{$t("Pay With:")}}</h6>
                        </div>
                        <div id="paypal_button" class="p-3"></div>
                    </div>
                </div>
            </div>
            <div class="row">

            </div>
        </div>
    </div>

</template>
<script>
   import Axios from 'axios'
   const moment = require('moment')
   const orderService = require('../services/order.service')
   export default {
       data() {
          return {
             order: {
                _id: "5e18c38d53322d1118713b67",
                insta_id: "5e18c0a2d63de515c804211c",
                category: "Single",
                pricing_idx: 0,
                start_from: "2020-01-17T00:00:00.000+00:00",
                with_bio: true,
                caption: 'Lorem ipsum dolor sit amet',
                additional_info: 'Additional information goes here...',
                status: 'waiting_for_payment',
                code: 'FAQVL6',
                bio_url: 'bio_url',
                category_id: 2,
                category_type: 'Multiple',
                time: 12,
                price:50,
                bio_price: 10,
                subtotal: 60,
                charge: 0,
                total: 60,
                seller_id: '5e1871a183235942ac1b1276',
                buyer_id: '5e18c244d63de515c804211d',
                posts: [{
                   filename: 'download.jpg',
                   type: 'image',
                   path: 'img/sana/download.jpg'
                }, {
                    filename: 'images (1).jpg',
                    type: 'image',
                    path: 'img/sana/images (1).jpg'
                }, {
                   filename: 'RPReplay_Final1577418789.MP4',
                   type: 'video',
                   path: 'img/sana/RPReplay_Final1577418789.MP4'
                }]
             }
          }
       },
       computed: {
          startTime: function() {
             return new moment(this.order.start_from).local().format("YYYY-MM-DD hh:mm:ss (Z)")
          }
       },
       beforeMount() {
          window.self = this;
          let paypalScript = document.createElement('script')
          paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AZmZ06MLlFUMW3b9gBGbH2X5_vhUNlAATnqumGA1ajxixMmHpPz_8MBfqq4J2uAqcKbHjoI1yxHy0Bzx')
          paypalScript.onload = function() {
             paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                       purchase_units: [{
                          amount: {
                             value: self.order.total,
                             currency_code: "USD"
                          }
                       }]
                    })
                },
                onApprove: function(data, actions) {
                   return actions.order.capture().then(function(details) {
                      orderService.confirmPayment(self.order['_id'], details.id).then(resp => {
                         if (resp.status === 200) {

                         }
                      })
                   })
                }
             }).render(document.getElementById('paypal_button'));
          }
          document.body.appendChild(paypalScript)
       },
       mounted() {

       }
    }
</script>

<style scoped>

</style>