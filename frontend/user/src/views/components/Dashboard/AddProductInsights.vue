<template>
    <div class="row">
        <div class="col-12 col-md-8">
            <h5>{{$t("Insights")}} <label class="lbl label-success">
                {{$t("What is this?")}}
            </label></h5>
            <form ref="insight_form" class="vld-parent">
                <loading
                   :active="uploading"
                   :is-full-page="true"
                   loader="dots"
                   color="#5e72e4"
                ></loading>
                <image-input
                        width="100" height="400"
                        @input="uploadImage"
                        :image="(instaaccount && instaaccount.insights_picture) ? instaaccount.insights_picture : null"
                >
                </image-input>
            </form>
        </div>
        <div class="col-12 col-md-10 mt-3 d-flex justify-content-between">
            <button class="btn button-basic text-uppercase" @click="back" disabled="!instaaccount || !instaaccount.verified" :class="{'invisible': instaaccount && instaaccount.verified}">{{$t("back")}}</button>
            <button class="btn btn-grad-effect text-uppercase" @click="next">{{$t("next")}}</button>
        </div>
    </div>
</template>

<script>
    import ImageInput from "./ImageInput";
    import { addProductService } from "../../../services";
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
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
            },
            instaaccount: {
                required: false
            }
        },
        components: {
            ImageInput, Loading
        },
        data () {
            return {
                uploaded_file : this.instaaccount && this.instaaccount.insights_picture ? this.instaaccount.insights_picture : "",
                uploading: false,
            }
        },
        mounted() {
            window.vuetemp = this
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
                this.uploading = true
                this.uploaded_file = "";

                let form_data = new FormData();
                form_data.append('image', file);
                addProductService.uploadInsight(form_data, this._id).then(({data}) => {
                    if(!data.data.insights_picture){
                        this.$toastr.error(this.$t("instaaccount.error.insights_upload_failed"));
                    }else{
                        this.uploaded_file = data.data.insights_picture
                        this.$toastr.success(this.$t("instaaccount.success.insights_uploaded"))
                    }
                })
                .catch(({response}) => {
                    this.$toastr.error(this.$t("instaaccount.error.insights_upload_failed"));
                }).finally(() => {
                    this.uploading = false
                });
            }
        }
    }
</script>

<style scoped>

</style>