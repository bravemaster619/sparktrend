<template>
   <div class="text-sm">
      <div class="form-gruop">
         <div class="form-gruop has-label text-center text-md-left">
            <label class="form-control-label text-uppercase">Categories</label>
            <template v-for="(plan, catIndex) in model.categories">
               <div class="row mb-3" :key="catIndex">
                  <div class="col-12">
                    <label class="font-weight-bold text-center text-lg-left"><i class="ni ni-tag font-weight-300"></i> {{ plan.type }}</label>
                    <button class="btn btn-xs ml-2 p-1" @click="addPlan(catIndex)"><i class="fa fa-plus text-primary"></i></button>
                  </div>
                  <div class="col-12 px-lg-5">
                     <div class="row mb-2" v-for="(pricing, planIndex) in plan.pricing" :key="catIndex + planIndex">
                        <div class="col-md-4">
                          <button class="btn btn-xs mr-2 p-1" @click="removePlan(catIndex, planIndex)"><i class="fa fa-minus text-danger"></i></button>
                          <label class="form-label">Time</label>
                          <input type="number" min="0" class="form-control" v-model="pricing.time"/>
                        </div>
                        <div class="col-md-4">
                          <label class="form-label">Price</label>
                          <input type="number" min="0" class="form-control" v-model="pricing.price" />
                        </div>
                        <div class="col-md-4">
                          <label class="form-label">Bio Price</label>
                          <input type="number" min="0" class="form-control" v-model="pricing.bio_price" />
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </div>
      </div>
      <div class="form-group">
         <div class="form-group has-label text-center text-md-left">
            <label class="form-control-label text-uppercase">Niches</label>
            <select class="form-control" v-model="model.niches">
               <option disabled value="">Please select niches</option>
               <option v-for="(n, i) in niches" :key="i" :value="n.text">
                  {{n.text}}
               </option>
            </select>
         </div>
      </div>
      <div class="form-group">
         <div class="form-group has-label text-center text-md-left">
            <label class="form-control-label text-uppercase">
               Description
            </label>
            <textarea rows="7" placeholder="A few words about this product..." class="form-control form-control-alternative" v-model="model.description" />
         </div>
      </div>
   </div>
</template>
<script>
   import config from '../../config/config'
   export default {
      name: 'edit-product-detail',
      props: {
         product: Object
      },
      data() {
         return {
            model: this.product ? this.product: {
               description: '',
               niches: '',
               categories: []
            },
            niches: config.niches.map(niche => { return { ...niche, checked: false } })
         }
      },
      methods: {
         dataChanged : () => {
            this.$emit('change', this.model)
         },
         removePlan: function(catIndex, planIndex) {
            this.model.categories[catIndex].pricing.splice(planIndex, 1)
         },
         addPlan: function(catIndex) {
           this.model.categories[catIndex].pricing.push({
             time: 0,
             price: 0,
             bio_price: 0
           })
         }
      }
   }

</script>