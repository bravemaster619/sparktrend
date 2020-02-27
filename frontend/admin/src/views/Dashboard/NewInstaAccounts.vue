<template>
   <div class="card">
      <div class="card-header border-0">
         <div class="row align-items-center">
            <div class="col">
               <h3 class="mb-0">New Instagram Accounts</h3>
            </div>
            <div class="col text-right">
               <router-link to="/instaaccounts" class="btn btn-sm btn-primary">See all</router-link>
            </div>
         </div>
      </div>

      <div class="table-responsive">
         <base-table thead-classes="thead-light"
                     :data="tableData">
            <template slot="columns">
               <th>Instagram</th>
               <th>User</th>
               <th>Followers</th>
               <th>Registered Date</th>
            </template>

            <template slot-scope="{row}">
               <th scope="row">
                  <div class="media align-items-center">
                     <a target="_blank" :href="`https://instagram.com/${row.username}`" class="avatar rounded-circle mr-3">
                        <img :alt="`${row.username} profile image`" :src="row.profile_img" class="">
                     </a>
                     <div class="media-body">
                        <router-link :to="`/products/${row._id}`">@{{row.username}}</router-link>
                     </div>
                  </div>
               </th>
               <th>
                  <router-link :to="`/users/${row.user_id}`">{{row.user.name}}</router-link>
               </th>
               <td>
                  {{ formattedFollowerCount(row) }}
               </td>
               <td>
                  {{ registeredDuration(row) | duration('humanize', true) }}
               </td>
            </template>

         </base-table>
      </div>

   </div>
</template>
<script>
   export default {
      name: 'new-instaaccounts',
      props: {
         tableData: Array
      },
      methods: {
         registeredDuration(instaaccount) {
            return new Date(instaaccount.created_at).getTime() - (new Date).getTime()
         },
         formattedFollowerCount(instaaccount) {
            if (parseInt(instaaccount.follower_count) < 100) {
               return instaaccount.follower_count
            }
            let formatted = (parseInt(instaaccount.follower_count) / 1000).toFixed(1)
            if (formatted > 1000) {
               return `${(formatted / 1000).toFixed(2)}M`
            }
            return `${formatted}K`
         }
      },
   }
</script>