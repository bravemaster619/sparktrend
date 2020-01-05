<template>
    <div class="col-12">
        <div class="row price-title mb-3">
            <h4>{{$t("Add Product")}}</h4>
        </div>
        <form>
            <div class="text-area-wrapper row mb-4">
                <div class="price-info-header mb-2">
                    {{$t("Describe Your Page")}}
                </div>
                <textarea v-model="description" class="form-control product-information">
                </textarea>
            </div>
            <div class="row price-info mb-4">
                <div class="col-12">
                    <h5 class="mt-3 mb-4">Single Post</h5>
                </div>
                <div class="col-md-8">

                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="w-26 mr-3">
                                <select class="form-control" v-model="single_price_model.category">
                                    <option value="12hours">12 hours</option>
                                    <option value="24hours">24 hours</option>
                                    <option value="story">Story</option>
                                </select>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="$Price" class="form-control" v-model="single_price_model.base_price">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="Bio URL Price" class="form-control" v-model="single_price_model.base_bio_price">
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-theme w-75" @click="addSinglePost" type="button">
                                    <i class="ni ni-fat-add"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mb-3" v-for="(single_price, index) in single_prices" :key="index">
                            <div class="w-26 mr-3">
                                <input type="text" value="Duration" readonly class="form-control" v-model="single_price.category">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" value="" placeholder="$Price" readonly class="form-control" v-model="single_price.base_price">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" value="" placeholder="Bio URL Price" readonly class="form-control" v-model="single_price.base_bio_price">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-red w-75" type="button" @click="deleteSinglePost(index)">
                                    <i class="ni ni-fat-delete"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-1">
                    <div class="row">
                        <p>
                            Single post is simple post of 1 picture and a caption.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row price-info mb-4">
                <div class="col-12">
                    <h5 class="mt-3 mb-4">Mutiple Post</h5>
                </div>
                <div class="col-md-8">

                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="w-26 mr-3">
                                <select class="form-control" v-model="multiple_price_model.category">
                                    <option value="12hours">12 hours</option>
                                    <option value="24hours">24 hours</option>
                                    <option value="story">Story</option>
                                </select>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="$Price" class="form-control" v-model="multiple_price_model.base_price">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="Bio URL Price" class="form-control" v-model="multiple_price_model.base_bio_price">
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-theme w-75" @click="addMultiplePost" type="button">
                                    <i class="ni ni-fat-add"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mb-3" v-for="(multiple_price, index) in multiple_prices" :key="index">
                            <div class="w-26 mr-3">
                                <input type="text" value="Duration" readonly class="form-control" v-model="multiple_price.category">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" value="" placeholder="$Price" readonly class="form-control" v-model="multiple_price.base_price">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" value="" placeholder="Bio URL Price" readonly class="form-control" v-model="multiple_price.base_bio_price">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-red w-75" type="button" @click="deleteMultiplePost()">
                                    <i class="ni ni-fat-delete"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-1">
                    <div class="row">
                        <p>
                            Multiple post is simple post of 1 picture and a caption.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-end">
                <button class="btn btn-grad-effect" type="submit">
                    {{$t("finish")}}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddProductPrice",
        data() {
            return {
                description: "Lorem ipsum lsefme sidfimpfw sidfwhgwe koerhweos ssjog3wj4ogjwpojmowfej woj efojweogfj wniwent p we oj pojpwejf we",
                single_prices : [

                ],
                multiple_prices : [

                ],
                single_price_model : {
                    category    :   "",
                    base_price  :   "",
                    base_bio_price: ""
                },
                multiple_price_model : {
                    category    :   "",
                    base_price  :   "",
                    base_bio_price: ""
                }
            }
        },
        methods: {
            addSinglePost () {
                if(this.isEmpty(this.single_price_model.category) ||
                this.isEmpty(this.single_price_model.base_price) ||
                this.isEmpty(this.single_price_model.base_bio_price)){
                    return;
                }

                let model = Object.assign({}, this.single_price_model);
                console.log(model.category);
                this.single_prices.push(model);

                this.single_price_model.category = "";
                this.single_price_model.base_price = "";
                this.single_price_model.base_bio_price = "";
            },
            addMultiplePost(){
                if(this.isEmpty(this.multiple_price_model.category) ||
                    this.isEmpty(this.multiple_price_model.base_price) ||
                    this.isEmpty(this.multiple_price_model.base_bio_price)){
                    return;
                }
                let model = Object.assign({}, this.multiple_price_model);
                this.multiple_prices.push(model);

                this.multiple_price_model.category = "";
                this.multiple_price_model.base_price = "";
                this.multiple_price_model.base_bio_price = "";
            },
            deleteSinglePost(index){
                this.single_prices.splice(index, 1);
            },
            deleteMultiplePost(index){
                this.multiple_prices.splice(index, 1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .price-title{
        border: none;
        border-bottom: 1px solid #cad1d7;
    }
    .product-information{
        min-height: 150px
    }
    .price-info{
        border: 1px solid #cad1d7;
        border-radius: 0.25rem;
    }
    .price-btn{
        border-radius: 5px;
        font-size: 1rem;
        background: #eee;
        border: 1px solid #cad1d7;
    }
    .price-add-info{
        font-size: 0.75rem;
    }
    .w-26{
        width: 26% !important;
    }
</style>