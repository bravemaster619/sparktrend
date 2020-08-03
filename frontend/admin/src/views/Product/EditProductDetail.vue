<template>
   <div class="text-sm">
      <div class="form-gruop">
         <div class="form-gruop has-label text-center text-md-left">
            <label class="form-control-label text-uppercase">Categories</label>
            <template v-for="(plan, index) in model.categories">
               <div class="row mb-3" :key="index">
                  <label class="col-12 col-form-label font-weight-bold text-center text-lg-left"><i class="ni ni-tag font-weight-300"></i> {{ plan.type }}</label>
                  <div class="col-12 px-lg-5">
                     <div class="row mb-2" v-for="(pricing, index) in plan.pricing" :key="index">
                        <div class="col-md-4">
                           Time: {{pricing.time}}
                        </div>
                        <div class="col-md-4">
                           Price: ${{pricing.price}}
                        </div>
                        <div class="col-md-4">
                           Bio Price: ${{pricing.bio_price}}
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
         }
      }
   }

</script>