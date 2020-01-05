<template>
    <div class="row">
        <div class="col-12 col-md-8">
            <h5>{{$t("Insights")}} <label class="lbl label-success">
                {{$t("What is this?")}}
            </label></h5>
            <image-input
                    width="100" height="400" @input="uploadImage">
            </image-input>
        </div>
        <div class="col-12 col-md-10 mt-3 d-flex justify-content-between">
            <button class="btn button-basic text-uppercase" @click="back">{{$t("back")}}</button>
            <button class="btn btn-grad-effect text-uppercase" @click="next">{{$t("next")}}</button>
        </div>
    </div>
</template>

<script>
    import ImageInput from "./ImageInput";

    export default {
        name: "AddProductInsights",
        event: [
            'back',
            'next'
        ],
        props:  {
            tab_id:{
                required: true
            }
        },
        components: {
            ImageInput
        },
        data () {
            return {
                uploaded_file : ""
            }
        },
        methods: {
            next() {
                if(this.isEmpty(this.uploaded_file)){
                    return;
                }
                this.$emit('next', this.tab_id, {
                    'insight' :   this.uploaded_file
                });
            },
            back() {
                this.$emit('back', this.tab_id);
            },
            /**
             * @param file          : selected file info, contribute to upload
             * @return uploaded_file: after upload, set uploaded url
             */
            uploadImage(file) {
                //TODO  upload actions
                //....
                this.uploaded_file = "https://localhost/ssef.jpg";
            }
        }
    }
</script>

<style scoped>

</style>