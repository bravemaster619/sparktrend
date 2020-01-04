<template>
    <div class="row">
        <div class="col-12 col-md-8">
            <h5>{{$t("Insights")}} <label class="lbl label-success">
                {{$t("What is this?")}}
            </label></h5>
            <base-image-input
                    width="100" height="400">
            </base-image-input>
        </div>
        <div class="col-12 col-md-10 mt-3 d-flex justify-content-between">
            <button class="btn text-uppercase">{{$t("back")}}</button>
            <button class="btn btn-grad-effect text-uppercase">{{$t("next")}}</button>
        </div>
    </div>
</template>

<script>
    import BaseImageInput from "../uploader/BaseImageInput";

    export default {
        name: "AddProductInsights",
        components: {
            BaseImageInput
        }
    }
</script>

<style scoped>

</style>