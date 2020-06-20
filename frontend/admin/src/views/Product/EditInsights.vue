<template>
   <div class="row text-sm">
      <div class="col-12">
         <div class="row">
            <div class="col-12 col-md-6 mb-3">
               <div class="form-group has-label text-center text-md-left">
                  <label class="form-control-label text-uppercase">Insights Picture</label>
               </div>
               <div v-viewer class="images clearfix row">
                  <div class="col-12 col-md-6 mb-2" v-for="(insights_picture, index) in insights_pictures" :key="index">
                     <img
                        :alt="`${username} insights picture`"
                        :src="insights_picture"
                        class="img-fluid object-fit-cover cursor-pointer img-insights"
                     >
                     <button class="btn btn-xs btn-delete remove-image" @click="removeInsightPicture(index)">
                        <i class="fa fa-trash"></i>
                     </button>
                  </div>
                  
               </div>
            </div>
            <div class="col-12 col-md-6 mb-3">
               <div class="row">
                  <div class="col-12 form-group has-label text-center text-md-left">
                     <label class="text-uppercase font-weight-bold mb-0">Age</label>
                  </div>
                  <template v-for="(dg, key) in demographics.age" >
                     <div class="col-12" :key="key">
                        <div class="row">
                           <label class="col-form-label col-6 col-md-3 text-right">{{dg.name}}</label>
                           <div class="col-6 col-md-9">
                              <input type="number" min="0" max="100" class="form-control" v-model="dg.percent" @change="dataChanged">
                           </div>
                        </div>
                     </div>
                  </template>
               </div>
            </div>
         </div>
      </div>
      <div class="col-12">
         <div class="row">
            <div class="col-12 col-md-6 mb-3">
               <div class="row">
                  <div class="col-12 text-center text-md-left">
                     <label class="text-uppercase font-weight-bold">Country</label>
                  </div>
               </div>
               <template v-for="(dg, key) in demographics.country" >
                  <div class="col-12" :key="key">
                     <div class="row">
                        <div class="col-6">
                           <input type="text" class="form-control" v-model="dg.name">
                        </div>
                        <div class="col-6">
                           <input type="number" min="0" max="100" class="form-control" v-model="dg.percent" @change="dataChanged">
                        </div>
                     </div>
                  </div>
               </template>
            </div>
            <div class="col-12 col-md-6 mb-3">
               <div class="row">
                  <div class="col-12 text-center text-md-left">
                     <label class="text-uppercase font-weight-bold">Gender</label>
                  </div>
               </div>
               <template v-for="(dg, key) in demographics.gender" >
                  <div class="col-12" :key="key">
                     <div class="row">
                        <label class="col-form-label col-6 col-md-3 text-right">{{dg.name}}</label>
                        <div class="col-6 col-md-9">
                           <input type="number" min="0" max="100" class="form-control" v-model="dg.percent" @change="dataChanged">
                        </div>
                     </div>
                  </div>
               </template>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import 'viewerjs/dist/viewer.css'
   import VueViewer from 'v-viewer'
   import Vue from 'vue'
   Vue.use(VueViewer)
   import httpService from "../../services/http"
   export default {
      name: 'edit-insights',
      props: {
         username: String,
         insights_pictures: Array,
         demographics: Object
      },
      data() {
         return {
            model: this.demographics ? this.demographics : {
               age: [
                  { name: '13-17', percent: 0 },
                  { name: '18-24', percent: 0 },
                  { name: '25-34', percent: 0 },
                  { name: '35-44', percent: 0 },
                  { name: '45-54', percent: 0 },
                  { name: '55-64', percent: 0 },
                  { name: '65+', percent: 0 }
               ],
               gender: [
                  { name: 'Men', percent: 0 },
                  { name: 'Women', percent: 0 }
               ],
               country: [
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 },
                  { name: '', percent: 0 }
               ]
            },
            
         }
      },
      methods: {
         dataChanged : function() {
            this.$emit('change', this.model)
         },
         removeInsightPicture: function(index) {
            this.$emit('removeinsights', index)
         }
      }
   }
</script>
<style>
.img-insights {
   max-height: 120px;
   width: 100%;
   object-fit: cover;
}
.remove-image {
    position: absolute;
        margin-top: 5px;
        margin-left: -30px;
        color: rgba(0,0,0,0.5);
        padding: 1px 6px;
        background-color: rgba(0,0,0,0.3);
}
</style>