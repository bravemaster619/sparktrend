<template>
    <button :class="{'disabled' : loading}" @click="onclick">
        <bounce-loader v-if="loading" :loading="loading" :color="color" :size="30" margin="10px" sizeUnit="px"/>
        <slot v-else></slot>
    </button>
</template>

<script>
    import { BounceLoader } from "@saeris/vue-spinners";

    export default {
        name: "EffectButton",
        event:[
            'click'
        ],
        props:{
            loading : {
                type: Boolean,
                default: false
            },
            color   : {
                type: String,
                default: "#f7b9d1"
            }
        },
        components: {
            BounceLoader
        },
        methods:{
            onclick(){
                this.$emit("click");
            }
        }
    }
</script>

<style scoped>
    button div{
        margin: auto;
    }
</style>