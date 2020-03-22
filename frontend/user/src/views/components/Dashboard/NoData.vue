<template>
    <div class="w-100 d-flex flex-column align-items-center text-center">
        <div style="width: 100%; position: relative;">
            <img class="no-data-image w-100" src="/img/error 404 5-01.png">
            <div class="no-data-message">
                <h4 class="mt-3 mb-0 text-white" >{{$t("Oops!")}}</h4>
                <p class="text-white">{{$t("Looks like there's nothing here...")}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoData"
    }
</script>

<style scoped>

</style>