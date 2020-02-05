<template>
   <div class="row text-sm">
      <div class="col-12">
         <div class="row">
            <div class="col-12 col-md-6 mb-3">
               <div class="form-group has-label text-center text-md-left">
                  <label class="form-control-label text-uppercase">Insights Picture</label>
               </div>
               <div v-viewer class="images clearfix">
                  <img
                     :alt="`${username} insights picture`"
                     :src="`${insights_picture ? insights_picture : '/img/placeholder-img.jpg'}`"
                     class="img-fluid object-fit-cover cursor-pointer"
                     style="max-height: 500px;"
                  >
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

   export default {
      name: 'edit-insights',
      props: {
         username: String,
         insights_picture: String,
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
            }
         }
      },
      methods: {
         dataChanged : function() {
            this.$emit('change', this.model)
         }
      }
   }
</script>