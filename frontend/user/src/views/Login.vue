<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-primary">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-3"
                          class="border-0">

                        <template>

                            <form role="form">
                                <h3 class="text-center">{{$t("Sign In")}}</h3>
                                <hr class="hr-primary short">
                                <base-input alternative
                                            class="mb-3"
                                            :placeholder="$t('Email')"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            :placeholder="$t('Password')"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="form-group input-group">
                                    <div class="w-100 d-flex justify-content-between">
<!--                                        <base-checkbox>-->
<!--                                            {{$t("Remember me")}}-->
<!--                                        </base-checkbox>-->
                                        <base-button type="primary" class="my-0 w-100">{{$t("Sign In")}}</base-button>
                                    </div>
                                </div>
                            </form>
                        </template>
                        <template>
                            <div class="text-muted text-center">
                                <small class="mr-2">Sign in with</small>
                                <img slot="icon" src="img/icons/common/instagram.svg" class="d-inline-block mr-1" style="height: 18px;">
                                <router-link type="neutral" to="/oauth">
                                    <small>Instagram</small>
                                </router-link>
                            </div>
                            <div class="mt-2 text-center">
                                <router-link to="/passwordreset" class="text-primary"><small>{{$t("Forgot password?")}}</small></router-link>
                            </div>
                            <div class="mt-2 text-center text-muted">
                                <small class="mr-2">New to influencer?</small>
                                <router-link to="/register" class="text-primary d-block d-md-inline">
                                    <small>{{$t("Create new account")}}</small>
                                </router-link>
                            </div>
                        </template>
                    </card>

                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {};
</script>
<style>
</style>
