<template>
    <div class="row animated fadeIn">
        <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-2">
            <img src="images/verifyinstruction.png" class="img-fluid" alt="profile-img">
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 my-auto">
            <h4>{{$t("Validate Instagram")}}</h4>
            Please add the code below into your Instagram bio and then click validate.
            <form username="lemessi">
                <h4 class="my-3">0c4707fb</h4>
                <input name="username" hidden value="leomessi">
                <div class="form-group row">
                    <div class="col-md-10 col-12">
                        <button class="btn btn-primary btn-my-effect m-0 w-100 text-uppercase" action="submit">{{$t("Verify Instagram")}}</button>
                    </div>
                </div>
            </form>
            <div class="d-flex justify-content-between">
                <button class="btn button-basic mt-3 mx-0 text-uppercase">{{$t("Back")}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddProductVerify"
    }
</script>

<style scoped>

</style>