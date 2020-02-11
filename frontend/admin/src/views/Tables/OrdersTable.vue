<template>
   <div class="card shadow"
        :class="type === 'dark' ? 'bg-default': ''">
      <div class="card-header border-0"
           :class="type === 'dark' ? 'bg-transparent': ''">
         <div class="row align-items-center">
            <div class="col">
               <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                  {{title}} <small v-if="!loading && total">({{total}} in total)</small>
               </h3>
            </div>
         </div>
      </div>

      <div class="table-responsive vld-parent overflow-y-visible">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
         <base-table class="table align-items-center table-flush"
                     :class="type === 'dark' ? 'table-dark': ''"
                     :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                     tbody-classes="list"
                     :data="tableData"
                     v-if="tableData.length > 0">
            <template slot="columns">
               <th>Buyer</th>
                 <th>Product</th>
               <th>Price</th>
               <th>Category</th>
               <th>Time</th>
               <th>Order Date</th>
               <th>Start Date</th>
               <th>Status</th>
               <th></th>
            </template>
            <template slot-scope="{row}">
               <td>
                  <router-link :to="`/users/${row.buyer_id}`">{{row.buyer_name}}</router-link>
               </td>
               <td>
                  <router-link :to="`/products/${row.insta_id}`">@{{row.seller_name}}</router-link>
               </td>
               <td>
                  $ {{row.total}}
               </td>
               <td>
                  {{row.category}}
               </td>
               <td>
                  {{row.time}}
               </td>
               <td>
                  {{moment(row.created_at).format("YYYY-MM-DD HH:mm")}}
               </td>

               <td>
                  {{moment(row.start_from).format("YYYY-MM-DD")}}
               </td>
               <td class="text-uppercase">
                  <span class="badge mr-2" :class="`badge-${paymentStatusClasses[getPaymentStatus(row)]}`">{{getPaymentStatus(row)}}</span>
                  <span class="badge" :class="`badge-${shoutoutStatusClasses[getOrderStatus(row)]}`">{{getOrderStatus(row)}}</span>
               </td>
               <td class="text-right">
                  <base-dropdown class="dropdown"
                                 position="right">
                     <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                     </a>

                     <template>
                        <router-link class="dropdown-item" :to="`/orders/${row._id}`">View</router-link>
                        <a class="dropdown-item" href="#">Delete</a>
                     </template>
                  </base-dropdown>
               </td>

            </template>

         </base-table>
         <div
            v-else
            class="text-center">
            No data to show
         </div>
      </div>

      <div class="card-footer d-flex justify-content-end"
           :class="type === 'dark' ? 'bg-transparent': ''">
         <base-pagination
            :total=total
            :per-page="perPage"
            :value="currentPage"
            @input="onPageChange"
         />
      </div>

   </div>
</template>
<script>
   import httpService from '../../services/http'
   import Loading from 'vue-loading-overlay'
   import moment from 'moment'

   export default {
      name: 'orders-table',
      props: {
         type: {
            type: String
         },
         title: String
      },
      components: {
         Loading
      },
      data() {
         return {
            tableData: [],
            loading: true,
            total: 0,
            perPage: 10,
            currentPage: 1,
            paymentStatusClasses: {
               paid: 'success',
               'not paid': 'default',
               refunded: 'danger'
            },
            shoutoutStatusClasses: {
               request: 'default',
               accepted: 'info',
               started: 'primary',
               completed: 'success',
               expired: 'danger',
               rejected: 'danger'
            }
         }
      },
      mounted() {
         this.loading = false
         this.updateData().finally(() => {
            this.loading = false
         })
      },
      methods: {
         moment,
         updateData: function (page = 1) {
            return httpService.get(`orders?page=${page}`).then(res => {
               this.tableData = res.data.data
               this.total = res.data.meta.total
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot get orders data")
            })
         },
         onPageChange: function(page) {
            this.loading = true
            this.updateData(page).then(() => {
               this.loading = false
               this.currentPage = page
            })
         },
         getPaymentStatus: function(order) {
            if(order.history.paid_at) {
               return 'paid'
            }
            if(order.history.refunded_at) {
               return 'refunded'
            }
            return 'not paid'
         },
         getOrderStatus: function(order) {
            if(order.history.accepted_at) {
               return 'accepted'
            }
            if(order.history.started_at) {
               return 'started'
            }
            if(order.history.expired_at) {
               return 'expired'
            }
            if(order.history.completed_at) {
               return 'completed'
            }
            return 'request'
         }
      },
      computed: {
         pageCount: function() {
            if(this.perPage == 0) {
               return 1
            }
            if (this.total < 1) {
               return 1
            }
            return parseInt((this.total + this.perPage - 1) / this.perPage)
         }
      }
   }
</script>
<style>
</style>
