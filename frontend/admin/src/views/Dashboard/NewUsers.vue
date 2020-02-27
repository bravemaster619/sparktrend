<template>
   <div class="card">
      <div class="card-header border-0">
         <div class="row align-items-center">
            <div class="col">
               <h3 class="mb-0">New Users</h3>
            </div>
            <div class="col text-right">
               <router-link to="/users" class="btn btn-sm btn-primary">See all</router-link>
            </div>
         </div>
      </div>

      <div class="table-responsive">
         <base-table thead-classes="thead-light"
                     :data="tableData">
            <template slot="columns">
               <th>Name</th>
               <th>Email</th>
               <th>Country</th>
               <th>Verified</th>
               <th>Registered Date</th>
            </template>

            <template slot-scope="{row}">
               <th scope="row">
                  <router-link :to="`/users/${row._id}`">{{row.name}}</router-link>
               </th>
               <td>
                  {{row.email}}
               </td>
               <td>
                  {{row.country}}
               </td>
               <td>
                  <span class="badge" :class="badgeClassName(row)">{{row.verified ? 'Verified' : 'Unverified'}}</span>
               </td>
               <td>{{registeredDuration(row) | duration('humanize', true)}}</td>
            </template>

         </base-table>
      </div>

   </div>
</template>
<script>
   export default {
      name: 'new-users',
      props: {
         tableData: Array
      },
      methods: {
         badgeClassName: function(user) {
            if(user.verified) {
               return 'badge-success'
            } else {
               return 'badge-default'
            }
         },
         registeredDuration: function(user) {
            return new Date(user.created_at).getTime() - (new Date).getTime()
         }
      }
   }
</script>
<style>
</style>
