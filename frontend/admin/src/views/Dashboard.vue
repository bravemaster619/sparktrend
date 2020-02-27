<template>
   <div class="vld-parent">
      <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
         <!-- Card stats -->
         <div class="row">
            <div class="col-xl-3 col-lg-6">
               <stats-card title="Total Users"
                           type="gradient-red"
                           :sub-title="numberFormat(total.users.count)"
                           icon="ni ni-single-02"
                           class="mb-4 mb-xl-0"
               >
                  <template slot="footer">
                     <status-card-footer
                           :increase="total.users.increase"
                     />
                  </template>
               </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
               <stats-card title="Total Products"
                           type="gradient-orange"
                           :sub-title="numberFormat(total.products.count)"
                           icon="ni ni-album-2"
                           class="mb-4 mb-xl-0"
               >
                  <template slot="footer">
                     <status-card-footer
                           :increase="total.products.increase"
                     />
                  </template>
               </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
               <stats-card title="Total Orders"
                           type="gradient-green"
                           :sub-title="numberFormat(total.orders.count)"
                           icon="ni ni-cart"
                           class="mb-4 mb-xl-0"
               >
                  <template slot="footer">
                     <status-card-footer
                           :increase="total.orders.increase"
                     />
                  </template>
               </stats-card>

            </div>
            <div class="col-xl-3 col-lg-6">
               <stats-card title="Total Sale"
                           type="gradient-info"
                           :sub-title="numberFormat(total.sale.count)"
                           icon="ni ni-money-coins"
                           class="mb-4 mb-xl-0"
               >
                  <template slot="footer">
                     <status-card-footer
                           :increase="total.sale.increase"
                     />
                  </template>
               </stats-card>
            </div>
         </div>
      </base-header>

      <!--Charts-->
      <div class="container-fluid mt--7">
         <div class="row">
            <div class="col-xl-8 mb-5 mb-xl-0">
               <card type="default" header-classes="bg-transparent">
                  <div slot="header" class="row align-items-center">
                     <div class="col">
                        <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                        <h5 class="h3 text-white mb-0">Sales value</h5>
                     </div>
                     <div class="col">
                        <ul class="nav nav-pills justify-content-end">
                           <li class="nav-item mr-2 mr-md-0">
                              <a class="nav-link py-2 px-3"
                                 href="#"
                                 :class="{active: salesChart.activeIndex === 0}"
                                 @click.prevent="initBigChart(0)">
                                 <span class="d-none d-md-block">Month</span>
                                 <span class="d-md-none">M</span>
                              </a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link py-2 px-3"
                                 href="#"
                                 :class="{active: salesChart.activeIndex === 1}"
                                 @click.prevent="initBigChart(1)">
                                 <span class="d-none d-md-block">Week</span>
                                 <span class="d-md-none">W</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <line-chart
                        :height="350"
                        ref="bigChart"
                        :chart-data="salesChart.chartData"
                        :extra-options="salesChart.extraOptions"
                  >
                  </line-chart>

               </card>
            </div>

            <div class="col-xl-4">
               <card header-classes="bg-transparent">
                  <div slot="header" class="row align-items-center">
                     <div class="col">
                        <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                        <h5 class="h3 mb-0">Total orders</h5>
                     </div>
                  </div>

                  <bar-chart
                        :height="350"
                        ref="barChart"
                        :chart-data="ordersChart.chartData"
                  >
                  </bar-chart>
               </card>
            </div>
         </div>
         <!-- End charts-->

         <!--Tables-->
         <div class="row mt-5">
            <div class="col-xl-6 mb-5">
               <new-users :tableData="recent.users"/>
            </div>
            <div class="col-xl-6 mb-5">
               <new-instaaccounts :tableData="recent.instaaccounts"/>
            </div>
            <div class="col-xl-12">
               <new-orders :tableData="recent.orders"/>
            </div>
         </div>
         <!--End tables-->
      </div>

   </div>
</template>
<script>
   // Charts
   import * as chartConfigs from '@/components/Charts/config';
   import LineChart from '@/components/Charts/LineChart';
   import BarChart from '@/components/Charts/BarChart';
   import StatusCardFooter from '../views/Dashboard/StatusCardFooter'
   import { numberFormat } from "../helper";
   import httpService from "../services/http"
   import Loading from 'vue-loading-overlay'
   // Tables
   import NewUsers from './Dashboard/NewUsers'
   import NewInstaaccounts from "./Dashboard/NewInstaAccounts";
   import NewOrders from "./Dashboard/NewOrders";

   export default {
      components: {
         NewOrders,
         NewInstaaccounts,
         LineChart,
         BarChart,
         NewUsers,
         StatusCardFooter,
         Loading
      },
      data() {
         return {
            loading: true,
            total: {
               users: {
                  count: 0,
                  increase: 0
               },
               products: {
                  count: 0,
                  increase: 0
               },
               orders: {
                  count: 0,
                  increase: 0
               },
               sale: {
                  count: 0,
                  increase: 0
               }
            },
            recent: {
               users: [],
               instaaccounts: [],
               orders: []
            },
            salesChart: {
               allData: {
                  data: [[], []],
                  label: [[], []]
               },
               activeIndex: 0,
               chartData: {
                  datasets: [],
                  labels: [],
               },
               extraOptions: chartConfigs.blueChartOptions,
            },
            ordersChart: {
               chartData: {
                  labels: [],
                  datasets: [{
                     label: 'Sales',
                     data: []
                  }]
               }
            }
         };
      },
      methods: {
         numberFormat,
         initBigChart(index = null) {
            let chartData = {
               datasets: [
                  {
                     label: 'Performance',
                     data: this.salesChart.allData.data[index]
                  }
               ],
               labels: this.salesChart.allData.label[index],
            };
            this.salesChart.chartData = chartData;
            if(index !== null) {
               this.salesChart.activeIndex = index;
            }
         },
         updateData() {
            return httpService.get('statistics/admin-dashboard').then(res => {
               let stats = res.data.data
               this.total = stats.total
               this.recent = stats.recent
               this.salesChart.allData = stats.chart.sales
               this.ordersChart.chartData = {
                  labels: stats.chart.orders.label,
                  datasets: [{
                     label: 'Sales',
                     data: stats.chart.orders.data
                  }]
               }
            }).finally(() => {
               this.loading = false
            })
         }
      },
      mounted() {
         this.updateData().then(() => {
            this.initBigChart(0)
         })
      }
   };
</script>
<style></style>
