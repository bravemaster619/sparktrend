<template>
    <div class="request-header">
        <div class="u-position-relative">
            <div class="salesorder-list-item">
                <div class="salesorder-list-image d-flex flex-column">
                    <div class="m-auto">
                        <img class="img-fluid salesorder-list-img-profile" style="position: relative; left: 10px;"
                             :src="item.instagram_profile_picture"
                             alt="img">
                        <p class="mb-0 mt-1 font-weight-light text-muted text-center">
                            @{{item.seller_instagram_username}}
                        </p>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column justify-content-between w-100 pr-md-5 pl-md-4 text-center">
                    <div class="d-flex flex-column">
                        <div class="m-auto text-md-left text-center">
                            <span>{{item.invoice_number}}</span>
                            <h6 class="m-0">
                                {{this.utcTimeFormat(item.order_date)}}
                            </h6>
                            <h4 class="font-weight-bold">
                                Mind.Perspective
                            </h4>
                            <label class="lbl label-warning">
                                {{$t(item.order_status)}}
                            </label>
                        </div>

                    </div>
                    <div class="d-flex flex-md-column flex-row">
                        <span class="salesorder-list-payment-status unpaid text-center mx-md-auto mr-auto my-md-0 my-auto">
                            <label class="lbl label-warning">
                                {{$t(item.payment_status)}}
                            </label>
                        </span>
                        <h2 class="salesorder-price ml-auto mt-md-auto mt-2">
                            <span class="text-cement-grey">$</span>
                            <span class="text-neon-green">{{item.base_bio_price + item.base_price}}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RequestHeader",
        data() {
            return {
                item: {
                    instagram_profile_picture: "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/57410799_439308906901748_6523150695137280000_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=F6_ZLELSDd0AX8INH3W&oh=a5e2d8014b0b4657ba014364ec6e8509&oe=5E9783AA",
                    seller_instagram_username: "theincomenincubator",
                    invoice_number: "#INV000357",
                    order_date: new Date("2020-01-04T11:02:24+00:00"),
                    order_status: "waiting_for_payment",
                    payment_status: "Unpaid",
                    base_bio_price: 104.00,
                    base_price: 156.00,
                    start_time: "2020-01-22T16:00:00+00:00"
                }
            }
        },
        methods : {
            utcTimeFormat(date){
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ` + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}(UTC ${(date.getTimezoneOffset()/60)}:00)`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/custom/_custom-request-info';
</style>