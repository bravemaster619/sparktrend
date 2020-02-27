<template>
    <div class="row mt-4">
        <div class="col-12 text-center">
            <img src="/img/404.jpg" alt="404 error" style="" class="mx-auto">
        </div>
        <div class="col-12 text-center">
            <h4 class="mt-4">{{$t("Oops!")}}</h4>
            <p>{{$t("Looks like there's nothing here...")}}</p>
        </div>
        <div class="col-12 text-center mt-2">
            <router-link to="/"><i class="ni ni-shop mr-2"></i>Home</router-link>
        </div>
        <div class="col-12 text-center mt-2">
            <a href="javascript:;" @click="locationReload"><i class="ni ni-curved-next mr-2"></i>Reload</a>
        </div>
    </div>
</template>
<script>
   export default {
        methods: {
            locationReload: function() {
                location.reload()
            }
        }
   }
</script>