<template>

    <div class="base-image-input dropzone-border" ref="imgdiv"
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
        event: [
            'input'
        ],
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
                // let data = new FormData();
                // data.append("image", )
                let file = files[0];

                if(files && input.files){
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imageData = e.target.result
                    };

                    reader.readAsDataURL(file);
                    this.$refs.imgdiv.classList.remove("dropzone-border");

                    this.$emit('input', file);
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
        border-radius: 10px;
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
        border-radius: 10px;
    }
    .placeholder:hover{
        background: #e0e0e0;
    }
    .file-input{
        display: none;
    }

</style>