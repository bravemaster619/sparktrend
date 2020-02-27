<template>
   <div class="row">
      <div class="col-12">
         <div class="row vid-parent">
            <loading
               :active="loading"
               :is-full-page="false"
               loader="dots"
               color="#5e72e4"
            ></loading>
            <div class="col-12 col-md-9" v-if="instaaccount">
               <div class="row product-detail">
                  <div class="col-12 product-detail-header">
                     <div class="d-flex flex-md-row flex-column">
                        <div class="flex-1 m-auto">
                           <div class="text-right p-4">
                              <img class="img-round w-100" :src="instaaccount.profile_img">
                           </div>
                        </div>
                        <div class="flex-5 d-flex flex-column w-100">
                           <div class="my-auto">
                              <div class="row mb-2">
                                 <div class="col py-0">
                                    <h4 class="my-auto pl-0 pl-md-2 text-center text-lg-left">@{{instaaccount.username}}</h4>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-4 text-center py-0">
                                    <div><strong
                                       class="text-primary">{{instaaccount.follower_count}}</strong>
                                    </div>
                                    <label>{{$t("Followers")}}</label>
                                 </div>
                                 <div class="col-4 text-center py-0 border border-top-0 border-bottom-0">
                                    <div class="d-flex justify-content-center">
                                        <star-rating
                                           :star-size="16"
                                           :glow="10"
                                           :increment="0.5"
                                           :show-rating="false"
                                           :read-only="true"
                                           v-model="getAverageRating"/>
                                    </div>
                                    <label>{{$t("Rating")}}</label>
                                 </div>
                                 <div class="col-4 text-center py-0">
                                    <div><strong class="text-primary">${{getMinPrice}}</strong></div>
                                    <label>{{$t("Starts From")}}</label>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-12 product-detail-body">
                     <p v-if="instaaccount.total_shoutout">{{$t("Shoutout completed: ")}}
                        {{$t("shoutout_history", [$num(instaaccount.total_shoutout),
                        $num(instaaccount.completed_shoutout)])}}</p>
                     <p v-else>{{$t("Has not completed a shoutout yet.")}}</p>
                     <pre>{{instaaccount.product.description}}</pre>
                  </div>
               </div>
               <div class="row product-purchase">
                  <div class="col-12 form-group">
                     <label class="col-form-label">{{$t("Category")}}
                        <button class="btn btn-sm btn-primary ml-2" @click="modalStatus.whatsThis = true">
                           {{$t("What is this?")}}
                        </button>
                     </label>
                     <select class="form-control"
                             @change="onSelectOption">
                        <option value="0" v-bind:selected="!selectedCategory">{{$t("Select Categories")}}
                        </option>
                        <option v-for="(c, index) in optionCategories" :key="index" v-bind:value="c.value"
                                v-bind:selected="selectedCategory && selectedCategory.type==c.text">{{c.text}}
                        </option>
                     </select>
                     <modal :show.sync="modalStatus.whatsThis">
                        <h6 slot="header" class="modal-title" id="modal-title-whatsthis">{{$t("Category Info")}}</h6>
                        <category-info-carousel></category-info-carousel>
                     </modal>
                  </div>
                  <div class="col-12 form-group">
                     <label class="col-form-label">{{$t("Time")}}</label>
                     <select class="form-control" @change="onSelectTime">
                        <option value="0" :selected="!this.selectedPricing">{{$t("Select Duration")}}</option>
                        <option v-for="(t, index) in optionTimes" :key="index" v-bind:value="t.value">
                           {{t.text}}
                        </option>
                     </select>
                  </div>
                  <div class="col-12 form-group" v-if="selectedPricing">
                     <div class="custom-control custom-checkbox">
                        <input id="bioUrlCheck" class="custom-control-input" type="checkbox"
                               @change="onBioUrlCheck" v-bind:checked="this.form.with_bio">
                        <label for="bioUrlCheck" class="custom-control-label">{{$t("With Bio URL")}}</label>
                     </div>
                  </div>
                  <div class="col-12 form-group d-flex justify-content-between" v-if="selectedPricing">
                     <label class="col-form-label">{{$t("Price")}}</label>
                     <strong class="text-primary col-form-label">${{getPrice}}</strong>
                  </div>
                  <div class="col-12 form-group">
                     <button type="link" class="btn btn-primary w-100 text-uppercase btn-grad-effect"
                             @click="onBuyNow"><i class="fa fa-cart"></i> {{$t("Buy Now")}}
                     </button>
                  </div>
                  <modal :show.sync="modalStatus.buyNow">
                     <h6 slot="header" class="modal-title" id="modal-title-default">{{$t("Confirm")}}</h6>

                     <label class="col-form-label">{{$t("Your Post")}}</label>
                     <small class="d-block text-danger" v-if="error.post">{{$t(error.post)}}</small>
                     <multiple-file-upload :max-file-count="this.maxFileCount"
                                           @files-changed="onFilesChanged"></multiple-file-upload>

                     <label class="col-form-label">{{$t("Date")}} ({{$t("Current Timezone")}}: UTC
                        {{utcOffSet}})</label>
                     <small class="d-block text-danger" v-if="error.start_from">{{$t(error.start_from)}}</small>
                     <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker
                           slot-scope="{focus, blur}"
                           @on-open="focus"
                           @on-close="blur"
                           :config="{allowInput: true, dateFormat: 'Y-m-d H:i:S', minDate}"
                           class="form-control datepicker"
                           v-model="form.start_from">
                        </flat-picker>
                     </base-input>
                     <small class="d-block">* {{$t("You can only order shoutout minimum 48 hours from now")}}</small>

                     <label class="col-form-label">{{$t("Caption")}}</label>
                     <small class="d-block text-danger" v-if="error.caption">{{$t(error.caption)}}</small>
                     <textarea class="form-control" v-model="form.caption"></textarea>

                     <div v-if="form.with_bio">
                        <label class="col-form-label">{{$t("Bio URL")}}</label>
                        <small class="d-block text-danger" v-if="error.bio_url">{{$t(error.bio_url)}}</small>
                        <input class="form-control" v-model="form.bio_url"/>
                     </div>

                     <div v-if="this.selectedCategory && this.selectedCategory.type==='Story'">
                        <label class="col-form-label">{{$t("Swipe up URL")}}</label>
                        <small class="d-block text-danger"
                               v-if="error.swipe_up_url">{{$t(error.swipe_up_url)}}</small>
                        <input class="form-control" v-model="form.swipe_up_url"/>
                     </div>

                     <label class="col-form-label">{{$t("Additional Information")}}</label>
                     <textarea class="form-control" v-model="form.additional_info"></textarea>
                     <template slot="footer">
                        <base-button type="link" class="mr-auto text-uppercase"
                                     @click="modalStatus.buyNow=false">{{$t("Close")}}
                        </base-button>
                        <base-button type="primary" class="text-uppercase btn-grad-effect" @click="onOrder">
                           {{$t("Order Shoutout")}}
                        </base-button>
                     </template>
                  </modal>
               </div>
            </div>
            <div class="col-12 col-md-3 d-block">
               <h6 class="mt-4">{{$t("Related Page")}}</h6>
               <related-page />
            </div>
         </div>
      </div>
      <div class="col-12" v-if="instaaccount">
         <div class="row align-items-center">
            <div class="col-12 col-md-4">
               <demographic-chart :data-collection="getChartData('age')"></demographic-chart>
            </div>
            <div class="col-12 col-md-6">
               <h6 class="mt-2">{{$t("Age Range")}}</h6>
               <p>{{$t("demograph_chart.age_range_desc")}}</p>
            </div>
         </div>
         <div class="row align-items-center">
            <div class="col-12 col-md-4">
               <demographic-chart :data-collection="getChartData('country')"></demographic-chart>
            </div>
            <div class="col-12 col-md-4">
               <h6 class="mt-2">{{$t("Location")}}</h6>
               <p>{{$t("demograph_chart.location_desc")}}</p>
            </div>
         </div>
         <div class="row align-items-center">
            <div class="col-12 col-md-4">
               <demographic-chart :data-collection="getChartData('gender')"></demographic-chart>
            </div>
            <div class="col-12 col-md-6">
               <h6 class="mt-2">{{$t("Location")}}</h6>
               <p>{{$t("demograph_chart.gender_desc")}}</p>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import Vue from "vue";
   import VueToastr2 from 'vue-toastr-2';
   import DemographicChart from "./components/Product/DemographicChart";
   import Modal from "@/components/Modal.vue";
   import CategoryInfoCarousel from "./components/Product/CategoryInfoCarousel";
   import {BFormFile} from 'bootstrap-vue';
   import MultipleFileUpload from "./components/Product/MultipleFileUpload";
   import httpService from "../services/http.service"
   import {authService} from "../services/auth.service"
   import 'vue-toastr-2/dist/vue-toastr-2.min.css';
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css';
   import flatPicker from "vue-flatpickr-component";
   import "flatpickr/dist/flatpickr.css";
   import StarRating from 'vue-star-rating'
   import RelatedPage from "./components/RelatedPage";
   window.toastr = require('toastr')
   const moment = require('moment')
   Vue.use(VueToastr2);

   export default {
      components: {
         RelatedPage,
         flatPicker, MultipleFileUpload, DemographicChart, Modal, CategoryInfoCarousel, BFormFile, Loading, StarRating
      },
      data() {
         return {
            loading: true,
            instaaccount: null,
            maxFileCount: 1,
            chartOptions: {
               responsive: true
            },
            modalStatus: {
               whatsThis: false,
               buyNow: false
            },
            selectedCategory: null,
            selectedPricing: null,
            form: {
               category: '',
               with_bio: false,
               start_from: null,
               caption: '',
               additional_info: '',
               bio_url: '',
               swipe_up_url: '',
               files: [],
            },
            error: {
               post: '',
               start_from: '',
               caption: '',
               bio_url: '',
               swipe_up_url: '',
            }
         }
      },
      methods: {
         $num: function(num, defaultValue = undefined, allowNegative = false) {
            if (!num) {
               num = 0;
            }
            num = Number(num)
            if (isNaN(num)) {
               if (defaultValue === undefined) {
                  throw new Error('Given argument is NaN')
               } else {
                  return defaultValue
               }
            }
            if (num === Infinity) {
               if (defaultValue === undefined) {
                  throw new Error('Given argument is infinity')
               } else {
                  return defaultValue
               }
            }
            if (!allowNegative && num < 0) {
               if (defaultValue === undefined) {
                  throw new Error('Given argument is negative')
               } else {
                  return defaultValue
               }
            }
            return num
         },
         getChartData: function (category) {
            let data = this.instaaccount.demographics[category]
            let chartData = {
               labels: [],
               datasets: [{
                  label: "",
                  backgroundColor: ['#78CCB9', '#1DBCF1', '#CAF50B', '#8DD1E1', '#A38BC5', '#EB9168', '#24438D'],
                  data: []
               }]
            };
            data.forEach((elem) => {
               chartData.labels.push(elem.name);
               chartData.datasets[0].data.push(elem.percent);
            });
            return chartData;
         },
         onSelectOption: function (e) {
            if (e.target.selectedOptions[0]) {
               const text = e.target.selectedOptions[0].text
               this.selectedPricing = null
               this.form.with_bio = false
               let selectedCategory = null
               if (text) {
                  this.instaaccount.product.categories.forEach(c => {
                     if (c.type == text) {
                        selectedCategory = c
                     }
                  })
               }
               this.selectedCategory = selectedCategory
               if (this.selectedCategory.type === "Multiple") {
                  this.maxFileCount = 10
               } else {
                  this.maxFileCount = 1
               }
            }
         },
         onSelectTime: function (e) {
            const idx = e.target.value;
            let selectedPricing = null;
            if (idx && this.selectedCategory && this.selectedCategory['pricing']) {
               selectedPricing = this.selectedCategory['pricing'][idx - 1]
            }
            this.form.with_bio = false;
            this.selectedPricing = selectedPricing
            this.selectedPricing.idx = idx - 1
         },
         onBioUrlCheck: function (e) {
            this.form.with_bio = !(this.form.with_bio)
         },
         onBuyNow: function () {
            if (!authService.getCurrentUser()) {
               this.$router.push({name: 'login', params: {nextUrl: location.href}})
               return
            }
            if (this.selectedPricing) {
               this.modalStatus.buyNow = true
            } else {
               this.$toastr.error("Please choose any of the category and time to continue", "", {timeOut: 3000});
               return
            }

         },
         onFilesChanged: function (files) {
            this.form.files = files
         },
         onOrder: function () {
            this.$swal({
               title: this.$t("Are you sure?"),
               text: this.$t("Do you really want to order this shoutout?"),
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  let formData = new FormData();
                  let self = this

                  // --- begin base info (insta_id, category, pricing_idx, with_bio)  ---
                  formData.append('insta_id', self.instaaccount._id)
                  if (!this.selectedCategory || !this.selectedPricing) {
                     this.$toastr.error(this.$t("Please choose any of the category and time to continue"), "", {timeOut: 3000});
                     return
                  }
                  formData.append('category', self.selectedCategory.type)
                  formData.append('pricing_idx', self.selectedPricing.idx)
                  formData.append('with_bio', self.form.with_bio ? 'true' : '')
                  // ---  end base info (insta_id, category, pricing_idx, with_bio)   ---

                  // --- begin posts ---
                  if (!this.form.files || !this.form.files.length) {
                     this.error.post = "Upload your post"
                     return
                  } else if (this.form.files.length > 10) {
                     this.error.post = "Cannot upload more than 10 posts"
                     return
                  }
                  if (formData.get('category') !== "Multiple" && this.form.files.length > 1) {
                     this.error.post = "Cannot upload multiple posts in Single category."
                     return
                  }
                  for (let i = 0; i < this.form.files.length; i++) {
                     let file = this.form.files[i]
                     formData.append(`posts[${i}]`, file)
                  }
                  this.error.post = ''
                  // ---  end posts  ---

                  // --- begin start_from ---
                  if (!this.form.start_from) {
                     this.error.start_from = "Please select start date"
                     return
                  }
                  let start_from = null
                  try {
                     start_from = new Date(self.form.start_from)
                  } catch (e) {
                     this.error.start_from = "Invalid date format"
                     return
                  }
                  this.error.start_from = ''
                  formData.append('start_from', start_from)
                  // ---  end start_from  ---

                  // --- begin caption ---
                  if (!this.form.caption) {
                     this.error.caption = "Please enter caption"
                     return
                  }
                  this.error.caption = ''
                  formData.append('caption', self.form.caption.substr(0, 500))
                  // ---  end caption  ---

                  // --- begin with_bio ---
                  if (formData.get('with_bio') === 'true') {
                     if (!this.form.bio_url) {
                        this.error.bio_url = "Please enter bio url"
                        return
                     }
                     formData.append('bio_url', this.form.bio_url)
                  }
                  // ---  end with_bio  ---

                  // --- begin swipe_up_url ---
                  if (this.selectedCategory.type === 'Story') {
                     if (this.form.swipe_up_url) {
                        formData.append('swipe_up_url', this.form.swipe_up_url)
                     }
                  }
                  formData.append('additional_info', self.form.additional_info.substr(0, 500))
                  // ---  end swipe_up_url  ---
                  // finally
                  httpService.post('orders/new', formData, {
                     'Content-Type': 'multipart/form-data'
                  })
                     .then(res => {
                        if (res.status == 200 && res.data && res.data.data._id) {
                           this.$router.push({name: 'checkout', params: {id: res.data.data._id}})
                        } else {
                           this.$toastr.error(this.$t("error.default"), "", {timeOut: 3000});
                        }
                     })
                     .catch(e => {
                        let messageKey = 'error.default'
                        if (e.response.data && e.response.data.errors) {
                           messageKey = this.$te(`order.error.${e.response.data.errors}`) ? `order.error.${e.response.data.errors}` : 'error.default'
                           this.$toastr.error(this.$t(messageKey))
                        }
                        window.console.error(e)
                     })
               }
            })
         }
      },
      computed: {
         getMinPrice: function () {
            let minPrice
            try {
               minPrice = this.instaaccount.product.categories[0].pricing[0].price
            } catch (e) {
               window.console.warn("This product has no pricing plan.")
            }
            const categories = this.instaaccount.product.categories
            categories.forEach(c => {
               c.pricing.forEach(p => {
                  if (minPrice > p.price) {
                     minPrice = p.price
                  }
               })
            })
            return minPrice
         },
         getSuccessRate: function () {
            if (this.instaaccount.total_shoutout == 0) {
               return "N/A"
            }
            let percent = (this.instaaccount.completed_shoutout / this.instaaccount.total_shoutout * 100).toFixed(0)
            if (isNaN(percent)) {
               return "N/A"
            }
            return `${percent}%`
         },
         getAverageRating: function () {
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
                  return 0
               }
            } else {
               return 0;
            }
         },
         utcOffSet: function () {
            return (new moment()).format("Z")
         },
         optionCategories: function () {
            const categories = this.instaaccount.product.categories;
            let options = [];
            categories.forEach(c => {
               options.push({
                  value: c.id,
                  text: c.type
               })
            });
            return options;
         },
         optionTimes: function () {
            const category = this.selectedCategory;
            let options = [];
            if (category && category.pricing) {
               category.pricing.forEach((p, idx) => {
                  options.push({
                     value: idx + 1,
                     text: `${p.time} hours (with bio URL)`
                  })
               })
            }
            return options;
         },
         getPrice: function () {
            let price = 0;
            if (this.selectedPricing) {
               price = this.form.with_bio ? this.selectedPricing.price + this.selectedPricing.bio_price : this.selectedPricing.price;
            }
            return price.toFixed(2);
         },
         minDate: function () {
            return new Date((new Date).getTime() + 1000 * 3600 * 24 * 2)
         }
      },
      mounted() {
         httpService.get('instaaccounts/' + this.$route.params.id).then((resp) => {
            this.instaaccount = resp.data.data
            this.loading = false
         }).catch((err) => {
            this.$router.push({name: '404'})
         })
         window.vuetemp = this
      }
   }
</script>
<style>

</style>