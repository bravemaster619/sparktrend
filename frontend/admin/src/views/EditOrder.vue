<template>
   <div>
      <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                   style="min-height: 200px; background-image: url(/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
         <!-- Mask -->
         <span class="mask bg-gradient-success opacity-8"></span>
         <!-- Header container -->
      </base-header>
      <div class="container-fluid mt--150 vld-parent">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
         <div class="row" v-if="order">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
               <div class="card card-profile shadow text-sm bg-secondary mb-4">
                  <p v-if="!loading && !order.instaaccount">Sorry, we cannot find Instagram account information. Maybe the data was deleted from our database.</p>
                  <template v-else>
                     <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                           <div class="card-profile-image">
                              <a href="#">
                                 <img :src="order.instaaccount.profile_img" class="rounded-circle">
                              </a>
                           </div>
                        </div>
                     </div>
                     <div class="card-header text-center border-0 py-4">
                        <div class="d-flex justify-content-between">
                           <a target="_blank" class="btn btn-sm btn-info mr-4" :href="`https://instagram.com/${order.instaaccount.username}`">Connect</a>
                           <a class="btn btn-sm btn-default float-right" :href="order.seller ? `mailto:${order.seller.email}` : '#'">Message</a>
                        </div>
                     </div>
                     <div class="card-body pt-2">
                        <div class="row">
                           <div class="col">
                              <div class="card-profile-stats d-flex justify-content-center mt-4">
                                 <div>
                                    <span class="heading">{{order.instaaccount.total_shoutout ? order.instaaccount.total_shoutout : 0}}</span>
                                    <span class="description">Total</span>
                                 </div>
                                 <div>
                                    <span class="heading">{{order.instaaccount.completed_shoutout ? order.instaaccount.completed_shoutout : 0}}</span>
                                    <span class="description">Completed</span>
                                 </div>
                                 <div>
                                    <span class="heading">{{getAverageRating}}</span>
                                    <span class="description">Rating</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Username</label>
                           <label class="col-6 col-form-label"><router-link :to="`/products/${order.instaaccount._id}`">@{{order.instaaccount.username}}</router-link></label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Followers</label>
                           <label class="col-6 col-form-label">{{numberFormat($n(order.instaaccount.follower_count))}}</label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Registered Date</label>
                           <label class="col-6 col-form-label">{{order.instaaccount.created_at | moment("YYYY-MM-DD")}}</label>
                        </div>
                     </div>
                  </template>
               </div>
               <div class="card shadow text-sm bg-secondary mb-4">
                  <div class="card-header text-center border-0 py-4">
                     <h3>Buyer Information</h3>
                  </div>
                  <div class="card-body pt-2">
                     <p v-if="!loading && !order.buyer">Sorry, we cannot find buyer information. Maybe the data was deleted from our database.</p>
                     <template v-else>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Name</label>
                           <label class="col-6 col-form-label"><router-link :to="`/users/${order.buyer._id}`">{{order.buyer.name}}</router-link></label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Email Address</label>
                           <label class="col-6 col-form-label"><a :href="`mailto:${order.buyer.email}`">{{order.buyer.email}}</a></label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Total Purchases</label>
                           <label class="col-6 col-form-label">{{order.buyer.total_purchase}}</label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Member Since</label>
                           <label class="col-6 col-form-label">{{order.buyer.created_at | moment("YYYY-MM-DD")}}</label>
                        </div>
                     </template>
                  </div>
               </div>
               <div class="card shadow text-sm bg-secondary mb-4">
                  <div class="card-header text-center border-0 py-4">
                     <h3>Seller Information</h3>
                  </div>
                  <div class="card-body pt-2">
                     <p v-if="!loading && !order.seller">Sorry, we cannot find seller information. Maybe the data was deleted from our database.</p>
                     <template v-else>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Name</label>
                           <label class="col-6 col-form-label"><router-link :to="`/users/${order.seller._id}`">{{order.seller.name}}</router-link></label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Email Address</label>
                           <label class="col-6 col-form-label"><a :href="`mailto:${order.seller.email}`">{{order.seller.email}}</a></label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Total Sales</label>
                           <label class="col-6 col-form-label">{{order.seller.total_sales}}</label>
                        </div>
                        <div class="row">
                           <label class="col-6 col-form-label text-right font-weight-bold">Member Since</label>
                           <label class="col-6 col-form-label">{{order.seller.created_at | moment("YYYY-MM-DD")}}</label>
                        </div>
                     </template>
                  </div>
               </div>
               <div class="row">
                  <div class="col-12">
                     <button class="btn btn-default w-100" @click="historyBack">Back</button>
                  </div>
               </div>
            </div>
            <div class="col-xl-8 order-xl-1">
               <div class="card shadow bg-secondary text-sm">
                  <div class="card-header border-0 py-4">
                     <div class="row">
                        <h3 class="text-center text-lg-left col-12 col-lg-6">
                           Order Information
                        </h3>
                        <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center">
                           <span class="badge badge-primary mr-2">{{order._id}}</span>
                           <span class="badge text-uppercase mr-2" :class="`badge-${shoutoutStatusClasses[getOrderStatus(order)]}`">{{getOrderStatus(order)}}</span>
                           <span class="badge text-uppercase" :class="`badge-${paymentStatusClasses[getPaymentStatus(order)]}`">{{getPaymentStatus(order)}}</span>
                        </div>
                     </div>

                  </div>
                  <div class="card-body pt-4">
                     <div class="row text-center">
                        <div class="col-12 col-md-4 p-2">
                           <h5>Start Date</h5>
                           <label>{{order.start_from | moment("YYYY-MM-DD")}}</label>
                        </div>
                        <div class="col-12 col-md-4 border-md-left border-sm-top p-2">
                           <h5>Duration</h5>
                           <label>{{order.time}}</label>
                        </div>
                        <div class="col-12 col-md-4 border-md-left border-sm-top p-2">
                           <h5>Category Type</h5>
                           <label>{{order.category}}</label>
                        </div>
                     </div>
                     <hr class="my-4">
                     <div class="row mb-4">
                        <div class="col-12 col-lg-5 mb-4 mb-lg-0">
                           <h4 class="heading-small text-muted text-center text-lg-left">Attachments</h4>
                           <div class="images clearfix" v-viewer v-if="order.posts.length<3">
                              <template v-for="(post, index) in order.posts" >
                                 <img class="w-100 post-image mb-2" :src="post.path" :alt="post.filename" v-if="post.type==='image'" :key="index" />
                                 <video class="post-image mb-2" :src="post.path" v-if="post.type==='video'" :key="index"/>
                              </template>
                           </div>
                           <div class="row images clearfix" v-viewer v-if="order.posts.length>=3 && order.posts.length<5">
                              <div class="col-6 p-2" v-for="(post, index) in order.posts" :key="index">
                                 <img class="w-100 post-image" :src="post.path" :alt="post.filename" v-if="post.type==='image'"/>
                                 <video class="post-image" :src="post.path" v-if="post.type==='video'"/>
                              </div>
                           </div>
                           <div class="row images clearfix" v-viewer v-if="order.posts.length>=5">
                              <div class="col-4 p-2" v-for="(post, index) in order.posts" :key="index">
                                 <img class="w-100 post-image" :src="post.path" :alt="post.filename" v-if="post.type==='image'"/>
                                 <video class="post-image" :src="post.path" v-if="post.type==='video'"/>
                              </div>
                           </div>
                        </div>
                        <div class="col-12 col-lg-7">
                           <h4 class="heading-small text-muted text-center text-lg-left">Order Detail</h4>
                           <div class="row">
                              <div class="col-12 mb-4">
                                 <label class="form-control-label">Caption</label>
                                 <textarea class="form-control form-control-alternative" rows="5" readonly placeholder="This order has no caption">{{order.caption}} #{{order.verification_code}}</textarea>
                              </div>
                              <div class="col-12 mb-4" v-if="order.with_bio">
                                 <label class="form-control-label">Bio Url</label>
                                 <input class="form-control form-control-alternative" readonly :value="order.bio_url" placeholder="This order has no bio url">
                              </div>
                              <div class="col-12 mb-4" v-if="order.category==='Story'">
                                 <label class="form-control-label">Swipe Up Url</label>
                                 <input class="form-control form-control-alternative" readonly :value="order.swipe_up_url" placeholder="This order has no swipe up url">
                              </div>
                              <div class="col-12 mb-4">
                                 <label class="form-control-label">Additional Information</label>
                                 <textarea class="form-control form-control-alternative" rows="5" readonly placeholder="This order has no additional information">{{order.additional_info}}</textarea>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-12 col-lg-5">
                           <h4 class="heading-small text-muted text-center text-lg-left">Status</h4>
                           <div class="row">
                              <label class="col-6 col-form-label text-right font-weight-bold">Order ID</label>
                              <label class="col-6 col-form-label text-uppercase">
                                 <small>{{order._id}}</small>
                              </label>
                           </div>
                           <div class="row">
                              <label class="col-6 col-form-label text-right font-weight-bold">Order Status</label>
                              <label class="col-6 col-form-label"><span class="badge text-uppercase" :class="`badge-${shoutoutStatusClasses[getOrderStatus(order)]}`">{{getOrderStatus(order)}}</span></label>
                           </div>
                           <div class="row">
                              <label class="col-6 col-form-label text-right font-weight-bold">Payment Status</label>
                              <label class="col-6 col-form-label"><span class="badge text-uppercase" :class="`badge-${paymentStatusClasses[getPaymentStatus(order)]}`">{{getPaymentStatus(order)}}</span></label>
                           </div>
                           <div class="row">
                              <label class="col-6 col-form-label text-right font-weight-bold">Order Date</label>
                              <label class="col-6 col-form-label">
                                 {{order.created_at | moment("YYYY-MM-DD HH:mm(Z)")}}
                                 <small class="text-right d-block font-weight-bold">{{ new Date(order.created_at) - now | duration('humanize', true) }}</small>
                              </label>
                           </div>
                           <div class="row">
                              <label class="col-6 col-form-label text-right font-weight-bold">Start Date</label>
                              <label class="col-6 col-form-label">
                                 {{order.start_from | moment("YYYY-MM-DD HH:mm(Z)")}}
                                 <small class="text-right d-block font-weight-bold">{{ new Date(order.start_from) - now | duration('humanize', true) }}</small>
                              </label>
                           </div>
                           <div class="row">
                              <template v-if="getOrderStatus(order)==='request'">
                                 <label class="col-6 col-form-label text-right font-weight-bold">Acceptance Expiry</label>
                                 <label class="col-6 col-form-label">
                                    {{order.request_expiry | moment("YYYY-MM-DD HH:mm(Z)")}}
                                    <small class="text-right d-block font-weight-bold">{{ new Date(order.request_expiry) - now | duration('humanize', true) }}</small>
                                 </label>
                              </template>
                           </div>
                           <div class="row">
                              <template v-if="getPaymentStatus(order)!=='refunded' && getOrderStatus(order) !== 'completed' && getOrderStatus(order) !== 'rejected'">
                                 <label class="col-6 col-form-label text-right font-weight-bold">Deadline</label>
                                 <label class="col-6 col-form-label">
                                    {{order.deadline | moment("YYYY-MM-DD HH:mm(Z)")}}
                                    <small class="text-right d-block font-weight-bold">{{ new Date(order.deadline) - now | duration('humanize', true) }}</small>
                                 </label>
                              </template>
                           </div>
                        </div>
                        <div class="col-12 col-lg-7">
                           <h4 class="heading-small text-muted text-center text-lg-left">Payment Details</h4>
                           <hr class="my-4">
                           <div class="row px-4">
                              <label class="col-6 col-form-label">Payment Method</label>
                              <label class="col-6 col-form-label text-right">{{order.payment_method}}</label>
                           </div>
                           <div class="row px-4">
                              <label class="col-6 col-form-label">{{order.category}}</label>
                              <label class="col-6 col-form-label text-right">${{order.price.toFixed(2)}}</label>
                           </div>
                           <div class="row px-4" v-if="order.with_bio">
                              <label class="col-6 col-form-label">Bio Price</label>
                              <label class="col-6 col-form-label text-right">${{order.bio_price.toFixed(2)}}</label>
                           </div>
                           <hr class="my-4">
                           <div class="row px-4">
                              <label class="col-6 col-form-label font-weight-bold">Grand Total</label>
                              <label class="col-6 col-form-label text-right">${{order.total.toFixed(2)}}</label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import httpService from "../services/http"
   import Loading from 'vue-loading-overlay'
   import 'viewerjs/dist/viewer.css'
   import VueViewer from 'v-viewer'
   import {$n, historyBack, numberFormat} from '../helper'
   import Vue from 'vue'
   Vue.use(VueViewer)

   export default {
      name: 'edit-order',
      components: {
         Loading, VueViewer
      },
      data() {
         return {
            loading: true,
            saving: false,
            order: null,
            paymentStatusClasses: {
               paid: 'success',
               'not paid': 'default',
               refunded: 'danger'
            },
            shoutoutStatusClasses: {
               request: 'default',
               accepted: 'info',
               started: 'primary',
               completed: 'success',
               expired: 'danger',
               rejected: 'danger'
            }
         }
      },
      computed: {
         getAverageRating: function() {
            if (this.order.rating) {
               let totalRating = 0;
               let totalRatingCount = 0;
               ['communication', 'professionalism', 'recommendation'].forEach(ratingKey => {
                  totalRatingCount++;
                  totalRating += this.order.rating[ratingKey] || 0
               })
               if (totalRatingCount > 0) {
                  return totalRating / totalRatingCount
               } else {
                  return "N/A"
               }
            } else {
               return "N/A"
            }
         },
         now: function() {
            return new Date
         }
      },
      methods: {
         $n,
         historyBack,
         numberFormat,
         updateData: function () {
            this.loading = true
            return httpService.get(`/orders/${this.$route.params.id}`).then(res => {
               this.order = res.data.data
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot read order data")
            })
         },
         saveUser: function() {
            this.$swal({
               title: 'Are you sure?',
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  this.saving = true
                  httpService.put(`/orders/${this.$route.params.id}`, this.order).then(res => {
                     this.$noty.success("Order saved")
                     this.order = res.data.data
                  }).catch(e => {
                     window.console.error(e)
                     this.$noty.error("Cannot save order data")
                  }).finally(() => {
                     this.saving = false
                  })
               }
            })
         },
         getPaymentStatus: function(order) {
            if(order.history.paid_at) {
               return 'paid'
            }
            if(order.history.refunded_at) {
               return 'refunded'
            }
            return 'not paid'
         },
         getOrderStatus: function(order) {
            if(order.history.expired_at) {
               return 'expired'
            }
            if(order.history.completed_at) {
               return 'completed'
            }
            if(order.history.started_at) {
               return 'started'
            }
            if(order.history.accepted_at) {
               return 'accepted'
            }
            return 'request'
         }
      },
      mounted() {
         this.updateData().finally(() => {
            this.loading = false
         })
      }
   }
</script>