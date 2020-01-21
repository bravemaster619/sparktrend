<template>
    <div class="col-12 col-md-4 col-lg-4 p-2 prod-pad-item">
        <a href="#" class="text-weight-300 d-table text-dark">
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
                        <span class="text-uppercase alert-success p-1 prod-status">{{$t("in_progress")}}</span>
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
        </a>
    </div>
</template>

<script>
    export default {
        name: "ProductPad",
        data() {
            return {

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
            }
        }
    }
</script>
