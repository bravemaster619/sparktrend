<template>
   <div class="text-sm">
      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      </base-header>
      <div class="container-fluid mt--7 vld-parent">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
         <div class="row justify-content-center" v-if="config">
            <div class="col-12 col-lg-10">
               <div class="card-wapper">
                  <div class="card shadow bg-secondary">
                     <div class="card-header">
                        <div class="bg-white border-0">
                           <div class="row">
                              <div class="col-12">
                                 <h3>Settings</h3>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="card-body">
                        <form>
                           <div class="row">
                              <div class="col-12 col-lg-6 mb-4">
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <h6 class="heading-small text-muted text-center text-lg-left">Charge Rate</h6>
                                    </div>
                                 </div>
                                 <div class="row mb-3">
                                    <div class="col-12 text-center text-danger">
                                       The unit is percentage
                                    </div>
                                 </div>
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Commission Fee</div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" max="100" class="form-control"
                                                    v-model="config.charge.commission">
                                          </div>
                                       </div>
                                       <div class="row">
                                          <div class="col">
                                             <div class="col-form-label text-right">Referral</div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" max="100" class="form-control"
                                                    v-model="config.charge.referrer">
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12 col-lg-6 mb-4">
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <h6 class="heading-small text-muted text-center text-lg-left">Instagram
                                          Account</h6>
                                    </div>
                                 </div>
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Minumum Followers</div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" class="form-control"
                                                    v-model="config.seller.minimum_followers">
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12 col-lg-6 mb-4">
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <h6 class="heading-small text-muted text-center text-lg-left">Time Margin</h6>
                                    </div>
                                 </div>
                                 <div class="row mb-3">
                                    <div class="col-12 text-center text-danger">
                                       The unit is milliseconds (thousandth of a second)
                                    </div>
                                 </div>
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Between shoutout start time and
                                                order date
                                             </div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" class="form-control"
                                                    v-model="config.order.time_margin.start_from">
                                             <small class="mt-1 d-flex justify-content-end">{{ $n(config.order.time_margin.start_from) | duration('humanize') }}</small>
                                          </div>
                                       </div>
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Seller must accept order in</div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" class="form-control"
                                                    v-model="config.order.time_margin.accept">
                                             <small class="mt-1 d-flex justify-content-end">{{ $n(config.order.time_margin.accept) | duration('humanize') }}</small>
                                          </div>
                                       </div>
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Seller must start accepted order
                                                in
                                             </div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" class="form-control"
                                                    v-model="config.order.time_margin.start_time">
                                             <small class="mt-1 d-flex justify-content-end">{{ $n(config.order.time_margin.start_time) | duration('humanize') }}</small>
                                          </div>
                                       </div>
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Seller must complete an order in
                                             </div>
                                          </div>
                                          <div class="col">
                                             <input type="number" min="0" class="form-control"
                                                    v-model="config.order.time_margin.complete">
                                             <small class="mt-1 d-flex justify-content-end">{{ $n(config.order.time_margin.complete) | duration('humanize') }}</small>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12 col-lg-6 mb-4">
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <h6 class="heading-small text-muted text-center text-lg-left">Paypal</h6>
                                    </div>
                                 </div>
                                 <div class="row mb-4 align-items-center">
                                    <div class="col-12">
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Public Key</div>
                                          </div>
                                          <div class="col">
                                             <input type="text" class="form-control" disabled
                                                    :value="config.paypal_client">
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-12">
                                       <div class="row mb-2">
                                          <div class="col">
                                             <div class="col-form-label text-right">Private Key</div>
                                          </div>
                                          <div class="col">
                                             <input type="text" class="form-control" disabled
                                                    :value="config.paypal_secret">
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <hr>
                           <div class="row">
                              <div class="col-12 d-flex justify-content-end">
                                 <button type="button" class="btn btn-default mr-3" @click="historyBack">Back</button>
                                 <button type="button" class="btn btn-primary" v-if="saving">Saving...</button>
                                 <button type="button" class="btn btn-primary" @click="saveData" v-else>Save</button>
                              </div>
                           </div>
                        </form>
                     </div>
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
   import {$n, historyBack} from "../helper"

   export default {
      name: 'settings',
      components: {
         Loading
      },
      data() {
         return {
            loading: true,
            config: null,
            saving: false
         }
      },
      methods: {
         $n,
         historyBack,
         updateData: function () {
            return httpService.get('config').then(res => {
               this.config = res.data.data
            }).catch(e => {
               window.console.error(e)
               this.$noty.error('Cannot get configuration data')
            })
         },
         saveData: function() {
            this.$swal({
               title: 'Are you sure?',
               text: 'Think twice before you save.',
               showCancelButton: true
            }).then(result => {
               if(result.value) {
                  this.saving = true
                  const payload = {
                     charge: {}, seller: {}, order: { time_margin: {} }
                  }
                  payload.charge.commission = $n(this.config.charge.commission)
                  payload.charge.referrer = $n(this.config.charge.referrer)
                  payload.seller.minimum_followers = $n(this.config.seller.minimum_followers);
                  ['start_from', 'accept', 'start_time', 'complete'].forEach(key => {
                     payload.order.time_margin[key] = $n(this.config.order.time_margin[key])
                  })
                  httpService.put('config', payload).then(res => {
                     this.$noty.info('Updated successfully')
                     this.updateData()
                  }).catch(e => {
                     console.error(e)
                     this.$noty.error('Save failed')
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