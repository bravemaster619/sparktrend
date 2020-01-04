<template>
    <div>
        <h5>Check Instagram</h5>
        <p>
            Please provide your name and profile of your instagram that will help us verifying your instagram account
        </p>
        <div>
            <form class="form-verifyproduct">
                <div class="form-group">
                    <label for="instagram_account">Instagram Account</label>
                    <input id="instagram_account" type="text" class="form-control invalid-input" name="username" placeholder="Instagram Username">
                    <span class="invalid-feedback error">Please enter an instagram account</span>
                </div>
                <div class="form-group row">
                    <div class="col-md-6 col-12">
                        <button  class="btn btn-primary btn-grad-effect w-100 m-0 text-uppercase" action="submit">{{$t("Check Instagram")}}</button>
                    </div>
                </div>
            </form>
            <div class="preview-profile animated fadeIn z-depth-2">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                        <img src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s150x150/43818140_2116018831763532_3803033961098117120_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=HmoDmCowxUsAX_To_yq&oh=ce3c80ff70d434a0000cb987779be509&oe=5EA533F6"
                             alt="profile" class="img-fluid img-round img-preview-ig">
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-8">
                        <h4 class="pt-1 text-md-left text-center">leomessi</h4>
                        <div class="row text-md-left text-center">
                            <div class="col-4 text-center">
                                551<br>posts
                            </div>
                            <div class="col-4 text-center">
                                141.1M<br>followers
                            </div>
                            <div class="col-4 text-center">
                                227<br>following
                            </div>
                        </div>
                        <div class="description pt-3">
                            <p>
                                Bienvenidos a la cuenta oficial de Instagram de Leo Messi / Welcome to the official Leo Messi Instagram account
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row button-next">
                <button class="btn btn-primary btn-grad-effect text-uppercase">{{$t("Next")}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddProductCheck"
    }
</script>

<style scoped>

</style>