<template>
   <div class="row justify-content-center">
      <div class="col-12">
         <h3 class="text-center">{{$t("Edit Profile")}}</h3>
         <hr class="hr-primary short">
      </div>
      <div class="col-8 vld-parent">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"
         ></loading>
         <form role="form" v-if="user">
            <label>{{$t("Name")}}</label>
            <base-input
               class="mb-3"
               :placeholder="$t('Name')"
               v-model="user.name"
            >
            </base-input>
            <label>{{$t("Email")}} <span class="badge badge-success" v-if="user.verified">Verified</span></label>
            <template v-if="!user.verified">
               <button type="button" class="btn btn-sm btn-primary ml-4" v-if="requestSending">Sending...</button>
               <button type="button" class="btn btn-sm btn-primary ml-4" v-else @click="sendVerification">Send Verification Code</button>
            </template>

            <base-input
               class="mb-3"
               :placeholder="$t('Email')"
               v-model="user.email"
               readonly>
            </base-input>

            <label>{{$t("Paypal Email")}}</label>
            <base-input
               class="mb-3"
               :placeholder="$t('Paypal Email')"
               v-model="user.paypal_email"
            >
            </base-input>
            <label>{{$t("Country")}}</label>
            <select class="form-control mb-3" v-model="user.country">
               <option v-for="(country, index) in countries" :key="index" :value="country.text">
                  {{country.text}}
               </option>
            </select>
            <label>{{$t("Gender")}}</label>
            <select class="form-control mb-3" v-model="user.gender">
               <option v-for="(gender, index) in genders" :key="index" :value="gender.value">
                  {{gender.text}}
               </option>
            </select>
            <label>{{$t("Referral Code")}}</label>
            <base-input
               class="mb-3"
               type="text">
            </base-input>
            <label>{{$t("Referral By")}}</label>
            <base-input
               class="mb-3"
               type="text"
               readonly>
            </base-input>
            <template>
               <button type="button" class="btn btn-primary w-100 mt-3" v-if="saving" disabled>{{$t("Updating...")}}</button>
               <button type="button" class="btn btn-primary w-100 mt-3" v-else @click="saveProfile">{{$t("Update Profile")}}</button>
            </template>
            <button type="button" class="btn btn-default w-100 mt-3" @click="historyBack">{{$t("Back")}}</button>
         </form>
      </div>

   </div>
</template>
<script>
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css';
   import httpService from "../services/http.service"
   import countries from './../config/countries';
   export default {
      components: {
         Loading
      },
      data() {
         return {
            loading: true,
            saving: false,
            user: null,
            requestSending: false,
            genders: [
               {value: '', text: 'Select Gender'},
               {value: 'male', text: 'Male'},
               {value: 'female', text: 'Female'}
            ],
            countries: [{"value": "0", "text": ('Select Country')}, ...countries.map(c => { return { value: c, text: c } })]
         }
      },
      methods: {
         historyBack: function() {
           window.history.back()
         },
         updateData: function () {
            this.loading = true
            httpService.get('/auth/me').then(res => {
               this.user = res.data.data
            }).catch(e => {
               this.$toastr.error(this.$t('error.default'))
            }).finally(() => {
               this.loading = false
            })
         },
         sendVerification: function() {
            this.requestSending = true
            httpService.post('/auth/sendVerification', {email: this.user.email}).then(res => {
               this.$toastr.success(this.$t("Verification code has been sent."))
            }).catch(e => {
               this.$toastr.error(this.$t('error.default'))
            }).finally(() => {
               this.requestSending = false
            })
         },
         saveProfile: function() {
            this.$swal({
               title: this.$t("Are you sure?"),
               showCancelButton: true
            }).then(result => {
               if (!result.value) {
                  return
               }
               this.saving = true
               httpService.put(`/users/${this.user._id}`, this.user).then(res => {
                  this.user = res.data.data
                  this.$toastr.success(this.$t("Updated successfully!"))
               }).catch(e => {
                  this.$toastr.error(this.$t('error.default'))
               }).finally(() => {
                  this.saving = false
               })
            })
         }
      },
      mounted() {
         this.updateData()
      }
   };
</script>
<style>
   body {
      background-color: #fdfdfd;
   }
</style>
