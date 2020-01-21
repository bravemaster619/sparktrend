<template>
<div class="row">
    <div class="col-12">
        <h6 class="dashboard-home-title text-uppercase">{{$t("Status")}}</h6>
    </div>
    <div class="col-sm-6 col-12 mt-3 mt-sm-0">
        <status-card :title="$t('This Month Sales')" :amount="monthly_income"></status-card>
    </div>

    <div class="col-sm-6 col-12 mt-3 mt-sm-0">
        <status-card :title="$t('Total Sales')" :amount="total_income"></status-card>
    </div>

<!--    <div class="col-sm-4 col-12 mt-3 mt-sm-0">-->
<!--        <status-card :title="$t('current balance')" :amount="wallet_balance"></status-card>-->
<!--    </div>-->

    <div class="col-12 col-sm-6 col-md-4 mt-3">
        <shoutout title="Purchased Shoutouts" :total_info="purchased_shoutout"></shoutout>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-3">
        <shoutout title="Sold Shoutouts" :total_info="sold_shoutout"></shoutout>
    </div>
    <div class="col-12 col-md-4 mt-3">
        <success-rate-chart
            :success_rate="success_percentage"
            :success_shout="success_shout">

        </success-rate-chart>
    </div>
    <div class="mt-3 col-12">
        <h6 class="text-uppercase">{{$t("upcoming schedule")}}</h6>
        <div class="d-flex flex-column card card-transparent">
            <overview-schedule-table
                :schedule="schedule">
            </overview-schedule-table>
        </div>
    </div>

</div>
</template>

<script>
    import StatusCard from '../components/Dashboard/StatusCard';
    import Shoutout from '../components/Dashboard/Shoutout';
    import SuccessRateChart from '../components/Dashboard/SuccessRateChart';
    import OverviewScheduleTable from '../components/Dashboard/OverviewScheduleTable';

    export default {
        name: "Overview",
        components: {
            StatusCard,
            Shoutout,
            SuccessRateChart,
            OverviewScheduleTable
        },
        data (){
            return {
                purchased_shoutout:{
                    pending: 1,
                    expired: 0,
                    failed: 0,
                    rejected: 0,
                    completed: 0,
                },
                sold_shoutout: {
                    pending: 1,
                    expired: 0,
                    failed: 3,
                    rejected: 0,
                    completed: 0,
                },
                schedule:[
                    {
                        no: 1,
                        schedule_rep: "processing",
                        username: "nayong"
                    },
                    {
                        no: 2,
                        schedule_rep: "request",
                        username: "ziyu"
                    }
                ],
                monthly_income: 0.00,
                total_income: 0.00,
                wallet_balance: 0.00,
                success_shout: 5,
                success_percentage:70
            }
        },
        methods: {
            dataFormat: function(a, b) {
                if(b) return b + "%";
                return a;
            }
        }
    }
</script>

<style scoped>

</style>