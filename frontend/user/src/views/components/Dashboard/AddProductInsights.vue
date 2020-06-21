<template>
    <div class="row">
        <div class="col-12 images clearfix" v-viewer>
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
                <div class="row">
                    <div class="col-12 col-md-4 mb-2"
                        v-for="(url, index) in (instaaccount && instaaccount.insights_pictures ? instaaccount.insights_pictures : [])" :key="index">
                        <img 
                            :src="url"
                            class="img-insight img-fluid z-depth-1"
                        />
                    </div>
                    <div class="col-12 col-md-4 mb-2">
                        <image-input
                            @input="uploadImage"
                            :image="null"
                            v-if="instaaccount && (!instaaccount.insights_pictures || (instaaccount.insights_pictures && instaaccount.insights_pictures.length < 5))"
                        >
                        </image-input>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-12 col-md-10 mt-3 d-flex justify-content-between">
            <button class="btn button-basic text-uppercase" @click="back" disabled="!instaaccount || !instaaccount.verified" :class="{'invisible': instaaccount && instaaccount.verified}">{{$t("Back")}}</button>
            <button class="btn btn-grad-effect text-uppercase" @click="next">{{$t("Next")}}</button>
        </div>
    </div>
</template>

<script>
    import ImageInput from "./ImageInput";
    import { addProductService } from "../../../services";
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
    import VueViewer from 'v-viewer'
    import Vue from 'vue'
    import 'viewerjs/dist/viewer.css'
    Vue.use(VueViewer)

    export default {
        name: "AddProductInsights",
        event: [
            'back',
            'next',
            'foo'
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
                uploaded_file : this.instaaccount && this.instaaccount.insights_pictures ? this.instaaccount.insights_pictures[this.instaaccount.insights_pictures.length - 1] : "",
                uploading: false,
            }
        },
        mounted() {
            // window.vuetemp = this
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
                //window.console.log("uploadImage called", file);
                this.uploading = true
                this.uploaded_file = "";

                let form_data = new FormData();
                form_data.append('image', file);
                //window.console.log("formdata", form_data)
                addProductService.uploadInsight(form_data, this._id).then(({data}) => {
                    //window.console.log("server response", data);
                    if(!data.data.insights_pictures){
                        this.$toastr.error(this.$t("instaaccount.error.insights_upload_failed"));
                    }else{
                        this.$emit("change", data.data);
                        this.uploaded_file = data.data.insights_pictures[data.data.insights_pictures.length - 1]
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
    .img-insight {
        width: 100%;
        height: 360px;
        object-fit: cover;
    }
</style>