<template>
    <footer class="footer">
        <div class="container pt-5 pb-2 text-center text-md-left">
            <div class="row mt-3">
                <div class="col-md-6 mb-4">
                    <div class="w-100">
                        <img alt="logo" src="/img/brand/logo.png" class="footer-logo">
                    </div>
                    <div class="mt-4">
                        <p>&copy; Copyright {{year}} Sparktrend.net</p>
                        <p><a class="text-primary" href="mailto:sparktrend@hotmail.net">sparktrend@hotmail.net</a></p>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <h6 class="text-uppercase font-weight-bold">{{$t("Sitemap")}}</h6>
                    <hr class="hr-primary short mb-4 mt-0 mx-auto d-inline-block">
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/">{{$t("Home")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/login">{{$t("Sign In")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/register">{{$t("Sign Up")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/sellerguide">{{$t("Seller Guide")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/buyerguide">{{$t("Buyer Guide")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/terms">{{$t("Terms of Service")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/policy">{{$t("Privacy Policy")}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3 mb-4">
                    <h6 class="text-uppercase font-weight-bold">{{$t("Useful Links")}}</h6>
                    <hr class="hr-primary short mb-4 mt-0 mx-auto d-inline-block">
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/dashboard/main">{{$t("Dashboard")}}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link class="btn-link text-primary" to="/browse">{{$t("Browse")}}</router-link>
                        </li>
<!--                        <li class="mb-2">-->
<!--                            <router-link class="btn-link text-primary" to="/invite">{{$t("Refer a Friend")}}</router-link>-->
<!--                        </li>-->
<!--                        <li class="mb-2">-->
<!--                            <router-link class="btn-link text-primary" to="/affiliate">{{$t("Affiliate")}}</router-link>-->
<!--                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
