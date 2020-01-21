<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="d-inline">{{$t("My Accounts")}}</h5>
            <a class="btn button-primary btn-grad-effect" href="/addproduct">{{$t("Add Account")}}</a>
        </div>
        <div class="row vld-parent px-3">
            <loading
               :active="loading"
               :is-full-page="true"
               loader="dots"
               color="#5e72e4"
            ></loading>
            <product-pad v-for="instaaccount in instaaccounts" :key="instaaccount._id" :instaaccount="instaaccount"></product-pad>
        </div>
    </div>
</template>

<script>
    import NoData from '../components/Dashboard/NoData';
    import ProductPad from '../components/Dashboard/ProductPad';
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        name: "MyProducts",
        components: {
            ProductPad, Loading
        },
        data() {
            return {
                loading: false,
                instaaccounts: [
                    {
                        "_id": "5e2460c5aa58bf37e0223f80",
                        "user_id": "5e2460c5aa58bf37e0223f7e",
                        "username": "instafashionfeeds",
                        "profile_img": "https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=U7n98U2i0OoAX8BMvzo&oh=7b89d55f19d64f55b9f1a7b139ea47b9&oe=5E8D5BFA",
                        "follower_count": 332097,
                        "insights_picture": "https://cdn.skedsocial.com/wp-content/uploads/2018/03/25141444/Screen-Shot-2018-03-25-at-10.12.28-PM.png",
                        "verification_code": "d73238e0",
                        "verified": true,
                        "allowed": true,
                        "type": "business",
                        "demographics": {
                            "age": [
                                {
                                    "name": "13-17",
                                    "percent": 12
                                },
                                {
                                    "name": "18-24",
                                    "percent": 45
                                },
                                {
                                    "name": "25-34",
                                    "percent": 27
                                },
                                {
                                    "name": "35-44",
                                    "percent": 10
                                },
                                {
                                    "name": "45-54",
                                    "percent": 4
                                },
                                {
                                    "name": "55-64",
                                    "percent": 1
                                },
                                {
                                    "name": "65+",
                                    "percent": 1
                                }
                            ],
                            "gender": [
                                {
                                    "name": "Men",
                                    "percent": 85
                                },
                                {
                                    "name": "Women",
                                    "percent": 15
                                }
                            ],
                            "country": [
                                {
                                    "name": "United States",
                                    "percent": 37
                                },
                                {
                                    "name": "India",
                                    "percent": 7
                                },
                                {
                                    "name": "United Kingdom",
                                    "percent": 5
                                },
                                {
                                    "name": "Indonesia",
                                    "percent": 3
                                },
                                {
                                    "name": "Brazil",
                                    "percent": 2
                                }
                            ]
                        },
                        "product": {
                            "description": "A stunningly beautiful page with a constant growth of followers, etc. ❤",
                            "banner_img": "https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7",
                            "niches": "Fashion & Style",
                            "categories": [
                                {
                                    "type": "Single",
                                    "pricing": [
                                        {
                                            "time": 6,
                                            "price": 15,
                                            "bio_price": 10
                                        },
                                        {
                                            "time": 12,
                                            "price": 20,
                                            "bio_price": 10
                                        }
                                    ]
                                },
                                {
                                    "type": "Multiple",
                                    "pricing": [
                                        {
                                            "time": 12,
                                            "price": 30.5,
                                            "bio_price": 15
                                        }
                                    ]
                                },
                                {
                                    "type": "Story",
                                    "pricing": [
                                        {
                                            "time": 24,
                                            "price": 40,
                                            "bio_price": 20
                                        }
                                    ]
                                }
                            ]
                        },
                        "created_at": "2020-01-19T13:59:33.443Z",
                        "updated_at": "2020-01-19T14:14:19.778Z",
                        "total_shoutout": 3
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>