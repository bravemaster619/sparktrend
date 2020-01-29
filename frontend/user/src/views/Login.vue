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
                            <h3 class="text-center">{{$t("Sign In")}}</h3>
                            <hr class="hr-primary short">
                            <base-input alternative
                                        class="mb-3"
                                        addon-left-icon="ni ni-email-83"
                                        :error="error.email">
                                    <input
                                        class="form-control valid"
                                        :placeholder="$t('Email')"
                                        aria-describedby="addon-right addon-left"
                                        ref="email"
                                        v-model="email">
                            </base-input>
                            <base-input alternative
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        :error="error.password">
                                    <input
                                            v-model="password"
                                            type="password"
                                            class="form-control valid"
                                            :placeholder="$t('Password')"
                                            aria-describedby="addon-right addon-left"
                                            ref="password">
                            </base-input>
                            <div class="form-group input-group">
                                <div class="w-100 d-flex justify-content-between">
<!--                                        <base-checkbox>-->
<!--                                            {{$t("Remember me")}}-->
<!--                                        </base-checkbox>-->
<!--                                        <base-button type="primary" class="my-0 w-100" @click="signIn">{{$t("Sign In")}}</base-button>-->
                                    <effect-button type="primary" class="btn btn-grad-effect w-100 m-0 text-uppercase "
                                                   @click="signIn" :loading="loading" style="height:50px;"
                                                   color="#fff">
                                        {{$t("Sign In")}}
                                    </effect-button>
                                </div>
                            </div>

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
    import EffectButton from "@/components/EffectButton";

    export default {
        components: {
            EffectButton,
        },
        data () {
            return {
                email   :   "",
                password:   "",
                error   :   {
                    email   :   "",
                    password:   ""
                },
                loading : false
            }
        },
        watch : {
            email : function(val){
                if(!val){
                    this.error.email = this.$t("Email must not be empty");
                }else{
                    this.error.email = "";
                }
            },
            password : function(val){
                if(!val){
                    this.error.password = this.$t("Password must not be empty");
                }else{
                    this.error.password = "";
                }
            }
        },
        methods :   {
            signIn() {
                if(!this.validation()) return;

                this.loading = true;
                this.$store.dispatch("auth/login", {email : this.email, password : this.password})
                    .then(() => {
                        window.console.log("logged in");
                        this.loading = false;
                    });
            },
            validation(){
                return !this.isEmpty(this.email) && !this.isEmpty(this.password);
            }
        }
    };
</script>
<style>
</style>
