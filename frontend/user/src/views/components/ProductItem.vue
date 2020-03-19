<template>
   <div class="col-6 col-md-4 col-lg-4 p-2 product-item">
      <router-link :to="'/products/' + instaaccount._id" class="text-light font-weight-300 d-table border border-light">
         <div class="product-header text-center">
            <img class="w-100 product-banner"
                 src="https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7"
                 v-bind:alt="instaaccount.username + ' banner'" style="visibility: hidden">
            <img class="m-auto profile-img" v-bind:src="instaaccount.profile_img"
                 v-bind:alt="instaaccount.username + ' profile image'">
         </div>
         <div class="product-body pt-1 pb-3 px-3">
            <div class="product-title text-center">
               <span class="font-weight-bold text-dark">@{{instaaccount.username}}</span>
            </div>
            <div class="product-profile my-1">
               <div class="row">
                  <div class="col d-none d-md-block text-right">{{$t("Followers")}}:</div>
                  <div class="col d-none d-md-block"><i class="fa fa-users mr-2"></i>{{getFormattedFollowerCount}}</div>
                  <div class="col d-block d-md-none">{{$t("Followers")}}: <i class="fa fa-users mr-2"></i>{{getFormattedFollowerCount}}
                  </div>
               </div>
               <div class="row">
                  <div class="col d-none d-md-block text-right">{{$t("Starts From")}}:</div>
                  <div class="col d-none d-md-block"><i class="fa fa-usd mr-2"></i>{{getMinPrice}}</div>
                  <div class="col d-block d-md-none">{{$t("Starts From")}}: <i class="fa fa-usd mr-2"></i>{{getMinPrice}}
                  </div>
               </div>
               <div class="row">
                  <div class="col d-none d-md-block text-right">{{$t("Rating")}}:</div>
                  <div class="col d-none d-md-block">
                     <star-rating
                        :star-size="12"
                        :glow="10"
                        :increment="0.5"
                        :show-rating="false"
                        :read-only="true"
                        v-model="getAverageRating"/>
                  </div>
                  <div class="col d-block d-md-none">{{$t("Rating")}}:
                     <star-rating
                        :star-size="10"
                        :glow="10"
                        :increment="0.5"
                        :show-rating="false"
                        :read-only="true"
                        :inline="true"
                        v-model="getAverageRating"/>
                  </div>
               </div>
               <div class="row">
                  <div class="col d-none d-md-block text-right">{{$t("Niches")}}:</div>
                  <div class="col d-none d-md-block">{{instaaccount.product.niches}}</div>
                  <div class="col d-block d-md-none">{{$t("Niches")}}: {{instaaccount.product.niches}}</div>
               </div>
            </div>
            <percent-progress v-for="(country, index) in instaaccount.demographics.country.slice(0,3)"
                              :percent="country.percent"
                              :key="index"
                              :caption="country.name"
                              :color="colors[index % colors.length]"
            ></percent-progress>
         </div>
      </router-link>
   </div>
</template>
<script>
   import PercentProgress from "./PercentProgress"
   import StarRating from 'vue-star-rating'

   export default {
      components: {PercentProgress, StarRating},
      data() {
         return {
            colors: ['success', 'primary', 'warning']
         }
      },
      props: {
         instaaccount: Object
      },
      computed: {
         getFormattedFollowerCount: function () {
            if (parseInt(this.instaaccount.follower_count) < 100) {
               return this.instaaccount.follower_count
            }
            let formatted = (parseInt(this.instaaccount.follower_count) / 1000).toFixed(1)
            if (formatted > 1000) {
               return `${(formatted / 1000).toFixed(2)}M`
            }
            return `${formatted}K`
         },
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
         }
      }
   }
</script>