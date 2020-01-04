<template>
    <div class="shoutout">
        <h6 class="dashboard-home-title">{{title}}</h6>
        <div class="d-flex flex-column card card-transparent">
            <h2 class="text-neon-green">{{total_info.pending}}</h2>
            <div class="dashboard-home-title">PENDING/ONGOING</div>
            <h2 class="text-neon-green">{{total_info.expired}}</h2>
            <div class="dashboard-home-title">EXPIRED</div>
            <h2 class="text-neon-green">{{total_info.failed}}</h2>
            <div class="dashboard-home-title">FAILED</div>
            <h2 class="text-neon-green">{{total_info.rejected}}</h2>
            <div class="dashboard-home-title">REJECTED</div>
            <h2 class="text-neon-green">{{total_info.completed}}</h2>
            <div class="dashboard-home-title">COMPLETED</div>
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