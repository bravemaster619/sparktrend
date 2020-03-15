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
         <div class="row" v-if="instaaccount">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
               <div class="card card-profile shadow">
                  <div class="row justify-content-center">
                     <div class="col-lg-3 order-lg-2">
                        <div class="card-profile-image">
                           <a href="#">
                              <img :src="instaaccount.profile_img" class="rounded-circle">
                           </a>
                        </div>
                     </div>
                  </div>
                  <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                     <div class="d-flex justify-content-between">
                        <a target="_blank" class="btn btn-sm btn-info mr-4" :href="`https://instagram.com/${instaaccount.username}`">Connect</a>
                        <a class="btn btn-sm btn-default float-right" :href="`mailto:${instaaccount.user_info.email}`">Message</a>
                     </div>
                  </div>
                  <div class="card-body pt-0 pt-md-4">
                     <div class="row">
                        <div class="col">
                           <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                              <div>
                                 <span class="heading">{{instaaccount.total_shoutout ? instaaccount.total_shoutout : 0}}</span>
                                 <span class="description">Total</span>
                              </div>
                              <div>
                                 <span class="heading">{{instaaccount.completed_shoutout ? instaaccount.completed_shoutout : 0}}</span>
                                 <span class="description">Completed</span>
                              </div>
                              <div>
                                 <span class="heading">{{getAverageRating}}</span>
                                 <span class="description">Rating</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="text-center">
                        <h3 class="mb-4">
                           @{{instaaccount.username}}
                        </h3>
                        <div class="row text-sm mt-2">
                           <div class="h5 col text-right">
                              Followers:
                           </div>
                           <div class="col text-left">{{instaaccount.follower_count}}</div>
                        </div>
                        <div class="row text-sm mt-2">
                           <div class="h5 col text-right">
                              Verification Code:
                           </div>
                           <div class="col text-left">
                              {{instaaccount.verification_code ? instaaccount.verification_code : 'Empty'}}
                              <span class="badge badge-info ml-2 font-weight-300" v-if="instaaccount.verified">Verified</span>
                           </div>
                        </div>
                        <div class="row text-sm mt-2">
                           <div class="h5 col text-right">
                              Registered Date:
                           </div>
                           <div class="col text-left">{{instaaccount.created_at | moment("YYYY-MM-DD HH:mm:ss")}}</div>
                        </div>
                        <div class="row text-sm mt-2">
                           <div class="h5 col d-flex align-items-center justify-content-end">Verified</div>
                           <div class="col">
                              <select class="form-control" v-model="instaaccount.verified">
                                 <option :value="false">Unverified</option>
                                 <option :value="true">Verified</option>
                              </select>
                           </div>
                        </div>
                        <div class="row text-sm mt-2">
                           <div class="h5 col d-flex align-items-center justify-content-end">Show on List:</div>
                           <div class="col">
                              <select class="form-control" v-model="instaaccount.allowed">
                                 <option :value="false">Not Allowed</option>
                                 <option :value="true">Allowed</option>
                              </select>
                           </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row">
                           <div class="col-12 px-4">
                              <button class="btn btn-primary w-100 mb-3" @click="saveProduct">Save</button>
                              <button class="btn btn-default w-100" @click="historyBack">Back</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-xl-8 order-xl-1">
               <card shadow type="secondary">
                  <div slot="header" class="bg-white border-0">
                     <div class="row align-items-center">
                        <div class="col-8">
                           <h3 class="mb-0">@{{instaaccount.username}}</h3>
                        </div>
                        <div class="col-4 text-right">
                           <a href="#" class="btn btn-sm btn-primary">Settings</a>
                        </div>
                     </div>
                  </div>
                  <template>
                     <form @submit.prevent>
                        <div class="row mb-4 align-items-center">
                           <div class="col">
                              <h6 class="heading-small text-muted">
                                 User Information
                              </h6>
                           </div>
                           <div class="col d-flex justify-content-end">
                              <router-link class="btn btn-sm btn-default" :to="`/users/${instaaccount.user_info._id}`">
                                 Edit
                              </router-link>
                           </div>
                        </div>
                        <div class="pl-lg-4">
                           <div class="row">
                              <div class="col-lg-6">
                                 <div class="form-group has-label">
                                    <label class="form-control-label">
                                       Username
                                    </label>
                                    <label class="form-control form-control-alternative">
                                       {{instaaccount.user_info.name}}
                                    </label>
                                 </div>
                              </div>
                              <div class="col-lg-6">
                                 <label class="form-control-label">
                                    Email
                                 </label>
                                 <label class="form-control form-control-alternative">
                                    {{instaaccount.user_info.email}}
                                 </label>
                              </div>
                           </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Demographics</h6>
                        <div class="pl-lg-4">
                           <edit-insights
                              :username="instaaccount.username"
                              :insights_picture="instaaccount.insights_picture"
                              :demographics="demographics"
                              v-if="instaaccount.insights_picture"
                              @change="insightsChanged"
                           />
                           <p v-else>This account has no insights picture yet.</p>
                        </div>
                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">Product Information</h6>
                        <div class="pl-lg-4">
                           <edit-product-detail
                              :product="instaaccount.product"
                              v-if="instaaccount.product"
                              @change="productDetailChanged"
                           />
                           <p v-else>This account has no pricing plan yest.</p>
                        </div>
                     </form>
                  </template>
               </card>
            </div>
         </div>
         <div class="row" v-else>
            Cannot load data
         </div>
      </div>
   </div>
</template>
<script>
   import httpService from "../services/http"
   import Loading from 'vue-loading-overlay'
   import EditInsights from "./Product/EditInsights"
   import EditProductDetail from "./Product/EditProductDetail"
   import {$n, historyBack} from '../helper'
   export default {
      name: 'edit-product',
      data() {
         return {
            loading: true,
            instaaccount: null
         }
      },
      components: {
         Loading, EditInsights, EditProductDetail
      },
      methods: {
         historyBack,
         updateData: function() {
            return httpService.get(`/instaaccounts/${this.$route.params.id}/adminshow`).then(res => {
               this.instaaccount = res.data.data
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot get data")
            })
         },
         insightsChanged: function(model) {
            this.instaaccount.demographics = model
         },
         productDetailChanged: function(model) {
            this.instaaccount.product = model
         },
         saveProduct: function() {
            const payload = {}
            payload.verified = this.instaaccount.verified ? true : false
            payload.allowed = this.instaaccount.allowed ? true : false
            payload.product = this.instaaccount.product
            payload.demographics = { age: [], gender:[], country: [] }
            if (this.instaaccount.demographics) {
               ['age', 'gender', 'country'].forEach(demoKey => {
                  if (this.instaaccount.demographics[demoKey]) {
                     this.instaaccount.demographics[demoKey].forEach(dg => {
                        if(dg.name) {
                           payload.demographics[demoKey].push({
                              name: dg.name,
                              percent: $n(dg.percent)
                           })
                        }
                     })
                  }
               })
            }
            httpService.put(`/instaaccounts/${this.$route.params.id}/adminedit`, payload).then(res => {
               // back up user info because response will not return user info
               const userinfo = this.instaaccount.user_info
               this.instaaccount = res.data.data
               this.instaaccount.user_info = userinfo
               this.$noty.info("Updated successfully")
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot save data")
            })
         }
      },
      computed: {
         getAverageRating: function() {
            if (this.instaaccount.ratings) {
               let totalRatingCount = 0;
               let totalRating = 0;
               for (let key in this.instaaccount.ratings) {
                  ['communication', 'professionalism', 'recommendation'].forEach(ratingKey => {
                     totalRatingCount++;
                     totalRating += this.instaaccount.ratings[key][ratingKey] || 0
                  })
               }
               if (totalRatingCount > 0) {
                  return totalRating / totalRatingCount
               } else {
                  return "N/A"
               }
            } else {
               return "N/A"
            }
         },
         // ensures country demographics data has length equal to 5
         demographics: function() {
            if (!this.instaaccount.demographics) {
               return  {
                  age: [
                     { name: '13-17', percent: 0 },
                     { name: '18-24', percent: 0 },
                     { name: '25-34', percent: 0 },
                     { name: '35-44', percent: 0 },
                     { name: '45-54', percent: 0 },
                     { name: '55-64', percent: 0 },
                     { name: '65+', percent: 0 }
                  ],
                  gender: [
                     { name: 'Men', percent: 0 },
                     { name: 'Women', percent: 0 }
                  ],
                  country: [
                     { name: '', percent: 0 },
                     { name: '', percent: 0 },
                     { name: '', percent: 0 },
                     { name: '', percent: 0 },
                     { name: '', percent: 0 }
                  ]
               }
            }
            const countryDemo = this.instaaccount.demographics.country
            const defaultDemoLength = 5
            if (countryDemo && countryDemo.length) {
               if (countryDemo.length >=defaultDemoLength ) {

               } else {
                  const temp = [...countryDemo]
                  for (let i=0; i<defaultDemoLength-countryDemo.length; i++) {
                     temp.push({
                        name: '', percent: 0
                     })
                  }
                  this.instaaccount.demographics.country = temp
               }
            } else {
               this.instaaccount.demographics.country = [
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 }
               ]
            }
            return this.instaaccount.demographics
         }
      },
      mounted() {
         this.updateData().finally(() => {this.loading = false})
      }
   };
</script>
<style></style>
