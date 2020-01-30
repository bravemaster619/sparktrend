<template>
   <modal :show="show" :showClose="false">
      <h6 slot="header" class="modal-title" id="modal-title-default">
         {{order.history.rated_at ? $t("Rating on this shoutout") : $t("Your feedback of this service")}}
      </h6>
      <p v-if="!order.history.rated_at">{{$t("order.feedback_guide")}}</p>

      <div class="row">
         <div class="col-12 col-md-6">
            <label class="mb-0 font-weight-bold" style="line-height: 30px;">{{$t("Communication")}}</label>
         </div>
         <div class="col-12 col-md-6">
            <star-rating
               :star-size="24"
               :glow="10"
               :increment="0.5"
               :show-rating="false"
               :read-only="isReadOnly"
               v-model="rating.communication"/>
         </div>
      </div>
      <div class="row mt-2">
         <div class="col-12 col-md-6">
            <label class="mb-0 font-weight-bold" style="line-height: 30px;">{{$t("Professionalism")}}</label>
         </div>
         <div class="col-12 col-md-6">
            <star-rating
               :star-size="24"
               :glow="10"
               :increment="0.5"
               :show-rating="false"
               :read-only="isReadOnly"
               v-model="rating.professionalism" />
         </div>
      </div>
      <div class="row mt-2">
         <div class="col-12 col-md-6">
            <label class="mb-0 font-weight-bold" style="line-height: 30px;">{{$t("Recommendation to Work with")}}</label>
         </div>
         <div class="col-12 col-md-6">
            <star-rating
               :star-size="24"
               :glow="10"
               :increment="0.5"
               :show-rating="false"
               :read-only="isReadOnly"
               v-model="rating.recommendation"/>
         </div>
      </div>
      <div class="row mt-2" v-if="!isReadOnly">
         <div class="col-12">
            <div class="custom-control custom-checkbox">
               <input type="checkbox" class="custom-control-input" id="customCheck" v-model="leaveMessage" :readonly="isReadOnly">
               <label class="custom-control-label" for="customCheck">{{$t("Leave a private feedback")}} <small>({{$t("This will not be shown to the influencer")}})</small></label>
            </div>
         </div>
      </div>
      <div class="row mt-2" v-if="leaveMessage">
         <div class="col-12">
               <textarea
                  class="form-control"
                  style="min-height: 96px;"
                  v-model="rating.feedback"
                  :readonly="isReadOnly"
                  :maxlength="500"
               />
         </div>
      </div>
      <template slot="footer">
         <button class="btn btn-default" @click="() => {this.$emit('close')}">{{$t("Close")}}</button>
         <div v-if="!(isReadOnly)">
            <button class="btn btn-primary" v-if="sending">{{$t("Sending...")}}</button>
            <button class="btn btn-primary" @click="rateOrder" v-else>{{$t("Rate")}}</button>
         </div>
      </template>
   </modal>
</template>
<script>
   import {OrderStatus, getOrderPaymentStatus, getOrderShoutoutStatus} from '../../helpers/order'
   import Modal from "@/components/Modal.vue"
   import StarRating from 'vue-star-rating'
   import httpService from '../../services/http.service'

   export default {
      name: 'RateModal',
      components: {
         Modal, StarRating
      },
      props: {
         show: Boolean,
         order: Object,
         readonly: Boolean,
      },
      data() {
         return {
            OrderStatus,
            sending: false,
            rating: this.order.rating ? this.order.rating : {
               communication: 0,
               professionalism: 0,
               recommendation: 0,
               feedback: ''
            },
            leaveMessage: this.order.rating && this.order.rating.feedback ? true : false
         }
      },
      methods: {
         getOrderShoutoutStatus,
         rateOrder() {
            this.sending = true
            httpService.post(`/orders/${this.order._id}/rate`, this.rating).then((res) => {
               if(res.status === 200) {
                  this.$toastr.success(this.$t("order.success.order_rated"))
                  this.$emit('order:updated', res.data.data)
               } else {
                  this.$toastr.error(this.$t("error.default"))
               }
            }).catch(e => {
               window.console.error(e)
               const messageKey = this.$te(`order.error.${e.response.data.errors}`) ? `order.error.${e.response.data.errors}` : 'error.default'
               this.$toastr.error(this.$t(messageKey))
            }).finally(() => {
               this.sending = false
               this.$emit('close')
            })
         }
      },
      computed: {
         isReadOnly: function() {
            return this.readonly || this.order.history.rated_at && getOrderShoutoutStatus(this.order) === OrderStatus.SHOUTOUT.COMPLETED
         }
      },
      mounted() {
         window.vuetemp = this
      }
   }

</script>