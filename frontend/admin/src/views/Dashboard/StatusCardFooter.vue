<template>
   <div>
      <span :class="spanClassName" class="mr-2"><i class="fa" :class="iconClassName"></i> {{increase.toFixed(2)}}%</span>
      <span class="text-nowrap">{{text}}</span>
   </div>
</template>
<script>
   export default {
      name: 'status-card-footer',
      mounted() {
         window.vuetemp=this
      },
      props: {
         increase: {
            type: Number,
            required: true
         },
         text: {
            type: String,
            default: 'Since last month'
         }
      },
      computed: {
          spanClassName: function() {
             if(this.increase >= 0) {
                return 'text-success'
             } else {
                return 'text-danger'
             }
          },
         iconClassName: function() {
             if(this.increase > 0) {
                return 'fa-arrow-up'
             } else if(this.increase == 0) {
                return 'fa-arrow-right'
             } else {
                return 'fa-arrow-down'
             }
         }
      }
   }
</script>