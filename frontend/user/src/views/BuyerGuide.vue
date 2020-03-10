<template>
    <div class="guide-page">
        <div class="row justify-content-center align-items-center py-72 px-4">
            <div class="col-12 text-center">
                <h1>{{$t("How it Works")}}</h1>
                <p class="font-italic">{{$t("For Buyers")}}</p>
            </div>
        </div>
        <div class="row bg-primary-light align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-1 mb-4">{{$t("guide.buyer.one")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/buyer-1.png" alt="buyer guide step 1">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-2 order-1 order-md-2 mb-4">
                        {{$t("guide.buyer.two")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/buyer-2.png" alt="buyer guide step 2">
                    </div>
                </div>
            </div>
        </div>
        <div class="row bg-primary-light align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-3 mb-4">{{$t("guide.buyer.three")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/buyer-3.png" alt="buyer guide step 3">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-4 order-1 order-md-2 mb-4">
                        {{$t("guide.buyer.four")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/buyer-4.png" alt="buyer guide step 4">
                    </div>
                </div>
            </div>
        </div>
        <div class="row bg-primary-light align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-5 mb-4">{{$t("guide.buyer.five")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/buyer-5.png" alt="buyer guide step 5">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-6 order-1 order-md-2 mb-4">
                        {{$t("guide.buyer.six")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/buyer-6.png" alt="buyer guide step 6">
                    </div>
                </div>
            </div>
        </div>
        <div class="row bg-primary-light align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h2>{{$t("Start buying shoutouts at Sparktrend")}}!</h2>
                        <router-link to="/register" class="btn btn-grad-effect mt-3">{{$t("Sign up Now!")}}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>