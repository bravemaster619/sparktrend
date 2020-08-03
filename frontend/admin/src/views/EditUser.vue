<template>
   <div>
      <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                   style="min-height: 200px; background-image: url(/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
         <!-- Mask -->
         <span class="mask bg-gradient-success opacity-8"></span>
         <!-- Header container -->
      </base-header>
      <div class="container-fluid mt--150 vld-parent">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
         <div class="row" v-if="user">
            <div class="col-12">
               <div class="card shadow">
                  <div class="card-header">
                     <h3>User: {{user.name}}</h3>
                  </div>
                  <div class="card-body">
                     <form role="form" class="form">
                        <div class="row">
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Full Name
                                 </label>
                                 <input class="form-control" v-model="user.name" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Email
                                 </label>
                                 <input class="form-control" v-model="user.email" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Gender
                                 </label>
                                 <select class="form-control" v-model="user.gender">
                                    <option v-for="(gender, index) in genders" :value="gender.value" :key="index">{{gender.text}}</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Country
                                 </label>
                                 <select class="form-control" v-model="user.country">
                                    <option v-for="(country, index) in countries" :value="country.text" :key="index">{{country.text}}</option>
                                 </select>
                              </div>
                           </div>
                           <template v-if="user.role !== 'admin'">
                              <div class="col-12 col-md-6">
                                 <div class="form-group has-label">
                                    <label class="form-control-label">
                                       Password
                                    </label>
                                    <input class="form-control" v-model="model.password" type="password" placeholder="************" @change="passwordChanged=true">
                                 </div>
                              </div>
                              <div class="col-12 col-md-6" v-if="passwordChanged">
                                 <div class="form-group has-label">
                                    <label class="form-control-label">
                                       Password Confirmation
                                    </label>
                                    <input class="form-control" v-model="model.password_confirm"  type="password">
                                 </div>
                              </div>
                           </template>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Paypal Email
                                 </label>
                                 <input class="form-control" v-model="user.paypal_email" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6" v-if="user.role !== 'admin'">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Verified
                                 </label>
                                 <select class="form-control" v-model="user.verified">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-12">
                             <div class="form-group has-label">
                               <label class="form-control-label">
                                 Bank Detail
                               </label>
                             </div>
                             <div class="row">
                               <div class="col-12 col-md-6">
                                 <label>Account Holder Name</label>
                                 <input class="form-control" v-model="user.bank_info.name" />
                               </div>
                               <div class="col-12 col-md-6">
                                 <label>Account Number</label>
                                 <input class="form-control" v-model="user.bank_info.account_number" />
                               </div>
                               <div class="col-12 col-md-6">
                                 <label>IBAN Number</label>
                                 <input class="form-control" v-model="user.bank_info.iban_number" />
                               </div>
                               <div class="col-12 col-md-6">
                                 <label>Bank Name</label>
                                 <input class="form-control" v-model="user.bank_info.bank_name"/>
                               </div>
                               <div class="col-12 col-md-6">
                                 <label>Bank Address</label>
                                 <input class="form-control" v-model="user.bank_info.bank_address"/>
                               </div>
                               <div class="col-12 col-md-6">
                                 <label>SWIFT Code</label>
                                 <input class="form-control" v-model="user.bank_info.swift"/>
                               </div>
                             </div>
                           </div>
                        </div>
                     </form>
                  </div>
                  <div class="card-footer d-flex justify-content-end">
                     <button class="btn btn-default" @click="historyBack">Back</button>
                     <button class="btn btn-primary" disabled v-if="saving">Saving...</button>
                     <button class="btn btn-primary" v-else @click="saveUser">Save</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import httpService from "../services/http"
   import Loading from 'vue-loading-overlay'
   import {$n, historyBack} from '../helper'
   import config from '../config/config'
   export default {
      name: 'edit-user',
      components: {
         Loading
      },
      data() {
         return {
            loading: true,
            saving: false,
            user: null,
            passwordChanged: false,
            model: {
               password: '',
               password_confirm: ''
            },
            genders: [
               {value: "0", text: 'Select Gender'},
               {value: "male", text: 'Male'},
               {value: "female", text: 'Female'},
            ],
            countries: [{"value": "0", "text": ('Select Country')}, ...config.countries.map(c => { return { value: c, text: c } })],
         }
      },
      methods: {
         historyBack,
         updateData: function () {
            this.loading = true
            return httpService.get(`/users/${this.$route.params.id}`).then(res => {
              const userInfo = res.data.data
              if (!userInfo.bank_info) {
                userInfo.bank_info = {}
              }
               this.user = userInfo
            }).catch(e => {
               this.$noty.error("Cannot read user data")
            })
         },
         saveUser: function() {
            this.$swal({
               title: 'Are you sure?',
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  if(this.passwordChanged) {
                     if(!this.model.password) {
                        return this.$noty.error("Please input a valid password!")
                     }
                     if(this.model.password != this.model.password_confirm) {
                        return this.$noty.error("Password mismatch!")
                     }
                     if(this.model.password.length < 6) {
                        return this.$noty.error("Password is too short!")
                     }
                     this.user.password = this.model.password
                  }
                  this.saving = true
                  httpService.put(`/users/${this.$route.params.id}`, this.user).then(res => {
                     this.$noty.success("User saved")
                    const userInfo = res.data.data
                    if (!userInfo.bank_info) {
                      userInfo.bank_info = {}
                    }
                    this.user = userInfo
                  }).catch(e => {
                     this.$noty.error("Cannot save user data")
                  }).finally(() => {
                     this.saving = false
                  })
               }
            })
         }
      },
      mounted() {
         this.updateData().finally(() => {
            this.loading = false
         })
      }
   }
</script>