<template>
   <div class="card">
      <div class="card-header border-0">
         <div class="row align-items-center">
            <div class="col">
               <h3 class="mb-0">New Orders</h3>
            </div>
            <div class="col text-right">
               <router-link to="/orders" class="btn btn-sm btn-primary">See all</router-link>
            </div>
         </div>
      </div>

      <div class="table-responsive align-items-center">
         <base-table thead-classes="thead-light"
                     :data="tableData">
            <template slot="columns">
               <th>ID</th>
               <th>Buyer</th>
               <th>Seller</th>
               <th>Product</th>
               <th>Category</th>
               <th>Total Price</th>
               <th>Status</th>
               <th>Purchased Time</th>
            </template>

            <template slot-scope="{row}">
               <th scope="row">
                  <router-link :to="`/orders/${row._id}`">{{row._id}}</router-link>
               </th>
               <td>
                  <router-link :to="`/users/${row.buyer_id}`">{{row.buyer_name}}</router-link>
               </td>
               <td>
                  <router-link :to="`/users/${row.seller_id}`">{{row.seller.name}}</router-link>
               </td>
               <td>
                  <div class="media align-items-center">
                     <a target="_blank" :href="`https://instagram.com/${row.seller_name}`" class="avatar rounded-circle mr-3">
                        <img :alt="`${row.seller_name} profile image`" :src="row.instaaccount.profile_img" class="">
                     </a>
                     <div class="media-body">
                        <router-link :to="`/products/${row.insta_id}`">@{{row.instaaccount.username}}</router-link>
                     </div>
                  </div>
               </td>
               <td>{{row.category}}</td>
               <td>
                  ${{row.total}}
               </td>
               <td>
                  <span class="badge mr-2" :class="`badge-${paymentStatusClasses[getPaymentStatus(row)]}`">{{getPaymentStatus(row)}}</span>
                  <span class="badge" :class="`badge-${shoutoutStatusClasses[getOrderStatus(row)]}`">{{getOrderStatus(row)}}</span>
               </td>
               <td>
                  {{registeredDuration(row) | duration('humanize',true)}}
               </td>
            </template>

         </base-table>
      </div>

   </div>
</template>
<script>
   export default {
      name: 'new-orders',
      props: {
         tableData: Array
      },
      data() {
         return {
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
      methods: {
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
         },
         registeredDuration: function(order) {
            return new Date(order.created_at).getTime() - (new Date).getTime()
         }
      }
   }
</script>