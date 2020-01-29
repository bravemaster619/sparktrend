<template>
   <div class="add-product">
      <add-product-verify
         v-if="status==='verify'"
         tab_id="1"
         @back="$router.push({name: 'myproducts'})"
         @next="next"
         :verificationCode="instaaccount.verification_code"
         :username="instaaccount.username"
         :_id="instaaccount._id"/>
      <add-product-insights
         v-if="status==='insights'"
         tab_id="2"
         @back="back"
         @next="next"
         :_id="instaaccount._id"
         :instaaccount="instaaccount"
      />
      <add-product-price
         v-if="status==='price'"
         tab_id="3"
         :_id="instaaccount._id"
         :instaaccount="instaaccount"
         @back="back"
      />
   </div>
</template>

<script>
   import AddProductInsights from "../components/Dashboard/AddProductInsights"
   import AddProductVerify from "../components/Dashboard/AddProductVerify"
   import AddProductPrice from "../components/Dashboard/AddProductPrice"
   import httpService from "../../services/http.service"

   export default {
      name: 'ManageProduct',
      components: {
         AddProductInsights, AddProductPrice, AddProductVerify
      },
      data() {
         return {
            instaaccount: {},
            loading: true,
            status_enum: [
               "check", "verify", "insights", "price"
            ],
            insights_picture: ''
         }
      },
      methods: {
         next(tab_id, result) {
            this.current_tab_id = tab_id
            switch (tab_id) {
               case "0":
                  this.processCheck(result)
                  break
               case "1":
                  this.processVerify(result)
                  break
               case "2":
                  this.processInsight(result)
                  break
            }
         },
         back(tab_id) {
            this.status = this.status_enum[--tab_id]
         },
         processCheck(result) {
            if (!this.isEmpty(result.verification_code)) {
               this.verification_code = result.verification_code
               this.username = result.username
               this.insta_id = result.id
               this.status = this.status_enum[++this.current_tab_id]
            }
         },
         processVerify(result) {
            this.verified = result.verified
            if (this.verified) {
               this.status = this.status_enum[++this.current_tab_id]
            }
         },
         processInsight(result) {
            if (!this.isEmpty(result.insight)) {
               this.insights_picture = result.insight
               this.instaaccount.insights_picture = this.insights_picture
               this.status = this.status_enum[++this.current_tab_id]
            }
         }
      },
      computed: {
         status: {
            get: function () {
               if (!this.instaaccount.verified) {
                  return 'verify'
               }
               if (!this.insights_picture) {
                  return 'insights'
               }
               return 'price'
            },
            set: function (newValue) {
               if (newValue == 'verify') {
                  this.instaaccount.verified = false
               }
               if (newValue == 'insights') {
                  this.insights_picture = ''
               }
            }
         }
      },
      mounted() {
         httpService.get('/instaaccounts/' + this.$route.params.id).then((res) => {
            if (res.status === 200 && res.data && res.data.data._id) {
               this.instaaccount = res.data.data
               this.insights_picture = this.instaaccount.insights_picture
            } else {
               this.$toastr.error(this.$t("error.default"), "", {timeOut: 3000})
            }
         }).catch(e => {
            window.console.error(e)
            this.$toastr.error(this.$t("error.default"), "", {timeOut: 3000})
         }).finally(() => {
            this.loading = false
         })
      }
   }
</script>