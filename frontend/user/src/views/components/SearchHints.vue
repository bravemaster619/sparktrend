<template>
   <div class="search-hint">
      <router-link v-for="(instaaccount, index) in hints" :key="index" class="d-flex w-100 search-hint-item m-0 p-1" :to="`/products/${instaaccount._id}`">
         <div class="row m-0 py-1 align-items-center">
            <div class="d-inline mr-4">
               <img :src="instaaccount.profile_img" class="img-round">
            </div>
            <div class="d-inline">
               <div><strong>{{$t("Username")}}:</strong> {{instaaccount.username}}</div>
               <div><strong>{{$t("Niches")}}:</strong> {{instaaccount.product.niches}}</div>
               <div><strong>{{$t("Followers")}}:</strong> {{numberFormat(instaaccount.follower_count)}}</div>
            </div>
         </div>
      </router-link>
   </div>
</template>
<script>
   export default {
      name: 'search-hint',
      props: {
         hints: {
            type: Array,
            default: () => {[]}
         }
      },
      methods: {
         numberFormat: function(num) {
            return new Intl.NumberFormat().format(num)
         }
      }
   }
</script>