<template>
    <header class="header-global">
        <base-nav class="navbar-main" :transparent="['landing', 'login', 'register'].includes(currentRoute)" type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img v-if="['landing', 'login', 'register'].includes(currentRoute)"
                        src="/img/brand/logo.png" alt="logo">
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
        <nav v-if="isLoggedIn" id="bottombar" class="list-unstyled d-block d-lg-none border-top border-primary">
            <div class="row justify-content-around p-3 pb-2 m-0">
                <div class="bottombar-link">
                    <router-link to="/browse">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M501 447.9L347.5 294.4c20-30 31.7-66.1 31.7-104.8C379.2 85.1 294.2 0 189.6 0S0 85.1 0 189.6s85.1 189.6 189.6 189.6c38.7 0 74.8-11.7 104.8-31.7L447.9 501c7.1 7.1 16.5 11 26.6 11 10 0 19.5-3.9 26.6-11C515.7 486.4 515.7 462.5 501 447.9zM189.6 359.2c-93.5 0-169.6-76.1-169.6-169.6C20 96.1 96.1 20 189.6 20s169.6 76.1 169.6 169.6S283.1 359.2 189.6 359.2zM486.9 486.9c-3.3 3.3-7.7 5.1-12.4 5.1 -4.7 0-9.1-1.8-12.4-5.1L310.6 335.5c9-7.5 17.3-15.8 24.8-24.8l151.4 151.4C493.7 468.9 493.7 480 486.9 486.9z"></path><path d="M189.6 45.2c-79.6 0-144.4 64.8-144.4 144.4 0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-68.6 55.8-124.4 124.4-124.4 5.5 0 10-4.5 10-10S195.1 45.2 189.6 45.2z"></path><path d="M320 127.5c-14.2-29.8-38.5-54-68.2-68.3 -5-2.4-11-0.3-13.3 4.7 -2.4 5-0.3 11 4.7 13.3 25.7 12.3 46.6 33.1 58.8 58.8 1.7 3.6 5.3 5.7 9 5.7 1.4 0 2.9-0.3 4.3-1C320.3 138.4 322.4 132.4 320 127.5z"></path></svg>
                        <span>{{$t("Browse")}}</span>
                    </router-link>
                </div>
                <div class="bottombar-link">
                    <router-link to="/dashboard/main">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M332.8 362.7H179.2c-5.1 0-8.5 3.4-8.5 8.5v51.2c0 5.1 3.4 8.5 8.5 8.5h153.6c5.1 0 8.5-3.4 8.5-8.5v-51.2C341.3 366.1 337.9 362.7 332.8 362.7zM324.3 413.9H187.7v-34.1h136.5V413.9z"></path><path d="M337.1 209.9l-41 24.7c-14.5 8.5-29.9 16.2-44.4 23 -4.3 1.7-9.4 4.3-14.5 6.8 -17.9 9.4-27.3 29-23 48.6 3.4 15.4 16.2 28.2 31.6 31.6 3.4 0.9 6.8 0.9 10.2 0.9 16.2 0 30.7-9.4 38.4-23.9 1.7-4.3 4.3-9.4 6.8-14.5 7.7-14.5 14.5-29.9 23-44.4l24.7-41c1.7-3.4 0.9-6.8-1.7-10.2C344.7 208.2 340.5 208.2 337.1 209.9zM309.8 253.4c-9.4 15.4-17.1 30.7-23.9 46.1 -1.7 5.1-4.3 9.4-6.8 14.5 -5.1 11.1-17.1 16.2-29 13.7 -9.4-1.7-17.1-9.4-18.8-18.8 -2.6-11.9 2.6-23.9 13.7-29 4.3-2.6 9.4-4.3 14.5-6.8 15.4-7.7 31.6-15.4 46.1-23.9l11.1-6.8L309.8 253.4z"></path><path d="M493.7 208.2c-0.1-0.6-0.3-1.1-0.5-1.7 -0.2-0.6-0.5-1.1-0.8-1.5 -12.8-30.6-31.4-58.3-54.3-81.6 -0.3-0.5-0.7-0.9-1.1-1.4s-0.9-0.8-1.4-1.1C389.2 75.2 325.8 46.9 256 46.9c-33.4 0-65.4 6.5-94.7 18.3 -0.6 0.1-1.1 0.3-1.7 0.5 -0.6 0.2-1.1 0.5-1.5 0.8 -30.6 12.8-58.3 31.4-81.6 54.3 -0.5 0.3-0.9 0.7-1.4 1.1s-0.8 0.9-1.1 1.4C28.3 169.7 0 233.2 0 302.9c0 58 18.8 113.5 55.5 158.7 1.7 2.6 4.3 3.4 6.8 3.4h387.4c2.6 0 5.1-0.9 6.8-3.4C493.2 416.4 512 361 512 302.9 512 269.5 505.5 237.5 493.7 208.2zM446.3 448H66.6c-11.5-14.9-21.1-30.8-28.7-47.6l23.6-9.6c4.3-1.7 6-6.8 4.3-11.1 -1.7-4.3-6.8-6-11.1-4.3l-23.1 9.4c-8.6-23.3-13.4-48-14.3-73.4H76.8c5.1 0 8.5-3.4 8.5-8.5S81.9 294.4 76.8 294.4H17.2c1-26.9 6.4-52.7 15.6-76.7L56.3 227.8c0.9 0.9 2.6 0.9 3.4 0.9 3.4 0 6-1.7 7.7-5.1 1.7-4.3 0-9.4-4.3-11.1l-23.7-10.2c10.7-22.8 24.9-43.7 41.9-62l17.6 17.6c1.7 1.7 3.4 2.6 6 2.6s4.3-0.9 6-2.6c3.4-3.4 3.4-8.5 0-11.9l-17.6-17.6c19.1-17.8 41.1-32.6 65.2-43.4l9.5 23.5c0.9 3.4 4.3 5.1 7.7 5.1 0.9 0 1.7 0 3.4-0.9 4.3-1.7 6-6.8 4.3-11.1l-9.3-23c23-8.5 47.7-13.5 73.3-14.4v59.6c0 5.1 3.4 8.5 8.5 8.5s8.5-3.4 8.5-8.5V64.2c26.9 1 52.7 6.4 76.7 15.6l-10.1 23.4c-1.7 4.3 0 9.4 4.3 11.1 0.9 0.9 2.6 0.9 3.4 0.9 3.4 0 6.8-2.6 7.7-5.1l10.2-23.7c22.8 10.7 43.7 24.9 62 41.9l-17.6 17.6c-3.4 3.4-3.4 8.5 0 11.9 1.7 1.7 3.4 2.6 6 2.6 1.7 0 4.3-0.9 6-2.6l17.6-17.6c17.8 19.1 32.6 41.1 43.4 65.2l-23.5 9.5c-4.3 1.7-6 6.8-4.3 11.1 0.9 3.4 4.3 5.1 7.7 5.1 0.9 0 1.7-0.9 3.4-0.9l23-9.3c8.5 23 13.5 47.7 14.4 73.3H435.2c-5.1 0-8.5 3.4-8.5 8.5s3.4 8.5 8.5 8.5h59.6c-0.9 26.6-6.2 52.5-15.4 76.8l-23.7-10.2c-4.3-1.7-9.4 0-11.1 4.3 -1.7 4.3 0 9.4 4.3 11.1l24 10.4C465.6 419.3 456.8 434.1 446.3 448z"></path></svg>
                        <span>{{$t("Dashboard")}}</span>
                    </router-link>
                </div>
                <div class="bottombar-link">
                    <router-link to="/myorders/purchases">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M11.7 13l-0.8-5h-3C7.4 6.3 5.9 5 4 5 1.8 5 0 6.8 0 9s1.8 4 4 4c1.9 0 3.4-1.3 3.9-3h1.3l0.5 3H9.6l5.2 26c-2.5 0.2-4.5 2.1-4.8 4.5 -0.1 1.4 0.3 2.8 1.3 3.9C12.2 48.4 13.6 49 15 49h2c0 3.3 2.7 6 6 6s6-2.7 6-6h11c0 3.3 2.7 6 6 6s6-2.7 6-6h4c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4.3c-0.8-2.3-3-4-5.6-4s-4.8 1.7-5.6 4h-11.7c-0.8-2.3-3-4-5.6-4s-4.8 1.7-5.6 4H15c-0.8 0-1.7-0.4-2.2-1 -0.6-0.6-0.8-1.5-0.8-2.3 0.2-1.5 1.5-2.7 3.2-2.7h0.8c0 0 0 0 0 0h39C57.8 41 60 38.8 60 36V13H11.7zM4 11c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2S5.1 11 4 11zM46 45c2.2 0 4 1.8 4 4s-1.8 4-4 4 -4-1.8-4-4S43.8 45 46 45zM23 45c2.2 0 4 1.8 4 4s-1.8 4-4 4 -4-1.8-4-4S20.8 45 23 45zM58 36C58 37.7 56.7 39 55 39H16.8l-4.8-24H58V36z"></path></svg>
                        <span>{{$t("My Purchase")}}</span>
                    </router-link>
                </div>
                <div class="bottombar-link">
                    <router-link to="/myproducts">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M366.1 0H145.9C65.7 0 0 65.7 0 145.9v220.2C0 446.3 65.7 512 145.9 512h220.2C446.3 512 512 446.3 512 366.1V145.9C512 65.7 446.3 0 366.1 0zM494.9 366.1c0 70.8-58 128.9-128.9 128.9H145.9c-70.8 0-128.9-58-128.9-128.9V145.9c0-70.8 58-128.9 128.9-128.9h220.2c70.8 0 128.9 58 128.9 128.9V366.1z"></path><path d="M366.1 51.2H145.9c-52.1 0-94.7 42.7-94.7 94.7v220.2c0 52.1 42.7 94.7 94.7 94.7h220.2c52.1 0 94.7-42.7 94.7-94.7V145.9C460.8 93.9 418.1 51.2 366.1 51.2zM443.7 366.1c0 42.7-35 77.7-77.7 77.7H145.9c-42.7 0-77.7-35-77.7-77.7V145.9c0-42.7 35-77.7 77.7-77.7h220.2c42.7 0 77.7 35 77.7 77.7V366.1z"></path><path d="M256 119.5c-75.1 0-136.5 61.4-136.5 136.5S180.9 392.5 256 392.5 392.5 331.1 392.5 256 331.1 119.5 256 119.5zM256 375.5c-65.7 0-119.5-53.8-119.5-119.5S190.3 136.5 256 136.5 375.5 190.3 375.5 256 321.7 375.5 256 375.5z"></path><path d="M256 162.1c-52.1 0-93.9 41.8-93.9 93.9 0 52.1 41.8 93.9 93.9 93.9s93.9-41.8 93.9-93.9S308.1 162.1 256 162.1zM256 332.8c-42.7 0-76.8-34.1-76.8-76.8 0-42.7 34.1-76.8 76.8-76.8 42.7 0 76.8 34.1 76.8 76.8C332.8 298.7 298.7 332.8 256 332.8z"></path><path d="M392.5 93.9c-14.5 0-25.6 11.1-25.6 25.6s11.1 25.6 25.6 25.6c14.5 0 25.6-11.1 25.6-25.6S407 93.9 392.5 93.9z"></path></svg>
                        <span>{{$t("My Products")}}</span>
                    </router-link>
                </div>

            </div>
        </nav>
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
