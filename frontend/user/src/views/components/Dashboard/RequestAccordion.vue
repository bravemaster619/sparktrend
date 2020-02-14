<template>
   <div>
      <badger-accordion :icons="icons" v-for="order in displayOrders" :key="order._id">
         <badger-accordion-item>
            <template slot="header">
               <div class="request-header">
                  <div class="u-position-relative">
                     <div class="salesorder-list-item">
                        <div class="salesorder-list-image d-flex flex-column">
                           <div class="m-auto">
                              <img class="img-fluid salesorder-list-img-profile"
                                   style="position: relative; left: 10px;"
                                   :src="order.instaaccount.profile_img"
                                   alt="img">
                              <p class="mb-0 mt-1 font-weight-light text-muted text-center">
                                 @{{order.instaaccount.username}}
                              </p>
                           </div>
                        </div>
                        <div
                           class="d-flex flex-md-row flex-column justify-content-between w-100 pr-md-5 pl-md-4 text-center">
                           <div class="d-flex flex-column">
                              <div class="m-auto text-md-left text-center">
                                 <span>{{order._id}}</span>
                                 <h6 class="m-0">
                                    {{startTime(order.start_from, true)}}
                                 </h6>
                                 <label :class="`badge badge-${OrderClass.PAYMENT[getOrderPaymentStatus(order)]}`">
                                    {{$t(`order_status.payment.${getOrderPaymentStatus(order)}`)}}
                                 </label>
                              </div>

                           </div>
                           <div class="d-flex flex-md-column flex-row">
                        <span
                           class="salesorder-list-payment-status unpaid text-center mx-md-auto mr-auto my-md-0 my-auto">
                            <label :class="`badge badge-${OrderClass.SHOUTOUT[getOrderShoutoutStatus(order)]}`">
                                {{$t(`order_status.shoutout.${getOrderShoutoutStatus(order)}`)}}
                            </label>
                        </span>
                              <h2 class="salesorder-price ml-auto mt-md-auto mt-2">
                                 <span class="text-cement-grey">$</span>
                                 <span class="text-primary">{{order.total}}</span>
                              </h2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
            <template slot="content">
               <div class="request-info">
                  <div class="py-2">
                     <div class="w-100 d-flex flex-md-row flex-column pb-md-4 pb-2 border-bottom">
                        <div class="pr-md-2 py-md-0 py-2 text-center d-flex flex-column w-100">
                           <div class="m-auto">
                              <p class="salesorder-list-date mb-1">{{$t("Start Date")}}</p>
                              <p class="mb-1">{{startTime(order.start_from)}}</p>
                              <p>{{utcOffset(order.start_from)}}</p>
                           </div>
                        </div>
                        <div
                           class="pl-md-2 py-md-0 py-2 text-center border-md-left border-sm-top d-flex flex-column w-100">
                           <div class="m-auto">
                              <p class="salesorder-list-date mb-1">{{$t("Duration")}}</p>
                              <p>{{order.time}} {{$t("hour(s)")}}</p>
                           </div>
                        </div>
                        <div
                           class="pl-md-2 py-md-0 py-2 text-center border-md-left border-sm-top d-flex flex-column w-100">
                           <div class="m-auto">
                              <p class="salesorder-list-date mb-1">{{$t("Category Type")}}</p>
                              <p>{{order.category}}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="py-2">
                     <div class="row">
                        <div class="col-12 col-md-5 images clearfix" v-viewer>
                           <div class="salesorder-list-date mb-2">Attachment</div>
                           <div class="salesorder-list-image-product mb-2"
                                v-for="(post,index) in order.posts"
                                :key="index">

                              <img class="img-fluid salesorder-list-img-product z-depth-1 mb-1"
                                   :src="post.path"
                                   :alt="post.filename"
                                   v-if="post.type==='image'"
                              >
                              <video class="img-fluid salesorder-list-img-product z-depth-1 mb-1"
                                     :src="post.path" v-if="post.type==='video'"></video>
<!--                              <a data-toggle="tooltip" :title="$t('Download Attachment(s)')" :href="post.path"-->
<!--                                 :download="post.filename"-->
<!--                                 class="salesorder-list-download-post" target="_blank" @click="downloadPost">-->
<!--                                 <img-->
<!--                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBxsJMTakVrUDAAACmElEQVRo3u2XP0gcQRSHf3ucFtHocRAklgYLwSDiJUUUJJWlWGrANJJChFiksRCChVWaoGAlGCHBQkvBSruAeiBiKRY2UQRFToyQ03wp9p2sxjPn/jkN7CsWdmb2fd/ODjNvpTj+7yBJ8j7xreyxR+v9CUwAMBEkRyKQwWPP9V4EQohYIBaIBWKBWCAWiAVigYcuQIph2v0mp51hUoH8mAdgrEjvDAAzRXrHAJgPNAOqlSSNMn23+p8k0xr1ZPA9Ay0c4MYiVaXOAFUs2lMHtAQSkGhkx5Kt8qQUAZ6wak/s0BgQL0nUkbWE2zT8S4AGtm10lroQ8JJENUuWdJ+22wRoY99GLlEdEl6SSBoMTugqJkAXJzZqJoKfVsYteZ7+mwToJ24jxkOHG2KQC0OMXBdgxHouGIwIL0n0cGagSRIFARJMWusZPRHiJYkOjgy2wBwAcyxYyxEdEeMliSZ2Dfjbc4VdmsqAlyTq2eR6bFJfJrwkUcvyFfwywfZ8HwqVTF1+gikq/eZxAkk812tJK85WkCRpBkI5Mu5ObmSAtFgBcqHu26Xhq8kBK7JF1Fl2gU4XXKiIAq0FX2HEh14VRx9FTm1q9Chk0k8nV7IAn/ReYRcU53x2PvzdnNCpJMlT8VKhodDxUlJDVHjuXeJpQhuSJE+l5+Q1K0IXQLNO3nPvEjeSWleHpJfesc47PqomZIGc8+PKvUtcF30AnJMJ/Z1vm44M5wD0ibQV0lv+T7Q74yvZsiI/LYlu247XaC4Lvpk1I3bbhsgXuYX2L33Vd2V1HBE7pYxe6Y3cuZ513hacauw3vJwxz9VlTi+HZYMf0lvgek5BnqpPL5TRswgXwI6yWtc3Z+8GgUuRlFIR4Y+d4whfLg5/8Qdiiv8HlTJ+cwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0yN1QwOTo0OTo1NCswMjowMH0+KmoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMjdUMDk6NDk6NTQrMDI6MDAMY5LWAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="-->
<!--                                    alt="download-icon">-->
<!--                              </a>-->
                           </div>
                           <div class="d-flex mt-2" v-if="getOrderPaymentStatus(order)===OrderStatus.PAYMENT.NOT_PAID && !order.history.rejected_at">
                              <router-link class="btn btn-primary btn-grad-effect btn-md flex-1 mx-0"
                                           style="font-size: 14px;" :to="`/orders/${order._id}/checkout`">
                                 {{$t("Pay")}}
                              </router-link>
                           </div>
                           <div class="d-flex flex-column mt-2" v-if="getOrderPaymentStatus(order)===OrderStatus.PAYMENT.PAID">
                              <button class="btn btn-danger btn-grad-effect btn-md w-100 mx-0" @click="() => { showRatingModal(order) }">
                                 {{ getOrderShoutoutStatus(order) === OrderStatus.SHOUTOUT.COMPLETED && order.history.rated_at ? $t("View Feedback") :
                                    (order.history.rated_at ? $t("Edit Feedback") : $t("Rate"))
                                 }}
                              </button>
                              <small class="mt-2">{{$t("order.feedback_solicit")}}</small>
                           </div>
                        </div>
                        <div class="col-12 col-md-7">
                           <div class="d-flex flex-column">
                              <div class="w-100 flex-1 mt-md-0 mt-3">
                                 <div class="salesorder-list-date">{{$t("Caption")}}</div>
                                 <textarea id="caption-box" rows="6" class="form-control"
                                           readonly
                                           :value="order.caption + ' #' + order.verification_code">
                                    </textarea>
                              </div>
<!--                              <button class="btn button-basic m-0 mt-3">-->
<!--                                 {{$t("Copy text")}}-->
<!--                              </button>-->
                              <div class="w-100 flex-1" v-if="!isEmpty(order.additional_info)">
                                 <div class="salesorder-list-date mt-4">{{$t("Additional Information")}}</div>
                                 <span style="word-break: break-word;">{{order.additional_info}}</span>
                              </div>
                              <div class="w-100 flex-1" v-if="!isEmpty(order.bio_url)">
                                 <div class="salesorder-list-date mt-4">Bio URL</div>
                                 <input type="text" class="form-control" readonly :value="order.bio_url">
                              </div>
                              <div class="w-100 flex-1" v-if="!isEmpty(order.swipe_up_url)">
                                 <div class="salesorder-list-date mt-4">Swipe up URL</div>
                                 <input type="text" class="form-control" readonly :value="order.swipe_up_url">
                              </div>
                              <div class="my-4">
                                 <div class="salesorder-list-date">{{$t("Payment Details")}}</div>
                                 <hr>
                                 <div class="d-flex w-100">
                                    <div class="flex-1">{{$t("Payment Method")}}</div>
                                    <div class="price">{{order.payment_method}}</div>
                                 </div>
                                 <div class="d-flex w-100">
                                    <div class="flex-1">{{order.category}}</div>
                                    <div class="price">$ {{order.price.toFixed(2)}}</div>
                                 </div>
                                 <div class="d-flex">
                                    <div class="flex-1">{{$t("Bio Price")}}</div>
                                    <div class="price">$ {{order.bio_price.toFixed(2)}}</div>
                                 </div>
                                 <div class="d-flex" v-if="order.charge > 0">
                                    <div class="flex-1">{{$t("Charge")}}</div>
                                    <div class="price">$ {{order.charge.toFixed(2)}}</div>
                                 </div>
                                 <hr>
                                 <div class="d-flex">
                                    <div class="flex-1 font-weight-bold text-uppercase">{{$t("Grand Total")}}
                                    </div>
                                    <div class="price font-weight-bold">$ {{order.total.toFixed(2)}}</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </badger-accordion-item>
      </badger-accordion>
      <div v-if="displayOrders.length">
         <paginate
            :paginate-count="pageLength"
            :pageCount=pageCount
            :prev-text="'&laquo;'"
            :next-text="'&raquo;'"
            :container-class="'pagination browse-pagination'"
            :click-handler="onPageNavigate"
            v-model=page
         ></paginate>
      </div>
      <rate-modal
         v-if="ratedOrder"
         :order="ratedOrder"
         :show.sync="showingRatingModal"
         @close="showingRatingModal=false"
         @order:updated="onOrderUpdated"
      />
   </div>

</template>

<script>
   import {BadgerAccordion, BadgerAccordionItem} from "vue-badger-accordion";
   import {OrderStatus, getOrderPaymentStatus, getOrderShoutoutStatus} from '../../../helpers/order'
   import httpService from '../../../services/http.service'
   import RateModal from "../../dashboard/RateModal"
   import StarRating from 'vue-star-rating'
   const moment = require('moment')
   const fileDownload = require('js-file-download')
   const OrderClass = {SHOUTOUT: {}, PAYMENT: {}}
   import VueViewer from 'v-viewer'
   import Vue from 'vue'
   import 'viewerjs/dist/viewer.css'
   Vue.use(VueViewer)
   window.toastr = require('toastr')
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.NOT_CREATED] = 'default'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.CREATED] = 'primary'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.STARTED] = 'warning'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.REJECTED] = 'danger'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.EXPIRED] = 'danger'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.ACCEPTED] = 'info'
   OrderClass.SHOUTOUT[OrderStatus.SHOUTOUT.COMPLETED] = 'success'
   OrderClass.PAYMENT[OrderStatus.PAYMENT.PAID] = 'success'
   OrderClass.PAYMENT[OrderStatus.PAYMENT.NOT_PAID] = 'warning'
   OrderClass.PAYMENT[OrderStatus.PAYMENT.REFUNDED] = 'danger'

   export default {
      name: "RequestAccordion",
      components: {
         BadgerAccordion,
         BadgerAccordionItem,
         RateModal,
         StarRating
         // RequestHeader,
         // RequestInfo
      },
      data() {
         return {
            OrderClass,
            OrderStatus,
            page: 1,
            pageLength: 20,
            displayOrders: [],
            icons: {opened: '<i class="ni ni-bold-up"></i>', closed: '<i class="ni ni-bold-down"></i>'},
            ratedOrder: null,
            showingRatingModal: false,
            processingRate: false,
            rating: {
               communication: 0,
               professionalism: 0,
               recommendation: 0,
               feedback: '',
               leaveMessage: false
            }
         }
      },
      props: {
         orders: Array
      },
      watch: {
         orders: function (newVal, oldVal) {
            const from = (this.page - 1) * this.pageLength
            const to = from + this.pageLength
            this.displayOrders = newVal.slice(from, to)
         },
      },
      methods: {
         startTime: function (dateString, withTimeZone = false) {
            if (withTimeZone) {
               return new moment(dateString).local().format("YYYY-MM-DD hh:mm:ss (UTC Z)")
            } else {
               return new moment(dateString).local().format("YYYY-MM-DD hh:mm:ss")
            }
         },
         utcOffset: function (dateString) {
            return new moment(dateString).local().format("(Z)")
         },
         downloadUrl: function (url) {
            url = "" + url
            return url.replace('uploads', 'api/download')
         },
         downloadPost: function (e) {
            e.preventDefault()
            e.stopPropagation()
            const anchor = e.target
            window.console.log(anchor)
            let url = this.downloadUrl(anchor.getAttribute('href'))
            let filename = anchor.getAttribute('download')
            if (!filename) {
               filename = 'untitled'
            }
            httpService.get(url, {}, true)
               .then(res => {
                  fileDownload(res.data, filename)
               })
               .catch(e => {
                  if (e.response && e.response.status == "404") {
                     this.$toastr.error("File not found", "Error", {timeOut: 3000})
                  } else {
                     this.$toastr.error("Oops! Something is wrong. Please try again later...", "", {timeOut: 3000});
                  }
               })
         },
         getOrderPaymentStatus,
         getOrderShoutoutStatus,
         onPageNavigate: function (pageNum) {
            this.page = pageNum
            this.displayOrders = this.getDisplayOrders()
         },
         getDisplayOrders: function () {
            const from = (this.page - 1) * this.pageLength
            const to = from + this.pageLength
            return this.orders.slice(from, to)
         },
         displayRange: function () {
            const from = (this.page - 1) * this.pageLength
            const to = from + this.pageLength
            return {from, to}
         },
         showRatingModal: function(order) {
            this.ratedOrder = order
            this.showingRatingModal = true
         },
         hideRatingModal: function() {
            this.ratedOrder = null
            this.showingRatingModal = false
         },
         rateOrder: function() {
            if(!this.ratedOrder) {
               return false
            }
            this.processingRate = true
            httpService.post(`/orders/${this.ratedOrder._id}/rate`, this.rating).then((res) => {
               if(res.status === 200) {
                  this.$toastr.success(this.$t("order.success.order_rated"))
                  this.orders.forEach((order, index) => {
                     if (order._id == res.data.data._id) {
                        this.orders[index] = res.data.data
                     }
                  })

               } else {
                  this.$toastr.error(this.$t("error.default"))
               }
            }).catch(e => {
               window.console.error(e)
               this.$toastr.error(this.$t("error.default"))
            }).finally(() => {
               this.processingRate = false
               this.hideRatingModal()
            })
         },
         onOrderUpdated: function(updatedOrder) {
            this.orders.forEach((order, index) => {
               if(order._id === updatedOrder._id) {
                  updatedOrder.instaaccount = order.instaaccount
                  this.orders[index] = updatedOrder
                  const from = (this.page - 1) * this.pageLength
                  const to = from + this.pageLength
                  this.displayOrders = this.orders.slice(from, to)
               }
            })
         }
      },
      computed: {
         pageCount: function () {
            if (this.pageLength == 0 || this.orders.length == 0) {
               return 1
            }
            return parseInt((this.orders.length + this.pageLength - 1) / this.pageLength)
         },
      },
      mounted() {
         this.displayOrders = this.getDisplayOrders()
      }
   };
</script>

<style lang="scss" scoped>
   @import '../../../assets/scss/custom/_custom-request-info';
</style>