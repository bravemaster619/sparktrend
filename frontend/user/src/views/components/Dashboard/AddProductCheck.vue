<template>
    <div>
        <h5>{{$t("Check Instagram")}}</h5>
        <p>
            {{$t("Please provide your name and profile of your instagram that will help us verifying your instagram account")}}
        </p>
        <div>
            <form class="form-verifyproduct" @submit.prevent="checkInstagram">
                <div class="form-group">
                    <label for="instagram_account">{{$t("Instagram Account")}}</label>
                    <input id="instagram_account" type="text" ref="instagram_account" class="form-control" v-model="account_input"
                           name="username" placeholder="Instagram Username">
                    <span v-if="!isEmpty(error)" class="invalid-feedback error">{{$t("Please enter an instagram account")}}</span>
                </div>
                <div class="form-group row">
                    <div class="col-md-6 col-12">
                        <button  class="btn btn-primary btn-grad-effect w-100 m-0 text-uppercase" type="submit">{{$t("Check Instagram")}}</button>
                    </div>
                </div>
            </form>
            <div class="preview-profile animated fadeIn z-depth-2" v-if="loaded">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                        <img src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s150x150/43818140_2116018831763532_3803033961098117120_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=HmoDmCowxUsAX_To_yq&oh=ce3c80ff70d434a0000cb987779be509&oe=5EA533F6"
                             alt="profile" class="img-fluid img-round img-preview-ig">
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-8">
                        <h4 class="pt-1 text-md-left text-center">{{insta_info.fullname}}</h4>
                        <div class="row text-md-left text-center">
                            <div class="col-4 text-center">
                                {{decimalFormat(insta_info.media_count)}}<br>posts
                            </div>
                            <div class="col-4 text-center">
                                {{decimalFormat(insta_info.follower_count)}}<br>followers
                            </div>
                            <div class="col-4 text-center">
                                {{decimalFormat(insta_info.following_count)}}<br>following
                            </div>
                        </div>
                        <div class="description pt-3">
                            <p>
                                {{insta_info.description}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row button-next" v-if="loaded">
                <button class="btn btn-primary btn-grad-effect text-uppercase" @click="next">{{$t("Next")}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddProductCheck",
        event: 'next',
        props: {
            tab_id  :   {
                required:   true
            }
        },
        data() {
            return {
                error       :   "",
                loaded      :   false,
                account_input:  "",

                insta_info: {
                    description: "Bienvenidos a la cuenta oficial de Instagram de Leo Messi / Welcome to the official Leo Messi Instagram account",
                    follower_count: 140177931,
                    following_count: 227,
                    fullname: "leomessi",
                    is_business: true,
                    is_creator: false,
                    media_count: 552,
                    pk: "427553890",
                    profile_picture: "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/43818140_2116018831763532_3803033961098117120_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=jqMAsDwXKkcAX_FY_-q&oh=a109ee05f0a90dae6edcdc1a1ff2a650&oe=5EA533F6",
                    username: "leomessi",
                    verification_code: "",
                },
            }
        },
        methods:{
            decimalFormat(count) {
                let len = count;
                if(len < 1000){
                    return count;
                }
                if(len < 1000000){
                    return (count / 1000).toFixed(2) + "K";
                }
                if(len < 1000000000){
                    return (count / 1000000).toFixed(1) + "M";
                }
                if(len < 1000000000000){
                    return (count / 1000000000).toFixed(1) + "B";
                }
                return count;
            },
            checkInstagram(){
                if(this.isEmpty(this.account_input)){
                    this.error= this.$t("Please enter an instagram account");
                    this.$refs.instagram_account.classList.add("invalid-input");
                    return;
                }
                this.loaded = true;

                this.insta_info.description = "Thank you. Welcome to my instagram account";
                this.insta_info.follower_count = 123123123;
                this.insta_info.following_count = 100;
                this.insta_info.fullname = "Janes Kane";
                this.insta_info.is_business = true;
                this.insta_info.is_creator = false;
                this.insta_info.media_count = 10093;
                this.insta_info.pk = "54548646";
                this.insta_info.profile_picture = "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/43818140_2116018831763532_3803033961098117120_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=jqMAsDwXKkcAX_FY_-q&oh=a109ee05f0a90dae6edcdc1a1ff2a650&oe=5EA533F6";
                this.insta_info.username = "RMaj";
                this.insta_info.verification_code = "0c47047fb";
            },
            next(){
                if(this.isEmpty(this.insta_info.verification_code) || !this.isEmpty(this.error)){
                    return;
                }else{
                    this.$emit('next', this.tab_id, {
                        'verification_code' : this.insta_info.verification_code,
                        'username'          : this.insta_info.username
                    });
                }
            }
        },
        watch: {
            account_input : function() {
                if(this.isEmpty(this.account_input)){
                    this.error= this.$t("Please enter an instagram account");
                    this.$refs.instagram_account.classList.add("invalid-input");
                }else{
                    this.error = "";
                    this.$refs.instagram_account.classList.remove("invalid-input");
                }
            }
        }
    }
</script>

<style scoped>

</style>