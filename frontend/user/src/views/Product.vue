<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-md-9">
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
                                                <h4 class="my-auto pl-0 pl-md-2">@{{instaaccount.username}}</h4>
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
                                                <div><strong class="text-primary">{{getSuccessRate}}</strong></div>
                                                <label>{{$t("Success Rate")}}</label>
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
                            <p v-if="instaaccount.total_shoutout">{{$t("Shoutout completed: ")}} {{$t("shoutout_history", [instaaccount.total_shoutout,
                                completed_shoutout])}}</p>
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
                                <option value="0" v-bind:selected="!selectedCategory">{{$t("Select Categories")}}</option>
                                <option v-for="(c, index) in optionCategories" :key="index" v-bind:value="c.value" v-bind:selected="selectedCategory && selectedCategory.type==c.text">{{c.text}}</option>
                            </select>
                            <modal :show.sync="modalStatus.whatsThis">
                                <h6 slot="header" class="modal-title" id="modal-title-whatsthis">{{$t("Cateogry Info")}}</h6>
                                <category-info-carousel></category-info-carousel>
                            </modal>
                        </div>
                        <div class="col-12 form-group">
                            <label class="col-form-label">{{$t("Time")}}</label>
                            <select class="form-control" @change="onSelectTime">
                                <option value="0" v-bind:selected="!selectedPricing">{{$t("Select Duration")}}</option>
                                <option v-for="(t, index) in optionTimes" :key="index" v-bind:value="t.value" v-bind:selected="selectedPricing && selectedPricing.id==t.value">{{t.text}}</option>
                            </select>
                        </div>
                        <div class="col-12 form-group" v-if="selectedPricing">
                            <div class="custom-control custom-checkbox">
                                <input id="bioUrlCheck" class="custom-control-input" type="checkbox" @change="onBioUrlCheck" v-bind:checked="this.withBio">
                                <label for="bioUrlCheck" class="custom-control-label">{{$t("With Bio URL")}}</label>
                            </div>
                        </div>
                        <div class="col-12 form-group d-flex justify-content-between" v-if="selectedPricing">
                            <label class="col-form-label">{{$t("Price")}}</label>
                            <strong class="text-primary col-form-label">${{getPrice}}</strong>
                        </div>
                        <div class="col-12 form-group">
                            <button type="link" class="btn btn-primary w-100 text-uppercase"
                                    @click="onBuyNow"><i class="fa fa-cart"></i> {{$t("Buy Now")}}
                            </button>
                        </div>
                        <modal :show.sync="modalStatus.buyNow">
                            <h6 slot="header" class="modal-title" id="modal-title-default">{{$t("Confirm")}}</h6>
                            <label class="col-form-label">{{$t("Your Post")}}</label>
                            <multiple-file-upload :max-file-count=10></multiple-file-upload>
                            <label class="col-form-label">{{$t("Date")}} ({{$t("Current Timezone")}}: UTC
                                {{utcOffSet}})</label>
                            <date-time-picker></date-time-picker>
                            <label class="col-form-label">{{$t("Caption")}}</label>
                            <textarea class="form-control"></textarea>
                            <label class="col-form-label">{{$t("Additional Information")}}</label>
                            <textarea class="form-control"></textarea>
                            <template slot="footer">
                                <base-button type="link" class="mr-auto text-uppercase"
                                             @click="modalStatus.buyNow=false">{{$t("Close")}}
                                </base-button>
                                <base-button type="primary" class="text-uppercase">{{$t("Order Shoutout")}}
                                </base-button>
                            </template>
                        </modal>
                    </div>
                </div>
                <div class="col-md-3 d-block d-md-none">
                    {{$t("Related Page")}}
                </div>
            </div>
        </div>
        <div class="col-12">
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
   import DateTimePicker from "./components/Product/DateTimePicker";
   import 'vue-toastr-2/dist/vue-toastr-2.min.css';

   window.toastr = require('toastr')
   const moment = require('moment')
   Vue.use(VueToastr2);

   export default {
      components: {
         DateTimePicker, MultipleFileUpload, DemographicChart, Modal, CategoryInfoCarousel, BFormFile
      },
      data() {
         return {
            instaaccount:  {
               "_id": "5e1a11ca10b9e542f82c8665",
               "user_id": "5e1a11ca10b9e542f82c8663",
               "username": "instafashionfeeds",
               "profile_img": "https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=U7n98U2i0OoAX8BMvzo&oh=7b89d55f19d64f55b9f1a7b139ea47b9&oe=5E8D5BFA",
               "follower_count": 332097,
               "insights_picture": "https://cdn.skedsocial.com/wp-content/uploads/2018/03/25141444/Screen-Shot-2018-03-25-at-10.12.28-PM.png",
               "verification_code": "d73238e0",
               "verified": true,
               "allowed": true,
               "type": "business",
               "demographics": {
                  "age": [
                     {
                        "name": "13-17",
                        "percent": 12
                     },
                     {
                        "name": "18-24",
                        "percent": 45
                     },
                     {
                        "name": "25-34",
                        "percent": 27
                     },
                     {
                        "name": "35-44",
                        "percent": 10
                     },
                     {
                        "name": "45-54",
                        "percent": 4
                     },
                     {
                        "name": "55-64",
                        "percent": 1
                     },
                     {
                        "name": "65+",
                        "percent": 1
                     }
                  ],
                  "gender": [
                     {
                        "name": "Men",
                        "percent": 85
                     },
                     {
                        "name": "Women",
                        "percent": 15
                     }
                  ],
                  "country": [
                     {
                        "name": "United States",
                        "percent": 37
                     },
                     {
                        "name": "India",
                        "percent": 7
                     },
                     {
                        "name": "United Kingdom",
                        "percent": 5
                     },
                     {
                        "name": "Indonesia",
                        "percent": 3
                     },
                     {
                        "name": "Brazil",
                        "percent": 2
                     }
                  ]
               },
               "product": {
                  "description": "A stunningly beautiful page with a constant growth of followers, etc. ❤",
                  "banner_img": "https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7",
                  "niches": "Fashion & Style",
                  "categories": [
                     {
                        "type": "Single",
                        "pricing": [
                           {
                              "time": 6,
                              "price": 15,
                              "bio_price": 10
                           },
                           {
                              "time": 12,
                              "price": 20,
                              "bio_price": 10
                           }
                        ]
                     },
                     {
                        "type": "Multiple",
                        "pricing": [
                           {
                              "time": 12,
                              "price": 30.5,
                              "bio_price": 15
                           }
                        ]
                     },
                     {
                        "type": "Story",
                        "pricing": [
                           {
                              "time": 24,
                              "price": 40,
                              "bio_price": 20
                           }
                        ]
                     }
                  ]
               },
               "created_at": "2020-01-11T18:19:54.312Z",
               "updated_at": "2020-01-11T18:19:54.312Z"
            },
            product: {
               url: '/product/1',
               title: '@sampleaccount',
               product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
               niches: 'Fashion & Style',
               description: "A stunningly beautiful page with a constant growth of followers, etc. ❤️\n" +
                  "\n" +
                  "Our Page followers are mostly from USA\n" +
                  "\n" +
                  "You will not regret.\n" +
                  "\n" +
                  "Our first priority is customer satisfaction.\n" +
                  "\n" +
                  "We will try our best to give you good results.\n" +
                  "\n" +
                  "We have 5 years experience in marketing\n" +
                  "\n" +
                  "",
               countries: [
                  {name: 'United States', percent: 89},
                  {name: 'China PRC', percent: 6},
                  {name: 'Italy', percent: 5}
               ],
               user: {
                  profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                  follower_count: '598302'
               },
               success_shout_count: 10,
               failed_shout_count: 2,
               categories: [{
                  id: 1,
                  type: 'Single',
                  pricing: [{
                     id: 1, time: 6, price: 20, bio_price: 10
                  }, {
                     id: 2, time: 12, price: 30, bio_price: 10
                  }]
               }, {
                  id: 2,
                  type: 'Multiple',
                  pricing: [{
                     id: 3, time: 12, price: 30, bio_price: 15
                  }, {
                     id: 4, time: 24, price: 40, bio_price: 15
                  }]
               }, {
                  id: 3,
                  type: 'Story',
                  pricing: [{
                     id: 5, time: 24, price: 60, bio_price: 20
                  }]
               }],
               demographics: {
                  age: [
                     {name: '13-17', percent: 12},
                     {name: '18-24', percent: 45},
                     {name: '25-34', percent: 27},
                     {name: '35-44', percent: 10},
                     {name: '45-54', percent: 4},
                     {name: '55-64', percent: 1},
                     {name: '65+', percent: 1}
                  ],
                  gender: [
                     {name: 'Men', percent: 85},
                     {name: 'Women', percent: 15}
                  ],
                  country: [
                     {name: 'United States', percent: 37},
                     {name: 'India', percent: 7},
                     {name: 'United Kingdom', percent: 5},
                     {name: 'Indonesia', percent: 3},
                     {name: 'Brazil', percent: 2}
                  ]
               },
            },
            chartOptions: {
               responsive: true
            },
            modalStatus: {
               whatsThis: false,
               buyNow: false
            },
            selectedCategory: null,
            selectedPricing: null,
            withBio: false
         }
      },
      methods: {
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
         onSelectOption: function(e) {
            if (e.target.selectedOptions[0]) {
               const text = e.target.selectedOptions[0].text
               this.selectedPricing = null
               this.withBio = false
               let selectedCategory = null
               if (text) {
                  this.instaaccount.product.categories.forEach(c => {
                     if (c.type == text) {
                        selectedCategory = c
                     }
                  })
               }
               this.selectedCategory = selectedCategory;
            }
         },
         onSelectTime: function(e) {
            const idx = e.target.value;
            let selectedPricing = null;
            if (idx && this.selectedCategory && this.selectedCategory['pricing']) {
               selectedPricing = this.selectedCategory['pricing'][idx - 1]
            }
            this.withBio = false;
            this.selectedPricing = selectedPricing
         },
         onBioUrlCheck: function(e) {
            this.withBio = !(this.withBio)
         },
         onBuyNow: function() {
            if (this.selectedPricing) {
               this.modalStatus.buyNow=true
            } else {
                this.$toastr.error("Please choose any of the category and time to continue", "", {timeOut: 3000});
            }
         }
      },
      computed: {
         getMinPrice: function () {
            let minPrice
            try {
               minPrice = this.instaaccount.product.categories[0].pricing[0].price
            } catch(e) {
               console.warn("This product has no pricing plan.")
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
            let percent = (this.instaaccount.completed_shoutout / this.instaaccount.total_shoutout).toFixed(2)
            if (isNaN(percent)) {
               return "N/A"
            }
            return `${percent}%`
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
         getPrice: function() {
            let price = 0;
            if (this.selectedPricing) {
               price = this.withBio ? this.selectedPricing.price + this.selectedPricing.bio_price : this.selectedPricing.price;
            }
            return price.toFixed(2);
         }
      },
      mounted() {
         window.vuetemp = this
      }
   }
</script>
<style>

</style>