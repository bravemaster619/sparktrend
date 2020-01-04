<template>
    <div class="container py-0 overflow-hidden">
        <div class="row justify-content-between align-items-center">
            <div class="col-lg-5 mb-5 mb-lg-0">
            </div>
            <div class="col-12 mb-lg-auto">
                <div class="rounded">
                    <b-carousel id="cart-info-carousel"
                                controls
                                indicators
                                :interval=5000
                                >
                        <!-- Text slides with image -->
                        <b-carousel-slide img-src="img/category-info/single-post.png">
                            <h6>{{$t("Single")}}</h6>
                            <p>{{$t("Single post is a simple post of a picture and caption.")}}</p>
                        </b-carousel-slide>
                        <b-carousel-slide img-src="img/category-info/multiple-post.gif">
                            <h6>{{$t("Multiple")}}</h6>
                            <p>{{$t("Multiple post is a post of multiple pictures at once and a caption.")}}</p>
                        </b-carousel-slide>
                        <b-carousel-slide img-src="img/category-info/story-post.png">
                            <h6>{{$t("Story")}}</h6>
                            <p>{{$t("Story post is a post on Instagram story.")}}</p>
                        </b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";

export default {
  components: {
    BCarousel,
    BCarouselSlide
  }
};
</script>
<style>
</style>
