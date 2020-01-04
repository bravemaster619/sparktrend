<template>

    <div class="base-image-input"
        :style="{ 'background-image' : `url(${imageData})`, 'width': width + '%', 'height': height + 'px'}"
        @click="chooseImage">
        <span class="placeholder"
            v-if="!imageData">
            Choose an Image
        </span>
        <input type="file"
               class="file-input"
            ref="fileInput"
            @input="onSelectFile">
    </div>

</template>
<script>
    export default {
        name: "BaseImageInput",
        data () {
            return {
                imageData: null
            }
        },
        props: ['width', 'height'],
        computed: {
            style() {
                return 'width: ' + this.width
            }
        },
        methods : {
            chooseImage() {
                this.$refs.fileInput.click()
            },
            onSelectFile() {
                const input = this.$refs.fileInput;
                const files = input.files;
                if(files && input.files){
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.imageData = e.target.result
                    };
                    reader.readAsDataURL(files[0]);
                    this.$emit('input', files[0]);
                    //https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64
                }
            }
        }
    }
</script>

<style scoped>
    .base-image-input{
        display: block;
        cursor: pointer;
        background-size: cover;
        background-position: center center;
    }
    .placeholder{
        background: #f0f0f0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        font-size: 18px;
    }
    .placeholder:hover{
        background: #e0e0e0;
    }
    .file-input{
        display: none;
    }

</style>