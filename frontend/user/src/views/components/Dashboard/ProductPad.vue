<template>
    <div class="col-12 col-md-4 col-lg-4 p-3 prod-pad-item">
        <router-link :to="`/myproducts/${instaaccount._id}`" class="text-weight-300 d-table text-dark">
            <div class="prod-header p-3">
                <div class="row  d-flex align-items-center">
                    <img :src="instaaccount.profile_img"
                        class="img-fluid img-round img-preview-ig mx-auto">
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center font-size-lg font-weight-500">
                        <span>@{{instaaccount.username}}</span>
                    </div>
                </div>
            </div>
            <div class="prod-body p-3">
                <div class="row d-flex align-items-center mb-2">
                    <div class="col-12 d-flex justify-content-center prod-status mb-2">
                        <span class="text-uppercase py-1 px-2 prod-status" :class="'alert-' + alertClass[accountStatus]">{{$t(accountStatus)}}</span>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 text-center">
                        <div class="d-md-block font-size-lg font-weight-bold">{{getFormattedFollowerCount}}</div>
                        <span class="d-md-block">{{$t("Total Followers")}}</span>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 text-center">
                        <span class="d-md-block font-size-lg font-weight-bold">{{getSuccessRate}}</span>
                        <span class="d-md-block">{{$t("Success Rate")}}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ProductPad",
        data() {
            return {
                alertClass: {
                    "instaaccount.status.verified": "success",
                    "instaaccount.status.in_progress": "info",
                    "instaaccount.status.unverified": "default"
                }
            }
        },
        props: {
            instaaccount: Object
        },
        computed: {
            getFormattedFollowerCount: function() {
                if (parseInt(this.instaaccount.follower_count) < 100) {
                    return this.instaaccount.follower_count
                }
                let formatted = (parseInt(this.instaaccount.follower_count) / 1000).toFixed(1)
                if (formatted > 1000) {
                    return `${(formatted / 1000).toFixed(2)}M`
                }
                return `${formatted}K`
            },
            getSuccessRate: function () {
                if (this.instaaccount.total_shoutout == 0) {
                    return "N/A"
                }
                let percent = (this.instaaccount.completed_shoutout / this.instaaccount.total_shoutout).toFixed(2)
                if (isNaN(percent)) {
                    return "N/A"
                }
                return `${percent}%`
            },
            accountStatus: function() {
                if (this.instaaccount.verified === true && this.instaaccount.allowed === true) {
                    return "instaaccount.status.verified"
                } else {
                    if (this.instaaccount.verified === true) {
                        return "instaaccount.status.in_progress"
                    } else {
                        return "instaaccount.status.unverified"
                    }
                }
            }
        }
    }
</script>
