<template>
    <div>
        <div class="row">
            <div v-for="(source, index) in rawData" class="image-input image-input-active d-flex " :key="index">
                <div class="image-preview mx-2 my-1" >
                    <img class="img-responsive" :src="source" v-if="getFileType(files[index]) === 'image'">
                    <video class="img-responsive" :src="source" v-if="getFileType(files[index]) === 'video'" />
                    <button class="btn btn-xs remove-file" @click="removeFile(index)">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="image-input image-input-tbd d-flex" v-if="this.files.length < maxFileCount">
                <div class="image-preview mx-2 my-1 dropzone d-flex justify-content-center align-items-center" @drop="loaddropfile" @click="openinput">
                    <i class="fa fa-plus text-success"></i>
                </div>
            </div>
        </div>
        <input type="file" class="d-none" id="vue-file-upload-input" @change="addImage">
    </div>
</template>
<script>
    export default {
        props: {
            maxFileCount: {
                type: Number,
                description: "Max file number for multiple uploading"
            },
            accept: {
                type: String,
                description: "Allowed mime type"
            }
        },
        data() {
            return {
                option: {
                    maxFileCount: 3
                },
                files:[],
                rawData: [],
            }
        },
        methods: {
            loaddropfile: function(e) {
                e.preventDefault()
                e.stopPropagation()
            },
            openinput: function() {
                document.getElementById("vue-file-upload-input").click();
            },
            addImage: function(e) {
                const tmpFiles = e.target.files
                if (tmpFiles.length === 0) {
                    return false;
                }
                const file = tmpFiles[0]
                this.files.push(file)
                const self = this
                const reader = new FileReader()
                reader.onload = function(e) {
                    self.rawData.push(e.target.result)
                }
                reader.readAsDataURL(file)
            },
            getFileType: function(file) {
                const fileType = file.type
                if (fileType.startsWith('image')) {
                    return 'image';
                }
                if (fileType.startsWith('video')) {
                    return 'video';
                }
            },
            removeFile: function(index) {
                this.files.splice(index, 1)
                this.rawData.splice(index, 1)
                document.getElementById("vue-file-upload-input").value = null
            },
            upload: function() {
                alert('Check console to see uploads')
            }
        }
    }
</script>
<style scoped>
    .image-input {
        padding: 3px;
    }
    .image-preview {
        width: 90px;
        height: 90px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 10%;
    }
    .image-preview img,
    .image-preview video {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    .dropzone {
        width: 90px;
        height: 90px;
    }
    .dropzone {
        border: 1px dashed green;

    }
    .remove-file {
        position: absolute;
        margin-top: 5px;
        margin-left: -30px;
        color: rgba(0,0,0,0.5);
        padding: 1px 6px;
        background-color: rgba(0,0,0,0.3);
    }
    .remove-file:hover {
        color: #555;
        background-color: #f4f5f7;
    }
</style>