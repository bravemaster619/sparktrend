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
         <div class="row" v-if="order">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
               <div class="card shadow">
                  <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                     <h3>Buyer Information</h3>
                  </div>
                  <div class="card-body pt-0 pt-md-4">

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

   export default {
      name: 'edit-order',
      components: {
         Loading
      },
      data() {
         return {
            loading: true,
            saving: false,
            order: null,
         }
      },
      methods: {
         historyBack,
         updateData: function () {
            this.loading = true
            return httpService.get(`/orders/${this.$route.params.id}`).then(res => {
               this.order = res.data.data
            }).catch(e => {
               this.$noty.error("Cannot read order data")
            })
         },
         saveUser: function() {
            this.$swal({
               title: 'Are you sure?',
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  this.saving = true
                  httpService.put(`/orders/${this.$route.params.id}`, this.order).then(res => {
                     this.$noty.success("Order saved")
                     this.order = res.data.data
                  }).catch(e => {
                     this.$noty.error("Cannot save order data")
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