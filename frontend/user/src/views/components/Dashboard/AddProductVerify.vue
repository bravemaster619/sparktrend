<template>
    <div class="row animated fadeIn">
        <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-2">
            <img src="img/addproduct/verifyinstruction.png" class="img-fluid" alt="profile-img">
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 my-auto">
            <h4>{{$t("Validate Instagram")}}</h4>
            {{$t("Please add the code below into your Instagram bio and then click validate.")}}
            <form username="lemessi" @submit.prevent="verifyAccount">
                <h4 class="my-3">{{verificationCode}}</h4>
                <input name="username" hidden v-model="username">
                <div class="form-group row">
                    <div class="col-md-10 col-12">
                        <button class="btn btn-primary btn-grad-effect m-0 w-100 text-uppercase" type="submit">{{$t("Verify Instagram")}}</button>
                    </div>
                </div>
            </form>
            <div class="d-flex justify-content-between">
                <button class="btn button-basic mt-3 mx-0 text-uppercase" @click="onBack">{{$t("Back")}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { addProductService } from "../../../services";

    export default {
        name: "AddProductVerify",
        event: [
            'back',
            'next'
        ],
        props:  {
            tab_id:{
                required: true
            },
            verificationCode: {
                required: true
            },
            username    :   {
                required: true
            },
            _id         :   {
                required: true
            }
        },
        methods: {
            verifyAccount(){
                addProductService.validateInstagram(this._id)
                    .then( ({data}) => {
                        console.log(data);
                        if(!data.data.verified){
                            console.log("Server is strange");
                            this.$store.dispatch("alert/error", "Please try again");
                        }else{
                            this.$emit('next', this.tab_id, {'verified' : data.data.verified})   ;
                        }
                }).catch( ( {response} ) => {
                    this.$store.dispatch("auth/checkAuth", response);
                    this.$store.dispatch("alert/error", msg);
                });
            },
            onBack(){
                this.$emit('back', this.tab_id);
            }
        }
    }
</script>

<style scoped>

</style>