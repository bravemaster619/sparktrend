<template>
    <div class="w-100 section-50 d-flex flex-column align-items-center text-center">
        <div style="width: 100%; max-width: 125px;">
            <img class="w-100" src="/img/nodata.png">
        </div>
        <h4 class="mt-3 mb-0" style="color: rgb(96, 96, 98);">{{$t("Oops!")}}</h4>
        <p style="color: rgb(96, 96, 98);">{{$t("Looks like there's nothing here...")}}</p>
    </div>
</template>

<script>
    export default {
        name: "NoData"
    }
</script>

<style scoped>

</style>