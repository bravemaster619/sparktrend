<template>
   <div class="col-12">
      <div class="row price-title mb-3">
         <h4>{{$t("Add Product")}}</h4>
      </div>
      <form @submit.prevent="addproduct">
         <div class="text-area-wrapper row mb-4">
            <div class="price-info-header mb-2">
               {{$t("Describe Your Page")}}
            </div>
            <textarea v-model="description" class="form-control product-information"/>
         </div>
         <div class="row price-info mb-4">
            <div class="col-12">
               <h5 class="mt-3 mb-4">{{$t("Select Niche")}}</h5>
            </div>
            <div class="col-12">
               <div class="row">
                  <div class="col-4 mb-3">
                     <select class="form-control" v-model="niche">
                        <option v-for="(niche_option, index) in niche_options" :key="index" :value="niche_option.text"
                                :selected="niche === niche_option.text">
                           {{$t(niche_option.text)}}
                        </option>
                     </select>
                  </div>
                  <div class="col-5 ml-5 mt-2">
                     <span>{{$t("Please select niche. Buyers can find your product by niche.")}}</span>
                  </div>
               </div>
            </div>
         </div>
         <div class="row price-info mb-4">
            <div class="col-12">
               <h5 class="mt-3 mb-4">{{$t("Single Post")}}</h5>
            </div>
            <div class="col-md-8">

               <div class="col-12">
                  <div class="row mb-3">
                     <div class="w-26 mr-3">
                        <select class="form-control" v-model="single_price_model.time">
                           <option value="4">4 {{$t("hours")}}</option>
                           <option value="12">12 {{$t("hours")}}</option>
                           <option value="24">24 {{$t("hours")}}</option>
                           <option value="48">48 {{$t("hours")}}</option>
                           <option value="72">72 {{$t("hours")}}</option>
                           <option value="96">4 {{$t("days")}}</option>
                           <option value="120">5 {{$t("days")}}</option>
                           <option value="144">6 {{$t("days")}}</option>
                           <option value="186">7 {{$t("days")}}</option>
                           <option value="999999">{{$t("Permanent")}}</option>
                        </select>
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="$Price" class="form-control" v-model="single_price_model.price">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="Bio URL Price" class="form-control"
                               v-model="single_price_model.bio_price">
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-theme w-75" @click="addSinglePost" type="button">
                           <i class="ni ni-fat-add"></i>
                        </button>
                     </div>
                  </div>
                  <div class="row mb-3" v-for="(single_price, index) in single_prices" :key="index">
                     <div class="w-26 mr-3">
                        <input type="text" :value="single_price.time > 186 ? $t('Permanent') : single_price.time + ' ' + $t('hours')" readonly class="form-control">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="single_price.price" placeholder="$Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="single_price.bio_price" placeholder="Bio URL Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-red w-75" type="button"
                                @click="deleteSinglePost(index)">
                           <i class="ni ni-fat-delete"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-4 mt-1">
               <div class="row">
                  <p>
                     {{$t("Single post is simple post of 1 picture and a caption.")}}
                  </p>
               </div>
            </div>
         </div>
         <div class="row price-info mb-4">
            <div class="col-12">
               <h5 class="mt-3 mb-4">{{$t("Multiple Post")}}</h5>
            </div>
            <div class="col-md-8">

               <div class="col-12">
                  <div class="row mb-3">
                     <div class="w-26 mr-3">
                        <select class="form-control" v-model="multiple_price_model.time">
                           <option value="4">4 {{$t("hours")}}</option>
                           <option value="12">12 {{$t("hours")}}</option>
                           <option value="24">24 {{$t("hours")}}</option>
                           <option value="48">48 {{$t("hours")}}</option>
                           <option value="72">72 {{$t("hours")}}</option>
                           <option value="96">4 {{$t("days")}}</option>
                           <option value="120">5 {{$t("days")}}</option>
                           <option value="144">6 {{$t("days")}}</option>
                           <option value="186">7 {{$t("days")}}</option>
                           <option value="999999">{{$t("Permanent")}}</option>
                        </select>
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="$Price" class="form-control"
                               v-model="multiple_price_model.price">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="Bio URL Price" class="form-control"
                               v-model="multiple_price_model.bio_price">
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-theme w-75" @click="addMultiplePost"
                                type="button">
                           <i class="ni ni-fat-add"></i>
                        </button>
                     </div>
                  </div>
                  <div class="row mb-3" v-for="(multiple_price, index) in multiple_prices" :key="index">
                     <div class="w-26 mr-3">
                        <input type="text" :value="multiple_price.time > 186 ? $t('Permanent') : multiple_price.time + ' ' + $t('hours')" readonly class="form-control">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="multiple_price.price" placeholder="$Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="multiple_price.bio_price" placeholder="Bio URL Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-red w-75" type="button"
                                @click="deleteMultiplePost()">
                           <i class="ni ni-fat-delete"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-4 mt-1">
               <div class="row">
                  <p>
                     {{$t("Multiple post is simple post of multiple pictures and a caption.")}}
                  </p>
               </div>
            </div>
         </div>
         <div class="row price-info mb-4">
            <div class="col-12">
               <h5 class="mt-3 mb-4">{{$t("Story")}}</h5>
            </div>
            <div class="col-md-8">

               <div class="col-12">
                  <div class="row mb-3">
                     <div class="w-26 mr-3">
                        <select class="form-control" v-model="story_price_model.time">
                           <option value="4">4 {{$t("hours")}}</option>
                           <option value="12">12 {{$t("hours")}}</option>
                           <option value="24">24 {{$t("hours")}}</option>
                           <option value="48">48 {{$t("hours")}}</option>
                           <option value="72">72 {{$t("hours")}}</option>
                           <option value="96">4 {{$t("days")}}</option>
                           <option value="120">5 {{$t("days")}}</option>
                           <option value="144">6 {{$t("days")}}</option>
                           <option value="186">7 {{$t("days")}}</option>
                           <option value="999999">{{$t("Permanent")}}</option>
                        </select>
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="$Price" class="form-control" v-model="story_price_model.price">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" placeholder="Bio URL Price" class="form-control"
                               v-model="story_price_model.bio_price">
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-theme w-75" @click="addStoryPost" type="button">
                           <i class="ni ni-fat-add"></i>
                        </button>
                     </div>
                  </div>
                  <div class="row mb-3" v-for="(story_price, index) in story_prices" :key="index">
                     <div class="w-26 mr-3">
                        <input type="text" readonly class="form-control" :value="story_price.time > 186 ? $t('Permanent') : story_price.time + ' ' + $t('hours')">
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="story_price.price" placeholder="$Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-26 mr-3">
                        <input type="text" :value="story_price.bio_price" placeholder="Bio URL Price" readonly
                               class="form-control">
                        <!--                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>-->
                     </div>
                     <div class="w-15">
                        <button class="btn price-btn text-center color-red w-75" type="button"
                                @click="deleteStoryPost()">
                           <i class="ni ni-fat-delete"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-4 mt-1">
               <div class="row">
                  <p>
                     {{$t("Story post is a series of pictures and captions.")}}
                  </p>
               </div>
            </div>
         </div>
         <div class="row d-flex justify-content-between">
            <button class="btn button-basic text-uppercase" type="button" @click="onBack">{{$t("Back")}}</button>
            <button class="btn btn-grad-effect" type="submit">
               {{$t("finish")}}
            </button>
         </div>
      </form>
   </div>
</template>

<script>
   import {addProductService} from "../../../services";
   import niches from '../../../config/niches';
   export default {
      name: "AddProductPrice",
      props: {
         _id: {
            required: true
         },
         tab_id: {
            required: true
         },
         instaaccount: {
            required: false
         }
      },
      event: [
         'back'
      ],
      data() {
         const defaultData = {
            single_price_model: {
               time: "",
               price: "",
               bio_price: ""
            },
            multiple_price_model: {
               time: "",
               price: "",
               bio_price: ""
            },
            story_price_model: {
               time: "",
               price: "",
               bio_price: ""
            },
            niche_options: niches
         }
         if (this.instaaccount && this.instaaccount.product) {
            const data = {}
            const product = this.instaaccount.product
            data.description = product.description
            data.niche = product.niches
            let singlePrices = []
            let multiplePrices = []
            let storyPrices = []
            if (product.categories && product.categories.length) {
               product.categories.forEach(pricing => {
                  if (pricing.type === "Single") {
                     singlePrices = pricing.pricing
                  }
                  if (pricing.type === "Multiple") {
                     multiplePrices = pricing.pricing
                  }
                  if (pricing.type === "Story") {
                     storyPrices = pricing.pricing
                  }
               })
            }
            data.single_prices = singlePrices
            data.multiple_prices = multiplePrices
            data.story_prices = storyPrices
            return ({
               ...defaultData, ...data
            })
         } else {
            return {
               ...defaultData,
               description: "",
               single_prices: [],
               multiple_prices: [],
               story_prices: [],
               niche: "",
            }
         }
      },
      mounted() {
         window.vuetemp = this
      },
      methods: {
         addSinglePost() {
            if (this.isEmpty(this.single_price_model.time) ||
               this.isEmpty(this.single_price_model.price) ||
               this.isEmpty(this.single_price_model.bio_price)) {
               return;
            }
            let model = {};

            model.time = parseInt(this.single_price_model.time);
            model.bio_price = parseInt(this.single_price_model.bio_price);
            model.price = parseInt(this.single_price_model.price);

            this.single_prices.push(model);

            this.single_price_model.time = "";
            this.single_price_model.price = "";
            this.single_price_model.bio_price = "";
         },
         addMultiplePost() {
            if (this.isEmpty(this.multiple_price_model.time) ||
               this.isEmpty(this.multiple_price_model.price) ||
               this.isEmpty(this.multiple_price_model.bio_price)) {
               return;
            }
            let model = {};

            model.time = parseInt(this.multiple_price_model.time);
            model.bio_price = parseInt(this.multiple_price_model.bio_price);
            model.price = parseInt(this.multiple_price_model.price);

            this.multiple_prices.push(model);

            this.multiple_price_model.time = "";
            this.multiple_price_model.price = "";
            this.multiple_price_model.bio_price = "";
         },
         addStoryPost() {
            if (this.isEmpty(this.story_price_model.time) ||
               this.isEmpty(this.story_price_model.price) ||
               this.isEmpty(this.story_price_model.bio_price)) {
               return;
            }
            let model = {};

            model.time = parseInt(this.story_price_model.time);
            model.bio_price = parseInt(this.story_price_model.bio_price);
            model.price = parseInt(this.story_price_model.price);

            this.story_prices.push(model);

            this.story_price_model.time = "";
            this.story_price_model.price = "";
            this.story_price_model.bio_price = "";
         },
         deleteSinglePost(index) {
            this.single_prices.splice(index, 1);
         },
         deleteMultiplePost(index) {
            this.multiple_prices.splice(index, 1);
         },
         deleteStoryPost(index) {
            this.story_prices.splice(index, 1);
         },
         addproduct() {
            let data = this.gatherData();
            if (!data) {
               this.$toastr.error(this.$t("instaaccount.error.invalid_data"))
               return
            }
            addProductService.addProduct(data, this._id).then(({data}) => {
               this.$toastr.success(this.$t("instaaccount.success.product_saved"))
               this.$router.push("/myproducts");
            })
               .catch(({response}) => {
                  const messageKey = response.data && response.data.message && this.$te(`instaaccount.error.${response.data.message}`) ? `instaaccount.error.${response.data.message}` : 'error.default'
                  this.$toastr.error(this.$t(messageKey))
               })
         },
         onBack() {
            this.$emit('back', this.tab_id)
         },
         gatherData() {
            if (!this.description) {
               return false;
            }
            if (!this.niche) {
               return false;
            }
            let categories = []
            let res = false;
            if (this.single_prices.length) {
               categories.push({type: "Single", pricing: this.single_prices})
               res = true;
            }
            if (this.multiple_prices.length) {
               categories.push({type: "Multiple", pricing: this.multiple_prices})
               res = true;
            }
            if (this.story_prices.length) {
               categories.push({type: "Story", pricing: this.story_prices})
               res = true;
            }

            if (res) {
               res = {
                  description: this.description,
                  niches: this.niche,
                  banner_img: "",
                  categories
               };
               return res;
            }
            return res;
         }
      }
   }
</script>

<style lang="scss" scoped>
   .price-title {
      border: none;
      border-bottom: 1px solid #cad1d7;
   }

   .product-information {
      min-height: 150px
   }

   .price-info {
      border: 1px solid #cad1d7;
      border-radius: 0.25rem;
   }

   .price-btn {
      border-radius: 5px;
      font-size: 1rem;
      background: #eee;
      border: 1px solid #cad1d7;
   }

   .price-add-info {
      font-size: 0.75rem;
   }

   .w-26 {
      width: 26% !important;
   }
</style>