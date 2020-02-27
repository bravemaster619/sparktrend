<template>
   <div class="related-page-item-container">
      <div class="d-inline-flex flex-md-column flex-row mx-lg-0 mx-1 pb-2 px-3 border">
         <a :href="`/products/${instaaccount._id}`" class="related-item py-3 text-center d-block text-muted" v-for="(instaaccount, index) in instaaccounts" :key="index">
            <img class="img-round d-block mx-auto" :src="instaaccount.profile_img"/>
            <label class="mt-2 mb-0">@{{instaaccount.username}}</label>
            <small class="d-block"><i class="fa fa-users mr-2"></i>{{getFormattedFollowerCount(instaaccount)}}</small>
            <small class="d-block">{{instaaccount.product.niches}}</small>
         </a>
      </div>
   </div>
</template>
<script>
   import httpService from '../../services/http.service'
   export default {
      name: 'related-page',
      data() {
         return {
            instaaccounts: []
         }
      },
      methods: {
         getFormattedFollowerCount: function(instaaccount) {
            if (parseInt(instaaccount.follower_count) < 100) {
               return instaaccount.follower_count
            }
            let formatted = (parseInt(instaaccount.follower_count) / 1000).toFixed(1)
            if (formatted > 1000) {
               return `${(formatted / 1000).toFixed(2)}M`
            }
            return `${formatted}K`
         }
      },
      mounted() {
         httpService.get(`/instaaccounts/${this.$route.params.id}/related`).then((res) => {
            this.instaaccounts = res.data.data
         })
      }
   }
</script>