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
<!--                        <button  class="btn btn-primary btn-grad-effect w-100 m-0 text-uppercase" type="submit">{{$t("Check Instagram")}}</button>-->
                        <effect-button class="btn btn-grad-effect w-100 m-0 text-uppercase " type="submit"
                                       :loading="loading" style="height:50px;" color="#fff" ref="checkBtn">
                            {{$t("Check Instagram")}}
                        </effect-button>
                    </div>
                </div>
            </form>
            <div class="preview-profile animated fadeIn z-depth-2" v-if="fullname">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                        <img :src="profile_picture"
                             alt="profile" class="img-fluid img-round img-preview-ig">
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-8">
                        <h4 class="pt-1 text-md-left text-center">{{fullname}}</h4>
                        <div class="row text-md-left text-center">
                            <div class="col-4 text-center">
                                {{decimalFormat(media_count)}}<br>posts
                            </div>
                            <div class="col-4 text-center">
                                {{decimalFormat(follower_count)}}<br>followers
                            </div>
                            <div class="col-4 text-center">
                                {{decimalFormat(following_count)}}<br>following
                            </div>
                        </div>
                        <div class="description pt-3">
                            <p>
                                {{description}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row button-next" v-if="fullname">
                <button class="btn btn-primary btn-grad-effect text-uppercase" @click="next" ref="nextBtn">{{$t("Next")}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { addProductService } from "../../../services";
    import EffectButton from "@/components/EffectButton";

    export default {
        name: "AddProductCheck",
        event: 'next',
        components: {
            EffectButton,
        },
        props: {
            tab_id  :   {
                required:   true
            }
        },
        data() {
            return {
                error       :   false,
                loading     :    false,
                account_input:  "",

                insta_info: {},
                fullname    :   "",
                media_count :   0,
                follower_count  :   0,
                following_count :   0,
                description :   "",
                profile_picture: "",
                username    :   "",
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
                this.loading = true;
                this.error = false;
                this.clearInfo();
                addProductService.getInstaInfo(this.account_input)
                    .then( ( response) => {
                        this.loading = false;
                        let info = response.data.graphql.user;
                        if(!info.full_name){
                            this.$store.dispatch("alert/error", "Invalid account", "Warning");
                            this.error = true;
                            return;
                        }
                        this.fullname = info.full_name;
                        this.follower_count = info.edge_followed_by.count;
                        this.following_count = info.edge_follow.count;
                        this.media_count = info.edge_owner_to_timeline_media.count;
                        this.description = info.biography;
                        this.profile_picture = info.profile_pic_url;
                        this.username = info.username;
                        if(this.follower_count < 1000){
                            this.$store.dispatch("alert/error", "Not enough followers", "Warning");
                            // this.error = true;
                        }

                }).catch( () => {
                    this.$store.dispatch("alert/error", "Please type valid account", "Error");
                    this.loading = false;
                    this.error = true;
                })

            },
            clearInfo(){
                this.fullname = "";
                this.media_count = 0;
                this.follower_count = 0;
                this.following_count = 0;
                this.description = "";
            },
            next(){
                if(this.error || !this.fullname){
                    return false;
                }else{
                    addProductService.register_instagram(this.username)
                        .then( ( { data }) => {
                            if( data.data.verification_code)
                                this.$emit('next', this.tab_id, {
                                    'verification_code' : data.data.verification_code,
                                    'username'          : data.data.username,
                                    'id'                : data.data._id
                                });
                            else
                                this.$store.dispatch("alert/error", "Server Error. Please try again.", "Error");
                        })
                        .catch( ( { response } ) => {
                            let msg = response.data.message || "Error Occrred. Please try again.";
                            this.$store.dispatch("auth/checkAuth", response);
                            this.$store.dispatch("alert/error", msg);
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
            },
            loading : function(value) {
                if(value){
                    this.$refs.checkBtn.setAttribute("disabled", true);
                    this.$refs.nextBtn.setAttribute("disabled", true);
                }else{
                    this.$refs.checkBtn.removeAttribute("disabled");
                    this.$refs.nextBtn.removeAttribute("disabled");
                }
            }
        },
    }
</script>

<style scoped>

</style>