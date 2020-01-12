<template>
    <div class="row">
        <div class="col-12 col-md-8">
            <h5>{{$t("Insights")}} <label class="lbl label-success">
                {{$t("What is this?")}}
            </label></h5>
            <form ref="insight_form">
                <image-input
                        width="100" height="400" @input="uploadImage">
                </image-input>
            </form>
        </div>
        <div class="col-12 col-md-10 mt-3 d-flex justify-content-between">
            <button class="btn button-basic text-uppercase" @click="back">{{$t("back")}}</button>
            <button class="btn btn-grad-effect text-uppercase" @click="next">{{$t("next")}}</button>
        </div>
    </div>
</template>

<script>
    import ImageInput from "./ImageInput";
    import { addProductService } from "../../../services";

    export default {
        name: "AddProductInsights",
        event: [
            'back',
            'next'
        ],
        props:  {
            tab_id:{
                required: true
            },
            _id : {
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
                this.uploaded_file = "";

                let form_data = new FormData();
                form_data.append('image', file);

                addProductService.uploadInsight(form_data, this._id)
                    .then(({data}) => {
                        if(!data.data.insights_picture){
                            this.$store.dispatch("alert/error", "Insight upload failed");
                        }else{
                            this.uploaded_file = data.data.insights_picture;
                        }
                    })
                    .catch(({response}) => {
                        let msg = response.data.message || "Error Occrred. Please try again.";
                        this.$store.dispatch("auth/checkAuth", response);
                        this.$store.dispatch("alert/error", msg);
                    });

            }
        }
    }
</script>

<style scoped>

</style>