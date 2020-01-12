<template>
    <div class="d-flex flex-column align-items-center">
        <h3 class="pt-3">
            <strong>Change password</strong>
        </h3>
        <div class="responsive w-50">
            <div class="form-group">
                <label for="Old Password">{{$t("Old Password")}}</label>
                <input id="Old Password" type="password" class="form-control" :class="{'invalid-input' : error.old_password}" name="old_password" v-model="old_password">
                <span v-if="error.old_password" class="invalid-feedback error">{{error.old_password}}</span>
            </div>
            <div class="form-group">
                <label for="New Password">{{$t("New Password")}}</label>
                <input id="New Password" type="password" class="form-control" :class="{'invalid-input' : error.new_password}" name="new_password" v-model="new_password">
                <span v-if="error.new_password" class="invalid-feedback error">{{error.new_password}}</span>
            </div>
            <div class="form-group">
                <label for="Confirm Password">{{$t("Confirm Password")}}</label>
                <input id="Confirm Password" type="password" class="form-control" :class="{'invalid-input' : error.confirm_password}" name="confirm_password" v-model="confirm_password">
                <span v-if="error.confirm_password" class="invalid-feedback error">{{error.confirm_password}}</span>
            </div>
            <div class="form-group text-center">
                <effect-button class="btn btn-grad-effect w-100 m-0 text-uppercase "
                   @click="onSubmit" :loading="loading" style="height:50px;"
                    color="#fff">
                    {{$t("Change Password")}}
                </effect-button>
<!--                <clip-loader loading="true" color="#505050" size="10" size-unit="px"/>-->

            </div>
        </div>
    </div>
</template>

<script>
    import EffectButton from "@/components/EffectButton";
    import { authService } from "../services/auth.service";

    // let toastr = require("toastr");

    export default {
        name: "ChangePassword",
        components: {
            EffectButton,
        },
        data(){
            return {
                error : {
                    old_password    :   "",
                    new_password    :   "",
                    confirm_password:   "",
                },
                old_password    :   "",
                new_password    :   "",
                confirm_password:   "",

                loading         :   false
            }
        },
        methods: {
            onSubmit(){
                if(this.validation()){
                    this.loading = true;

                    authService.changePassword({
                        password: this.old_password,
                        new_password: this.new_password
                    })
                        .then(() => {
                            this.loading = false;
                            this.$toastr.success("Successfully changed", "Result", {timeOut : 3000});
                            this.$router.push("/");
                    })
                        .catch(({response}) => {
                            this.loading = false;
                            this.$toastr.error("Change Password failed", "Result", {timeOut : 3000});
                            console.log("checkAuth");
                            this.old_password = "";
                            this.new_password = "";
                            this.confirm_password = "";
                            this.$store.dispatch("auth/checkAuth", response.data);
                        })
                }
            },
            validation(){

                if(!this.old_password || !this.new_password || !this.confirm_password)
                    return false;
                return !this.error.old_password && !this.error.new_password && !this.error.confirm_password;
            }
        },
        watch : {
            old_password(value){
                if(!value){
                    this.error.old_password = "Plase input your current password";
                }else{
                    this.error.old_password = "";
                }
            },
            new_password(value){
                if(!value){
                    this.error.new_password = "Please input new password";
                }else{
                    this.error.new_password = "";
                }
            },
            confirm_password(value){
                if(!value){
                    this.error.confirm_password = "Please confirm password";
                }else if(value !== this.new_password){
                    this.error.confirm_password = "Confirm password is not match";
                }else{
                    this.error.confirm_password = "";
                }
            }
        },
        computed : {
            success() {
                return this.$store.state.auth.is_success;
            },
            error_msg(){
                if(this.$store.state.auth.error_msg) {
                    console.log(this.$store.state.auth.error_msg);
                }
                return this.$store.state.auth.error_msg
            }
        }
    }
</script>

<style scoped>

</style>