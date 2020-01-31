<template>
   <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7">
         <div class="card bg-secondary shadow border-0">
            <div class="card-header bg-transparent">
               <div class="text-muted text-center mt-2 mb-3">Please Sign In</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
               <form role="form">
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Email"
                              addon-left-icon="ni ni-email-83"
                              v-model="model.email">
                  </base-input>

                  <base-input class="input-group-alternative"
                              placeholder="Password"
                              type="password"
                              addon-left-icon="ni ni-lock-circle-open"
                              v-model="model.password">
                  </base-input>

                  <base-checkbox class="custom-control-alternative">
                     <span class="text-muted">Remember me</span>
                  </base-checkbox>
                  <div class="text-center">
                     <base-button type="primary" class="my-4" @click="adminLogin">Sign in</base-button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import { login, logout, currentCredential } from '../services/auth'
   export default {
      name: 'login',
      data() {
         return {
            model: {
               email: '',
               password: ''
            }
         }
      },
      created() {
         logout()
      },
      methods: {
         adminLogin: function () {
            login(this.model).then(() => {
               if(currentCredential()) {
                  this.$router.push({name: 'dashboard'})
               } else {
                  this.$noty.error("Login failed!", "Check your email and password and try again...")
               }
            }).catch(() => {
               this.$noty.error("Login failed!", "Check your email and password and try again...")
            })
         }
      }
   }
</script>
<style>
</style>
