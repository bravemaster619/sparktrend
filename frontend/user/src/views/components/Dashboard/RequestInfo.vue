<template>
    <div class="request-info">
        <div class="py-2">
            <div class="w-100 d-flex flex-md-row flex-column pb-md-4 pb-2 border-bottom">
                <div class="pr-md-2 py-md-0 py-2 text-center d-flex flex-column w-100">
                    <div class="m-auto">
                        <span class="salesorder-list-date">Start Date</span>
                        <br>
                        <span>{{this.getStartDate(item.start_time)}}</span>
                        <br>
                        <span>{{this.getUTCOffset(item.start_time)}}</span>
                    </div>
                </div>
                <div class="pl-md-2 py-md-0 py-2 text-center border-md-left border-sm-top d-flex flex-column w-100">
                    <div class="m-auto">
                        <span class="salesorder-list-date">Duration</span>
                        <br>
                        <span>
                                    {{item.time}} hour(s)
                                </span>
                    </div>
                </div>
                <div class="pl-md-2 py-md-0 py-2 text-center border-md-left border-sm-top d-flex flex-column w-100">
                    <div class="m-auto">
                        <span class="salesorder-list-date">Category Type</span>
                        <br>
                        <span>{{item.category_type}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-2">
            <div class="row">
                <div class="col-12 col-md-5">
                    <div class="salesorder-list-image-product mb-2" v-for="shoutout_attachment in item.shoutout_attachments" :key="shoutout_attachment.id">
                        <div class="salesorder-list-date">Attachment</div>
                        <img class="img-fluid salesorder-list-img-product z-depth-1"
                             :src="shoutout_attachment.file_full_url">
                        <button data-toggle="tooltip" title="Download Attachment(s)" class="salesorder-list-download-post" style="top:31px; right: 15px;">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBxsJMTakVrUDAAACmElEQVRo3u2XP0gcQRSHf3ucFtHocRAklgYLwSDiJUUUJJWlWGrANJJChFiksRCChVWaoGAlGCHBQkvBSruAeiBiKRY2UQRFToyQ03wp9p2sxjPn/jkN7CsWdmb2fd/ODjNvpTj+7yBJ8j7xreyxR+v9CUwAMBEkRyKQwWPP9V4EQohYIBaIBWKBWCAWiAVigYcuQIph2v0mp51hUoH8mAdgrEjvDAAzRXrHAJgPNAOqlSSNMn23+p8k0xr1ZPA9Ay0c4MYiVaXOAFUs2lMHtAQSkGhkx5Kt8qQUAZ6wak/s0BgQL0nUkbWE2zT8S4AGtm10lroQ8JJENUuWdJ+22wRoY99GLlEdEl6SSBoMTugqJkAXJzZqJoKfVsYteZ7+mwToJ28jxkOHG2KQC0OMXBdgxHouGIwIL0n0cGagSRIFARJMWusZPRHiJYkOjgy2wBwAcyxYyxEdEeMliSZ2Dfjbc4VdmsqAlyTq2eR6bFJfJrwkUcvyFfwywfZ8HwqVTF1+gikq/eZxAkk812tJK85WkCRpBkI5Mu5ObmSAtFgBcqHu26Xhq8kBK7JF1Fl2gU4XXKiIAq0FX2HEh14VRx9FTm1q9Chk0k8nV7IAn/ReYRcU53x2PvzdnNCpJMlT8VKhodDxUlJDVHjuXeJpQhuSJE+l5+Q1K0IXQLNO3nPvEjeSWleHpJfesc47PqomZIGc8+PKvUtcF30AnJMJ/Z1vm44M5wD0ibQV0lv+T7Q74yvZsiI/LYlu247XaC4Lvpk1I3bbhsgXuYX2L33Vd2V1HBE7pYxe6Y3cuZ513hacauw3vJwxz9VlTi+HZYMf0lvgek5BnqpPL5TRswgXwI6yWtc3Z+8GgUuRlFIR4Y+d4whfLg5/8Qdiiv8HlTJ+cwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0yN1QwOTo0OTo1NCswMjowMH0+KmoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMjdUMDk6NDk6NTQrMDI6MDAMY5LWAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="
                                 alt="download-icon">
                        </button>
                        <div class="d-flex mt-2">
                            <button class="btn btn-primary btn-grad-effect btn-md flex-1 mx-0" action="submit" style="font-size: 14px;">
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-7">
                    <div class="d-flex flex-column">
                        <div class="w-100 flex-1 mt-md-0 mt-3">
                            <div class="salesorder-list-date">Caption</div>
                            <textarea id="caption-box" rows="6" class="form-control"
                                      readonly style="width: 100%; max-width: 450px;" v-model="item.caption">
                                    </textarea>
                        </div>
                        <button class="btn button-basic mt-3" style="width: 100%; max-width: 200px;">
                            Copy text
                        </button>
                        <div class="w-100 flex-1" v-if="!isEmpty(item.additional_information)">
                            <div class="salesorder-list-date mt-4">Additional Information</div>
                            <span style="word-break: break-word;">{{item.additional_information}}</span>
                        </div>
                        <div class="w-100 flex-1" v-if="!isEmpty(item.bio_url)">
                            <div class="salesorder-list-date mt-4">Bio URL</div>
                            <input type="text" class="form-control" readonly v-model="item.bio_url">
                        </div>
                        <div class="w-100 flex-1" v-if="!isEmpty(item.story_url)">
                            <div class="salesorder-list-date mt-4">Swipe up URL</div>
                            <input type="text" class="form-control" readonly v-model="item.story_url">
                        </div>
                        <div class="my-4">
                            <div class="salesorder-list-date">Payment Details</div>
                            <hr>
                            <div class="d-flex w-100">
                                <div class="flex-1">Payment Method</div>
                                <div class="price">{{item.payment_method}}</div>
                            </div>
                            <div class="d-flex w-100">
                                <div class="flex-1">{{item.category_type}}</div>
                                <div class="price">$ {{item.base_price.toFixed(2)}}</div>
                            </div>
                            <div class="d-flex">
                                <div class="flex-1">Bio Price</div>
                                <div class="price">$ {{item.base_bio_price.toFixed(2)}}</div>
                            </div>
                            <div></div>
                            <hr>
                            <div class="d-flex">
                                <div class="flex-1 font-weight-bold">GRAND TOTAL</div>
                                <div class="price font-weight-bold">$ {{(item.base_price + item.base_bio_price).toFixed(2)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RequestInfo",
        data () {
            return {
                item:{
                    additional_information: "kigs.com advertisement",
                    start_time      : new Date("2020-01-22T16:00:00+00:00"),
                    time            : 24,
                    category_type   : 'Story',
                    shoutout_attachments:[
                        {
                            id              :   0,
                            file_full_url   :   "https://s3-ap-southeast-1.amazonaws.com/executivemedia/executivecart/12545/sales_order/357/attachment/1578135744-12545-0.jpg",
                            file_name       :   "1578135744-12545-0"
                        }
                    ],
                    caption         : "kigs.com is the best for your dream. Come here. Dream comes true when you visit. Thank you. #DTT413",
                    bio_url         : "https://kigs.com/bio",
                    story_url       : "https://kigs.com",
                    payment_method  : "EXM-Wallet",
                    base_bio_price: 104.00,
                    base_price: 156.00,
                }
            }
        },
        methods: {
            getUTCOffset(date){
                return `(UTC ${date.getTimezoneOffset()/60}:00`
            },
            getStartDate(date){
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            },
            isEmpty(str){
                return str === null || str === undefined || str === false || str === "";
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/custom/_custom-request-info';
</style>