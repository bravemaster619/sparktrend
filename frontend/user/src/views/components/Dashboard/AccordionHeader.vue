<template>
    <div class="u-position-relative">
        <div class="salesorder-list-item">
            <div class="salesorder-list-image d-flex flex-column">
                <div class="m-auto">
                    <img class="img-fluid salesorder-list-img-profile"
                         src="https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/57410799_439308906901748_6523150695137280000_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=F6_ZLELSDd0AX8INH3W&oh=a5e2d8014b0b4657ba014364ec6e8509&oe=5E9783AA"
                         alt="img">
                    <p class="mb-0 mt-1 font-weight-light text-muted text-center">
                        "@mind.perspective"
                    </p>
                </div>
            </div>
            <div class="d-flex flex-md-row flex-column justify-content-between w-100 pr-md-5 pl-md-4 text-center">
                <div class="d-flex flex-column">
                    <div class="m-auto text-md-left text-center">
                        <span>#INV000337</span>
                        <h6 class="m-0">
                            2019-12-27 03:21:15
                        </h6>
                        <h4 class="font-weight-bold">
                            Mind.Perspective
                        </h4>
                        <label class="lbl label-warning text-uppercase">
                            {{$t("waiting_for_payment")}}
                        </label>
                    </div>

                </div>
                <div class="d-flex flex-md-column flex-row">
                    <span class="salesorder-list-payment-status unpaid text-center mx-md-auto mr-auto my-md-0 my-auto">
                        Unpaid
                    </span>
                    <h2 class="salesorder-price ml-auto mt-md-auto mt-2">
                        <span class="text-cement-grey">$</span>
                        <span class="text-neon-green">48.00<</span>
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccordionHeader"
    }
</script>

<style scoped>

</style>