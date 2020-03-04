<template>
    <header class="header-global">
        <base-nav class="navbar-main" :transparent="['landing', 'login', 'register'].includes(currentRoute)" type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img v-if="['landing', 'login', 'register'].includes(currentRoute)"
                        src="/img/brand/logo-white.png" alt="logo">
                <img v-else
                        src="/img/brand/logo.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                        <img src="/img/brand/logo.png">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>
            <ul v-if="!isLoggedIn" class="navbar-nav align-items-lg-center ml-lg-auto h-sm-100vh py-3">
                <li class="nav-item d-none d-lg-block ml-lg-2">
                    <router-link to="/login" class="btn btn-primary btn-icon">
                        <span class="nav-link-inner--text">{{$t('Sign In')}}</span>
                    </router-link>
                </li>
                <li class="nav-item d-none d-lg-block ml-lg-2">
                    <router-link to="/register" class="btn btn-neutral btn-icon">
                        <span class="nav-link-inner--text">{{$t('Sign Up')}}</span>
                    </router-link>
                </li>
                <div class="d-inline text-white d-none d-lg-block ml-2 cursor-pointer">
                    <span @click="setLocale('en')">EN</span> | <span @click="setLocale('ar')">AR</span>
                </div>

                <li class="nav-item d-block d-lg-none p-3 font-size-lg font-weight-light border border-primary border-top-0 border-right-0 border-left-0 text-primary">
                    <span @click="setLocale('en')">EN</span> | <span @click="setLocale('ar')">AR</span>
                </li>
                <li class="nav-item d-block d-lg-none p-3 font-size-lg font-weight-light border border-primary border-top-0 border-right-0 border-left-0">
                    <router-link to="/browse">{{$t('Browse')}}</router-link>
                </li>
                <li class="nav-item d-block d-lg-none p-3 border-bottom-1 font-size-lg font-weight-light border border-primary border-top-0 border-right-0 border-left-0">
                    <router-link to="/login">{{$t('Sign In')}}</router-link>
                </li>
                <li class="nav-item d-block d-lg-none p-3 border-bottom-1 font-size-lg font-weight-light border border-primary border-top-0 border-right-0 border-left-0">
                    <router-link to="/register">{{$t('Sign Up')}}</router-link>
                </li>
            </ul>
            <ul v-if="isLoggedIn" class="navbar-nav align-items-lg-center ml-lg-auto h-sm-100vh py-3">
                <li class="nav-item d-none d-lg-block ml-lg-2">
                    <router-link :to="{name:'browse'}" class="align-bottom">
                        <span class="nav-link-inner--text text-uppercase white-color  d-flex align-items-center"
                              :class="[{'color-theme' : !['landing', 'login', 'register'].includes(currentRoute)}]"
                                style="padding:1rem;">
                            <i class="ni ni-world mr-2"></i>
                            {{$t("browse")}}
                        </span>
                    </router-link>
                </li>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <span class="nav-link-inner--text text-uppercase white-color d-flex align-items-center dropdown-toggle"
                              :class="[{'color-theme' : !['landing', 'login', 'register'].includes(currentRoute)} ]">
                            <i class="ni ni-money-coins mr-2"></i>
                            {{$t("Dashboard")}}
                        </span>
                    </a>
                    <router-link :to="{name:'dashboard_main'}" class="dropdown-item color-theme">{{$t("Overview")}}</router-link>
                    <router-link :to="{name:'dashboard_purchase'}" class="dropdown-item color-theme">{{$t("My Purchases")}}</router-link>
                    <router-link :to="{name:'mysales'}" class="dropdown-item color-theme">{{$t("My Sales")}}</router-link>
                    <router-link :to="{name:'myproducts'}" class="dropdown-item color-theme">{{$t("My Products")}}</router-link>
                </base-dropdown>

                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <span class="nav-link-inner--text text-uppercase white-color d-flex align-items-center dropdown-toggle"
                              :class="[{'color-theme' : !['landing', 'login', 'register'].includes(currentRoute)} ]">
                            <i class="ni ni-circle-08 mr-2"></i>{{this.name}}
                        </span>
                    </a>
                    <router-link :to="{name:'profile'}" class="dropdown-item color-theme">{{$t("Edit Profile")}}</router-link>
                    <router-link :to="{name:'change_password'}" class="dropdown-item color-theme">{{$t("Change Password")}}</router-link>
                    <a class="dropdown-item color-theme" @click.prevent="signOut">{{$t("Sign Out")}}</a>
                </base-dropdown>
                <div class="cursor-pointer nav-link white-color">
                    <span @click="setLocale('en')">EN</span> | <span @click="setLocale('ar')">AR</span>
                </div>
            </ul>
        </base-nav>

    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { setLocale, getLocale } from "../services/lang.service";

export default {
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.logged_in ;
        },
        currentRoute() {
            return this.$route.name;
        },
        name() {
            return this.$store.state.auth.user.name;
        }
    },
    methods:{
        signOut(){
            this.$store.dispatch("auth/logout");
        },
        setLocale(locale) {
            setLocale(locale)
            this.$i18n.locale = getLocale()
        },
        getLocale
    },
};
</script>
<style scoped>
    .white-color{
        color: #fff;
    }
    .nav-item span{
        -webkit-transition: all 0.6s ease ;
        -moz-transition: all 0.6s ease ;
        -ms-transition: all 0.6s ease ;
        -o-transition: all 0.6s ease ;
        transition: all 0.6s ease ;
    }
    .navbar-nav .nav-link{
        font-size:1rem;
        font-weight: 300;
    }
    .dropdown-toggle::after {
        vertical-align: middle !important;
    }
    .dropdown-toggle::after {
        display: inline-block;
        margin-left: .255em;
        vertical-align: .255em;
        content: "";
        border-top: .3em solid;
        border-right: .3em solid transparent;
        border-bottom: 0;
        border-left: .3em solid transparent;
    }
    .dropdown-item:active{
        color:  #fff !important;
    }
    .dropdown-item.active{
        color:  #fff !important;
    }
    @media(max-width: 991px) {
        .white-color{
            color: #5e72e4;
        }
    }
</style>
