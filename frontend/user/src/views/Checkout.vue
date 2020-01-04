<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="card p-0">
                <div class="card-header">
                    <small class="font-weight-bold ">{{order.payment.invoice_id}}</small>
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
                        <div class="col-3 image-preview" v-for="(attach, index) in order.attachments" :key="index">
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
                                    <dd>${{order.payment.subtotal.toFixed(2)}}</dd>
                                </dl>
                                <dl class="d-flex justify-content-between">
                                    <dt v-if="order.payment.charge>0">{{$t("Charge")}}</dt>
                                    <dd v-if="order.payment.charge>0">${{order.payment.charge.toFixed(2)}}</dd>
                                </dl>
                            </div>
                            <div class="price-total mt-2">
                                <dl class="d-flex justify-content-between">
                                    <dt>{{$t("Grand Total")}}:</dt>
                                    <dd>${{order.payment.price.toFixed(2)}}</dd>
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
                    </div>
                </div>
            </div>
            <div class="row">

            </div>
        </div>
    </div>
</template>
<script>
    const moment = require('moment')
    export default {
       data() {
          return {
             order: {
                id: 355,
                user_id: 2,
                start_time: new Date,
                end_time: new Date((new Date).getTime() + 1000 * 3600 * 24 * 3),
                caption: 'Lorem ipsum dolor sit amet',
                additional_info: 'Additional information goes here...',
                status: 'waiting_for_payment',
                code: 'FAQVL6',
                with_bio: 1,
                category_id: 2,
                category_type: 'Multiple',
                time: 12,
                price:30,
                bio_price: 15,
                pricing_id: 3,
                subtotal: 45,
                charge: 2.25,
                total_price: 47.25,
                seller: {
                   id: 3,
                   instagram_username: 'fashioncoveted',
                   profile_picture: '',
                },
                payment: {
                   id: 3,
                   invoice_id: '#INV000003',
                   payment_method: 'Paypal',
                   subtotal: 45,
                   charge: 2.25,
                   price: 47.25
                },
                attachments: [{
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
             return new moment(this.order.start_time).local().format("YYYY-MM-DD hh:mm:ss (Z)")
          }
       }
    }
</script>
<style scoped>

</style>