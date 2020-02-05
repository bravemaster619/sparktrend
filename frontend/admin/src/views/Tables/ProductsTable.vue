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
               <th>Instagram Account</th>
               <th>User's Name</th>
               <th>Price</th>
               <th>Since</th>
               <th>Shoutouts</th>
               <th>Status</th>
               <th></th>
            </template>
            <template slot-scope="{row}">
               <th scope="row">
                  <div class="media align-items-center">
                     <a :href="`https://instagram.com/${row.username}`" class="avatar rounded-circle mr-3">
                        <img :alt="`${row.username} profile image`" :src="row.profile_img"/>
                     </a>
                     <div class="media-body">
                        <router-link :to="`/products/${row._id}`" class="name mb-0 text-sm">{{row.username}}</router-link>
                     </div>
                  </div>
               </th>
               <td class="budget">
                  {{ row.user ? row.user.name : 'User not found' }}
               </td>
               <td>
                  {{priceRange(row)}}
               </td>
               <td>
                  <badge class="badge-dot mr-4">
                     {{moment(row.created_at).format("YYYY-MM-DD")}}
                  </badge>
               </td>

               <td>
                  <div class="d-flex align-items-center">
                     {{ shoutOutHistory(row) }}
                  </div>
               </td>
               <td class="text-uppercase">
                  <span class="badge badge-info mr-2" v-if="row.verified">Verified</span>
                  <span class="badge badge-danger mr-2" v-else>Unverified</span>
                  <span class="badge badge-success" v-if="row.allowed">Allowed</span>
                  <span class="badge badge-warning" v-else>Waiting</span>
               </td>
               <td class="text-right">
                  <base-dropdown class="dropdown"
                                 position="right">
                     <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                     </a>

                     <template>
                        <router-link class="dropdown-item" :to="`/products/${row._id}`">Edit</router-link>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
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
      name: 'products-table',
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
            currentPage: 1
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
            return httpService.get(`instaaccounts/adminlist?page==${page}`).then(res => {
               this.tableData = res.data.data
               this.total = res.data.meta.total
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot get products data")
            })
         },
         onPageChange: function(page) {
            this.loading = true
            this.updateData(page).then(() => {
               this.loading = false
               this.currentPage = page
            })
         },
         priceRange: function(instaaccount) {
            if (!instaaccount || !instaaccount.product || !instaaccount.product.categories || !instaaccount.product.categories.length) {
               return "N/A"
            }
            let firstPricing = instaaccount.product.categories[0].pricing
            if (!firstPricing || !firstPricing.length) {
               return "N/A"
            }
            let minPrice = firstPricing[0].price
            let maxPrice = firstPricing[0].price + firstPricing[0].bio_price
            instaaccount.product.categories.forEach(c => {
               if (c.pricing) {
                  c.pricing.forEach(p => {
                     if (p.price < minPrice) {
                        minPrice = p.price
                     }
                     if (p.price + p.bio_price > maxPrice) {
                        maxPrice = p.price + p.bio_price
                     }
                  })
               }
            })
            return `$${minPrice} ~ $${maxPrice}`
         },
         shoutOutHistory: function(instaaccount) {
            let total = 0
            let completed = 0
            if (instaaccount.total_shoutout) {
               total = parseInt(instaaccount.total_shoutout)
            }
            if (instaaccount.completed_shoutout) {
               completed = parseInt(instaaccount.completed_shoutout)
            }
            return `${total} / ${completed}`
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
