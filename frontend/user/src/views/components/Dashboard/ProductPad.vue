<template>
    <div class="col-4 col-md-3 col-lg-3 p-2 prod-pad-item">
        <a href="#" class="text-weight-300 d-table text-dark">
            <div class="prod-header">
                <div class="row  d-flex align-items-center">
                    <img src="https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA"
                        class="img-fluid img-round img-preview-ig" style="margin:auto;">
                </div>
                <div class="row mb-2">
                    <div class="col d-flex justify-content-center font-size-lg font-weight-500">
                        <span>@leomessi</span>
                    </div>
                </div>
                <div class="row d-flex align-items-center mb-2">
                    <div class="col-12 d-flex justify-content-center prod-status mb-2">
                        <span class="text-uppercase alert-success p-1 prod-status">{{$t("in_progress")}}</span>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 text-center">
                        <div class="d-md-block font-size-lg font-weight-bold">1.2M</div>
                        <span class="d-md-block">Total followers</span>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 text-center">
                        <span class="d-md-block font-size-lg font-weight-bold">100%</span>
                        <span class="d-md-block">Success Rate</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "ProductPad"
    }
</script>

<style lang="scss" scoped>
    .prod-pad-item{
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: none;
        box-shadow: 3px 3px 5px 2px #adadad;

        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;

        background-color: #fff;

        &:hover{
            background-color: #eee;
            box-shadow: 6px 8px 10px 6px #bdbdbd;
        }
    }
    .prod-status{
        border-radius: 5px;
    }
</style>