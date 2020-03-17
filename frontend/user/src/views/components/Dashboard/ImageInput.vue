<template>

    <div class="base-image-input dropzone-border" ref="imgdiv"
        :style="{ 'background-image' : `url(${imageData})`, 'width': width + '%', 'height': height + 'px'}"
        @click="chooseImage">
        <span class="placeholder"
            v-if="!imageData">
            {{$t("Choose an Image")}}
        </span>
        <input type="file"
               class="file-input"
            ref="fileInput"
            @change="onSelectFile">
    </div>
</template>
<script>
    export default {
        name: "BaseImageInput",
        props: ['image', 'width', 'height'],
        data () {
            return {
                imageData: this.image ? this.image: null
            }
        },
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
                //window.console.log("File Input: ", input);
                const files = input.files;
                //window.console.log("Input Files: ", files);
                let file = files[0];
                //window.console.log("Input File: ", file);
                if(files && input.files){
                    const reader = new FileReader();
                    //window.console.log("File Reader: ", reader);
                    reader.onload = (e) => {
                        //window.console.log("Onload event: ", e);
                        this.imageData = e.target.result
                        //window.console.log("this image data, ", this.imageData);
                    };
                    //window.console.log("Read as Data Url");
                    reader.readAsDataURL(file);
                    this.$refs.imgdiv.classList.remove("dropzone-border");
                    //window.console.log("Input event fire", file);
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