<template>
    <div class="guide-page">
        <div class="bg-primary-light row justify-content-center align-items-center py-72 px-4">
            <div class="col-12 text-center">
                <h1>{{$t("How it Works")}}</h1>
                <p class="font-italic">{{$t("For Sellers")}}</p>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-1 mb-4">{{$t("guide.seller.one")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/seller-1.png" alt="seller guide step 1">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-light row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-2 order-1 order-md-2 mb-4">
                        {{$t("guide.seller.two")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/seller-2.png" alt="seller guide step 2">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-3 mb-4">{{$t("guide.seller.three")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/seller-3.png" alt="seller guide step 3">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-light row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-4 order-1 order-md-2 mb-4">
                        {{$t("guide.seller.four")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/seller-4.png" alt="seller guide step 4">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-5 mb-4">{{$t("guide.seller.five")}}</div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/seller-5.png" alt="seller guide step 5">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-light row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-6 order-1 order-md-2 mb-4">
                        {{$t("guide.seller.six")}}
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/seller-6.png" alt="seller guide step 6">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-7 mb-4">
                        <p>{{$t("guide.seller.seven.q")}}</p>
                        <p>{{$t("guide.seller.seven.a")}}</p>
                    </div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/seller-7.png" alt="seller guide step 7">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-light row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-8 order-1 order-md-2 mb-4">
                        <p>{{$t("guide.seller.eight.q")}}</p>
                        <p>{{$t("guide.seller.eight.a")}}</p>
                    </div>
                    <div class="col-12 col-lg-6 order-2 order-md-1">
                        <img class="w-100" src="/img/guide/seller-8.png" alt="seller guide step 8">
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12 col-lg-6 step-9 mb-4">
                        {{$t("guide.seller.nine")}}
                    </div>
                    <div class="col-12 col-lg-6">
                        <img class="w-100" src="/img/guide/seller-9.png" alt="seller guide step 9">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-light row align-items-center justify-content-center py-72 px-4">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h2>{{$t("Start selling shoutouts at Sparktrend")}}!</h2>
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