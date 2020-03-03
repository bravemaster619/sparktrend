<template>
        <div class="row mt-4">
            <div class="col-12 text-center">
                <img src="/img/error 404 5-01.png" alt="404 error" style="" class="mx-auto w-100">
                <div class="useful-links">
                    <h4 class="mt-4 text-white">{{$t("Sorry, the page not found")}}</h4>
                    <p class="text-white">{{$t("The link you followed probably broken, or the page has been removed")}}</p>
                    <div >
                        <a @click="historyBack" href="#" class="text-white"><i class="fa fa-arrow-left"></i></a>
                        <router-link to="/" class="text-white"><i class="fa fa-home"></i></router-link>
                        <router-link to="/browse" class="text-white"><i class="fa fa-search"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
   export default {
        methods: {
            locationReload: function() {
                location.reload()
            },
            historyBack: function(e) {
                e.preventDefault();
                e.stopPropagation();
                history.back();
            }
        }
   }
</script>