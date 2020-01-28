<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>{{$t("Schedule")}}</th>
            <th>{{$t("Username")}}</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(order, index) in orders" :key="index">
                <td>{{index + 1}}</td>
                <td>{{$t(`order_status.shoutout.${getOrderShoutoutStatus(order)}`)}}</td>
                <td>{{order.username}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {getOrderShoutoutStatus} from "../../../helpers";

    export default {
        name: "OverviewScheduleTable",
        props: {
            orders: Array
        },
        methods: {
            getOrderShoutoutStatus,
        }
    }
</script>

<style scoped>

</style>