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
               <th>Name</th>
               <th>Products</th>
               <th>Email</th>
               <th>Since</th>
               <th>Paypal Email</th>
               <th>Status</th>
               <th></th>
            </template>
            <template slot-scope="{row}">
               <th scope="row">
                  <div class="media align-items-center">
                     <div class="media-body">
                        <router-link :to="`/users/${row._id}`" class="name mb-0 text-sm">{{row.name}}</router-link>
                     </div>
                  </div>
               </th>
               <td>
                  <template>
                     <div>
                        <router-link v-for="(instaaccount, index) in row.instaaccounts.slice(0,3)" :key="index" :to="`/products/${instaaccount._id}`">
                           <img :src="instaaccount.profile_img" height="36" :alt="`${instaaccount.username}`" class="img-circle mr-1">
                        </router-link>
                     </div>
                  </template>
               </td>
               <td class="budget">
                  {{row.email}}
               </td>
               <td>
                  <badge class="badge-dot mr-4">
                     {{row.created_at | moment("YYYY-MM-DD")}}
                  </badge>
               </td>

               <td>
                  <div class="d-flex align-items-center">
                     {{ row.paypal_email }}
                  </div>
               </td>
               <td class="text-uppercase">
                  {{ row.verified ? "verified" : "unverified" }}
               </td>
               <td class="text-right">
                  <base-dropdown class="dropdown"
                                 position="right">
                     <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                     </a>

                     <template>
                        <a class="dropdown-item" :href="`/users/${row._id}`">Edit</a>
                        <a class="dropdown-item" :href="`mailto:${row.email}`">Message</a>
                        <a class="dropdown-item" v-on:click.stop.prevent="removeUser(row._id)" href="#">Delete</a>
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
   export default {
      name: 'users-table',
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
         this.updateData().finally(() => {
            this.loading = false
         })
      },
      methods: {
         updateData: function (page = 1) {
            return httpService.get(`users?page=${page}`).then(res => {
               this.tableData = res.data.data
               this.total = res.data.meta.total
            }).catch(e => {
               window.console.error(e)
               this.$noty.error("Cannot get user data")
            })
         },
         onPageChange: function(page) {
           this.loading = true
           this.updateData(page).then(() => {
             this.loading = false
             this.currentPage = page
           })
         },
         removeUser(id) {
            this.$swal({
               title: 'Are you sure to delete this user?',
               text: 'All accounts and products related to this user will be deleted!',
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  httpService.delete(`users/${id}`).then(() => {
                     this.$noty.success("Deleted a user.")
                     this.updateData(this.currentPage)
                  }).error(e => {
                     window.console.error(e)
                     this.$noty.error("Cannot delete a user.")
                     this.updateData(this.currentPage)
                  })
               }
            })
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
