<template>
    <div>
        <div class="section-shaped">
            <section class="section-hero">
                <div class="shape shape-style-1 shape-primary shape-skew">
                    <span class="span-150"></span>
                    <span class="span-50"></span>
                    <span class="span-50"></span>
                    <span class="span-75"></span>
                    <span class="span-100"></span>
                    <span class="span-75"></span>
                    <span class="span-50"></span>
                    <span class="span-100"></span>
                    <span class="span-50"></span>
                    <span class="span-100"></span>
                </div>
                <div class="container d-flex">
                    <div class="col px-0 py-4">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-md-7 d-flex order-1 order-md-0  mt-4 text-center text-md-left">
                                <div class="row">
                                    <div class="col-12">
                                        <h3 class="text-white">{{$t('home.main_legend')}}</h3>
                                        <router-link class="mt-3 btn btn-1 btn-outline-primary" to="/browse">{{$t('Browse Influencers')}}
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-5 d-flex order-0 order-md-1 justify-content-center">
                                <img src="img/header-banner-image.png" class="img-fluid header-banner">
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section class="section-buyers">
                <div class="container">
                    <div class="row mt-4">
                        <div class="card p-4">
                            <h2 class="text-center mt-4">{{$t('Sparktrend for Buyers')}}</h2>
                            <hr class="hr-primary short mb-4 mt-0 mx-auto d-inline-block">
                            <div class="row text-center mt-5">
                                <div class="col-12 col-md-4 d-flex flex-column">
                                    <div class="row">
                                        <div class="col-12">
                                            <img class="mx-auto landing-icon" src="img/img-landing-target.png"
                                                 alt="img-landing-target">
                                        </div>
                                        <div class="col-12 mt-3">
                                            <h5>{{$t('Targeted Influencers')}}</h5>
                                            <p>{{$t('home.targeted_influencers_desc')}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 d-flex flex-column">
                                    <div class="row">
                                        <div class="col-12">
                                            <img class="mx-auto landing-icon" src="img/img-landing-trust.png"
                                                 alt="img-landing-target">
                                        </div>
                                        <div class="col-12 mt-3">
                                            <h5>{{$t('Secure Transaction')}}</h5>
                                            <p>{{$t('home.secure_transaction_desc')}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 d-flex flex-column">
                                    <div class="row">
                                        <div class="col-12">
                                            <img class="mx-auto landing-icon" src="img/img-landing-verified.jpeg"
                                                 alt="img-landing-target">
                                        </div>
                                        <div class="col-12 mt-3">
                                            <h5>{{$t('Easy to Use')}}</h5>
                                            <p>{{$t('home.easy2_use_desc')}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        <div>
            <section class="section-sellers">
                <div class="container">
                    <div class="row text-center justify-content-center">
                        <div class="col-12 col-md-10">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <img class="mx-auto landing-icon" src="img/img-landing-advantages.jpeg"
                                         alt="img-landing-target">
                                </div>
                                <div class="d-flex flex-column justify-content-center col-12 col-sm-6 text-center text-sm-left mt-sm-3">
                                    <h3>{{$t("SparkTrend for Influencers")}}</h3>
                                    <div class="px-4">
                                        <ul class="list-unstyled text-left ml-2 landing-list">
                                            <li>{{$t("SparkTrend will provide the influencer with a clear detailed order requierment to provide a professional service")}}</li>
                                            <li>{{$t("SparkTrend will guarantee a safe and Secure transaction")}}</li>
                                            <li>{{$t("SparkTrend will help influencers find more brands to pay for their posts")}}</li>
                                            <li>{{$t("SparkTrend provides an Easy to use dashboard to manage all the sales and Ad process for the influencers")}}</li>
                                            <li>{{$t("User-friendly dashboard for sellers to easily process and manage sales")}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section-wave">
                <div class="container py-4">
                    <div class="row justify-content-center">
                        <div class="col-10">
                            <div class="card text-center mx-auto">
                                <div class="d-flex">
                                    <div class="d-flex flex-column justify-content-center w-100">
                                        <h3>{{$t("Are you ready to take your business to the next level?")}}</h3>
                                        <div class="d-flex justify-content-center mt-2">
                                            <router-link class="btn btn-1 btn-outline-success" aria-current="false" to="/register">{{$t("Sign Up")}}
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

</template>

<script>
   export default {
      name: "home",
      components: {}
   };
</script>
