
<template>
    <div>
<!--        <purchase-tabs>-->
<!--        </purchase-tabs>-->
        <Tabs orientation="vertical" :options="{ useUrlFragment: false }">
            <Tab :name="$t('awaiting payment')"  :selected="true">
                <request-accordion>

                </request-accordion>
            </Tab>
            <Tab :name="$t('request')" >
                <no-data></no-data>
            </Tab>
            <Tab :name="$t('accepted')" >
                <request-accordion>

                </request-accordion>
            </Tab>
            <Tab :name="$t('ongoing')">
                <no-data></no-data>
            </Tab>
            <Tab :name="$t('completed')">
                <request-accordion>

                </request-accordion>
            </Tab>
        </Tabs>
    </div>
</template>

<script>
    // import PurchaseTabs from '../components/Dashboard/PurchaseTabs';
    import {Tabs , Tab} from 'vue-tabs-component'
    import RequestAccordion from '../components/Dashboard/RequestAccordion';
    import NoData from '../components/Dashboard/NoData';

    export default {
        name: "Purchases",
        components: {
            // PurchaseTabs,
            Tabs,
            Tab,
            RequestAccordion,
            NoData
        },
        data(){
            return {
                data:[
                        {
                            acceptance_at: "2020-01-04T10:40:32+00:00",
                            acceptance_status: "N",
                            additional_information: "kigs.com is productive site for you and realize yout dream",
                            attachment_zip_url: null,
                            base_bio_price: "0.00",
                            base_price: "18.00",
                            bio_description: null,
                            bio_price: "0.00",
                            bio_url: null,
                            caption: "Love flowers, love kigs.com #IJOVO1",
                            category_type: "Single",
                            code: "IJOVO1",
                            end_time: "2020-01-17T04:00:00+00:00",
                            fail_reason: null,
                            fee_percentage: "0.0000",
                            id: 356,
                            image_url: "https://s3-ap-southeast-1.amazonaws.com/executivemedia/",
                            instagram_post_id: null,
                            instagram_post_image_url: null,
                            instagram_post_time: null,
                            instagram_profile_picture: "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/22344219_883857681762858_4944951944176205824_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=VqVAGS_-r54AX-cx4tn&oh=0f891442239f3684fcac9e40bdedbe08&oe=5EAC0E3D",
                            invoice_number: "#INV000356",
                            is_refunded: 0,
                            is_reminder_sent: null,
                            order_date: "2020-01-04T10:39:38+00:00",
                            order_status: "waiting_for_payment",
                            partner_instagram_id: 19,
                            payment_method: "EXM-Wallet",
                            payment_status: "Unpaid",
                            price: "19.14",
                            product_description: `Welcome to #theloversmindset,
                Here are info about my page and shoutout
            1. Average likes = 2k-6k
            2. Content that works the best is quote page, motivation page, and beauty products(I do accept other niches but the engagement may be lower than usual)
            3. Best time to post is 10am est on Weekends.
            4. Be sure to book your slot fast, many people often book for weekend.
            5. The followers or sales that you get depends FULLY ON MY FOLLOWERS. Some may get tons of sales & followers, some may not. The seller is ONLY RESPONSIBLE to post according to the scheduled time and post according to what the buyers want.
            Thank you and looking forward to do business with you!`,
                        product_name: "The Lovers Mindset",
                        product_url: "The-Lovers-Mindset",
                        product_visible: "Y",
                        refund_date: null,
                        seller_instagram_username: "theloversmindset",
                        seller_user_id: 239,
                        shoutout_attachment: [{id: 419, cart_sales_order_id: 356, file_name: "1578134378-12545-0", file_extension: ".jpg"}],
                        start_time: "2020-01-16T16:00:00+00:00",
                        story_url: null,
                        time: "12",
                        user_id: 12545,
                        with_bio: 0
                    },
                    {
                        acceptance_at: "2020-01-04T11:02:48+00:00",
                        acceptance_status: "N",
                        additional_information: "kigs.com advertisement.",
                        attachment_zip_url: null,
                        base_bio_price: "104.00",
                        base_price: "156.00",
                        bio_description: null,
                        bio_price: "108.79",
                        bio_url: "https://kigs.com/bio",
                        caption: "kigs.com is the best for your dream. Come here. Dream comes true when you visit. Thank you. #DTT413",
                        category_type: "Story",
                        code: "DTT413",
                        end_time: "2020-01-23T16:00:00+00:00",
                        fail_reason: null,
                        fee_percentage: "0.0000",
                        id: 357,
                        image_url: "https://s3-ap-southeast-1.amazonaws.com/executivemedia/",
                        instagram_post_id: null,
                        instagram_post_image_url: null,
                        instagram_post_time: null,
                        instagram_profile_picture: "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18950436_1457778190955457_5730003757509378048_a.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=1-YRXp8qEOYAX_S27BE&oh=6fa28bf865997ad2472f3258e559e4b9&oe=5E90DE7D",
                        invoice_number: "#INV000357",
                        is_refunded: 0,
                        is_reminder_sent: null,
                        order_date: "2020-01-04T11:02:24+00:00",
                        order_status: "waiting_for_payment",
                        partner_instagram_id: 166,
                        payment_method: "EXM-Wallet",
                        payment_status: "Unpaid",
                        price: "163.50",
                        product_description: "Entrepreneurship / Business / Passive Income",
                        product_name: null,
                        product_url: null,
                        product_visible: "Y",
                        refund_date: null,
                        seller_instagram_username: "theincomeincubator",
                        seller_user_id: 5885,
                        shoutout_attachment: [
                            {
                                id: 420, cart_sales_order_id: 357, file_name: "1578135744-12545-0", file_extension: ".jpg"
                            }
                        ],
                        start_time: "2020-01-22T16:00:00+00:00",
                        story_url: "https://kigs.com",
                        time: "24",
                        user_id: 12545,
                        with_bio: 1
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>