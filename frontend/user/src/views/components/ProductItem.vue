<template>
    <div class="col-6 col-md-4 col-lg-4 p-2 product-item">
        <router-link :to="product.url" class="text-light font-weight-300 d-table border border-light">
            <div class="product-header text-center">
                <img class="w-100 product-banner" v-bind:src="product.product_banner" v-bind:alt="product.title + ' banner'">
                <img class="m-auto profile-img" v-bind:src="product.user.profile_img" v-bind:alt="product.title + ' profile image'">
            </div>
            <div class="product-body pt-1 pb-3 px-3">
                <div class="product-title text-center">
                    <span class="font-weight-bold text-dark">{{product.title}}</span>
                </div>
                <div class="product-profile my-1">
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Followers:</div>
                        <div class="col d-none d-md-block"><i class="fa fa-users mr-2"></i>{{product.user.follower_count}}</div>
                        <div class="col d-block d-md-none">Followers: <i class="fa fa-users mr-2"></i>{{product.user.follower_count}}</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Starts from:</div>
                        <div class="col d-none d-md-block"><i class="fa fa-usd mr-2"></i>{{getMinPrice}}</div>
                        <div class="col d-block d-md-none">Starts from: <i class="fa fa-usd mr-2"></i>{{getMinPrice}}</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Success Rate:</div>
                        <div class="col d-none d-md-block">{{getSuccessRate}}%</div>
                        <div class="col d-block d-md-none">Success Rate: {{getSuccessRate}}%</div>
                    </div>
                    <div class="row">
                        <div class="col d-none d-md-block text-right">Niches:</div>
                        <div class="col d-none d-md-block">{{product.niches}}</div>
                        <div class="col d-block d-md-none">Niches: {{product.niches}}</div>
                    </div>
                </div>
                <percent-progress v-for="(country, index) in product.countries.slice(0,3)"
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
         product: Object
      },
      computed: {
         getMinPrice: function () {
            return 20;
         },
         getSuccessRate: function () {
            return 100;
         }
      }
   }
</script>