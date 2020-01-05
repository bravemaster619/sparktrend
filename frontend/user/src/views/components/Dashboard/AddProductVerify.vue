<template>
    <div class="row animated fadeIn">
        <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-2">
            <img src="img/addproduct/verifyinstruction.png" class="img-fluid" alt="profile-img">
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 my-auto">
            <h4>{{$t("Validate Instagram")}}</h4>
            {{$t("Please add the code below into your Instagram bio and then click validate.")}}
            <form username="lemessi" @submit.prevent="verifyAccount">
                <h4 class="my-3">{{verification_code}}</h4>
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
    export default {
        name: "AddProductVerify",
        event: [
            'back',
            'next'
        ],
        props:  {
            tab_id:{
                required: true
            }
        },
        data () {
            return {
                verification_code   :   "sgweyawey",
                username            :   "leomessi",
            }
        },
        methods: {
            verifyAccount(){
                this.$emit('next', this.tab_id, {'is_verified' : true})
            },
            onBack(){
                this.$emit('back', this.tab_id);
            }
        }
    }
</script>

<style scoped>

</style>