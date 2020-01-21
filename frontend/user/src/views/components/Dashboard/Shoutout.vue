<template>
    <div class="shoutout">
        <h6 class="dashboard-home-title text-uppercase">{{$t(title)}}</h6>
        <div class="d-flex flex-column card card-transparent">
            <h2 class="text-primary">{{total_info.pending}}</h2>
            <div class="dashboard-home-title text-uppercase">{{$t("Pending Outgoing")}}</div>
            <h2 class="text-primary">{{total_info.expired}}</h2>
            <div class="dashboard-home-title text-uppercase">{{$t("Expired")}}</div>
            <h2 class="text-primary">{{total_info.failed}}</h2>
            <div class="dashboard-home-title text-uppercase">{{$t("Failed")}}</div>
            <h2 class="text-primary">{{total_info.rejected}}</h2>
            <div class="dashboard-home-title text-uppercase">{{$t("Rejected")}}</div>
            <h2 class="text-primary">{{total_info.completed}}</h2>
            <div class="dashboard-home-title text-uppercase">{{$t("Completed")}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shoutout",
        props: {
            title: String,
            total_info: Object
        }
    }
</script>

<style scoped>

</style>