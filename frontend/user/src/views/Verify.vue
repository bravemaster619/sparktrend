<template>
   <div class="vld-parent">
      <loading
         :active="loading"
         :is-full-page="false"
         loader="dots"
         color="#5e72e4"
      ></loading>
      <div v-if="!loading">
         <div v-if="verified">
            Congratulations! Your email is verified.
         </div>
         <div v-else>
            Sorry. We couldn't verify your email address.
         </div>
      </div>
   </div>
</template>
<script>
   import httpService from '../services/http.service'
   import Loading from 'vue-loading-overlay'
   export default {
      components: {
         Loading
      },
      data: function() {
         return {
            loading: true,
            verified: undefined
         }
      },
      mounted() {
         const query = window.location.search
         if(!query) {
            window.location.href="/"
         }
         httpService.get(`auth/verify/${query}`).then(res => {
            this.verified = true
         }).catch(e => {
            this.verified = false
         }).finally(() => {
            this.loading = false
         })
      }
   }
</script>