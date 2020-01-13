<template>
    <div class="col-6 col-md-4 col-lg-4 p-2 product-item">
        <router-link :to="'/products/' + instaaccount._id" class="text-light font-weight-300 d-table border border-light">
            <div class="product-header text-center">
                <img class="w-100 product-banner" v-bind:src="instaaccount.product.banner_img" v-bind:alt="instaaccount.username + ' banner'">
                <img class="m-auto profile-img" v-bind:src="instaaccount.profile_img" v-bind:alt="instaaccount.username + ' profile image'">
            </div>
            <div class="product-body pt-1 pb-3 px-3">
                <div class="product-title text-center">
                    <span class="font-weight-bold text-dark">@{{instaaccount.username}}</span>
                </div>
                <div class="product-profile my-1">
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Followers:</div>
                        <div class="col d-none d-md-block"><i class="fa fa-users mr-2"></i>{{getFormattedFollowerCount}}</div>
                        <div class="col d-block d-md-none">Followers: <i class="fa fa-users mr-2"></i>{{getFormattedFollowerCount}}</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Starts from:</div>
                        <div class="col d-none d-md-block"><i class="fa fa-usd mr-2"></i>{{getMinPrice}}</div>
                        <div class="col d-block d-md-none">Starts from: <i class="fa fa-usd mr-2"></i>{{getMinPrice}}</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Success Rate:</div>
                        <div class="col d-none d-md-block">{{getSuccessRate}}</div>
                        <div class="col d-block d-md-none">Success Rate: {{getSuccessRate}}</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Niches:</div>
                        <div class="col d-none d-md-block">{{instaaccount.product.niches}}</div>
                        <div class="col d-block d-md-none">Niches: {{instaaccount.product.niches}}</div>
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
   import PercentProgress from "./PercentProgress";

   export default {
      components: {PercentProgress},
      data() {
         return {
            colors: ['success', 'primary', 'warning']
         }
      },
      props: {
         instaaccount: Object
      },
      computed: {
         getFormattedFollowerCount: function() {
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
         }
      }
   }
</script>