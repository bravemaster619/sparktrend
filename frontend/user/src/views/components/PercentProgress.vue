<template>
    <div class="progress-wrapper d-none d-md-block">
        <div class="progress-info">
            <div class="progress-label"><span>{{caption}}</span></div>
            <div class="progress-percentage"><span>{{percent}}%</span></div>
        </div>
        <div class="progress">
            <div v-bind:class="['progress-bar', 'bg-' + color]" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: percent + '%'}"></div>
        </div>
    </div>
</template>
<script>
export default {
   props: {
      percent: {
         type: Number,
         default: 0
      },
      caption: {
         type: String,
         default: ''
      },
      color: {
         type: String,
         default: 'default'
      }
   }
}
</script>
<style>

</style>