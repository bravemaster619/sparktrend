<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Schedule</th>
            <th>Username</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="item in schedule" :key="item.no">
                <td>{{item.no}}</td>
                <td>{{item.schedule_rep}}</td>
                <td>{{item.username}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "OverviewScheduleTable",
        props: {
            schedule: {
                type: Array,
            }
        }
    }
</script>

<style scoped>

</style>