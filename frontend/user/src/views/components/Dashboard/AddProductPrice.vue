<template>
    <div class="col-12">
        <div class="row price-title mb-3">
            <h4>{{$t("Add Product")}}</h4>
        </div>
        <form @submit.prevent="addproduct">
            <div class="text-area-wrapper row mb-4">
                <div class="price-info-header mb-2">
                    {{$t("Describe Your Page")}}
                </div>
                <textarea v-model="description" class="form-control product-information">
                </textarea>
            </div>
            <div class="row price-info mb-4">
                <div class="col-12">
                    <h5 class="mt-3 mb-4">Select Niche</h5>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-4 mb-3">
                            <select class="form-control" v-model="niche">
                                <option v-for="(niche_option, index) in niche_options" :key="index" :value="niche_option.value">
                                    {{niche_option.text}}
                                </option>
                            </select>
                        </div>
                        <div class="col-5 ml-5 mt-2">
                            <span>{{$t("Please select niche. Buyers can find your product by niche.")}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row price-info mb-4">
                <div class="col-12">
                    <h5 class="mt-3 mb-4">Single Post</h5>
                </div>
                <div class="col-md-8">

                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="w-26 mr-3">
                                <select class="form-control" v-model="single_price_model.time">
                                    <option value="12">12 hours</option>
                                    <option value="24">24 hours</option>

                                </select>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="$Price" class="form-control" v-model="single_price_model.price">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="Bio URL Price" class="form-control" v-model="single_price_model.bio_price">
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-theme w-75" @click="addSinglePost" type="button">
                                    <i class="ni ni-fat-add"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mb-3" v-for="(single_price, index) in single_prices" :key="index">
                            <div class="w-26 mr-3">
                                <input type="text" :value="single_price.time + 'hours'" readonly class="form-control">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="single_price.price" placeholder="$Price" readonly class="form-control">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="single_price.bio_price" placeholder="Bio URL Price" readonly class="form-control">
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
                                <select class="form-control" v-model="multiple_price_model.time">
                                    <option value="12">12 hours</option>
                                    <option value="24">24 hours</option>
                                </select>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="$Price" class="form-control" v-model="multiple_price_model.price">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="Bio URL Price" class="form-control" v-model="multiple_price_model.bio_price">
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-theme w-75" @click="addMultiplePost" type="button">
                                    <i class="ni ni-fat-add"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mb-3" v-for="(multiple_price, index) in multiple_prices" :key="index">
                            <div class="w-26 mr-3">
                                <input type="text" :value="multiple_price.time + 'hours'" readonly class="form-control">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="multiple_price.price" placeholder="$Price" readonly class="form-control">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="multiple_price.bio_price" placeholder="Bio URL Price" readonly class="form-control">
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
                            Multiple post is simple post of multiple pictures and a caption.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row price-info mb-4">
                <div class="col-12">
                    <h5 class="mt-3 mb-4">Story</h5>
                </div>
                <div class="col-md-8">

                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="w-26 mr-3">
                                <select class="form-control" v-model="story_price_model.time">
                                    <option value="12">12 hours</option>
                                    <option value="24">24 hours</option>
                                </select>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="$Price" class="form-control" v-model="story_price_model.price">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" placeholder="Bio URL Price" class="form-control" v-model="story_price_model.bio_price">
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-theme w-75" @click="addStoryPost" type="button">
                                    <i class="ni ni-fat-add"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mb-3" v-for="(story_price, index) in story_prices" :key="index">
                            <div class="w-26 mr-3">
                                <input type="text" readonly class="form-control" :value="story_price.time + 'hours'">
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="story_price.price" placeholder="$Price" readonly class="form-control">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-26 mr-3">
                                <input type="text" :value="story_price.bio_price" placeholder="Bio URL Price" readonly class="form-control">
                                <span class="price-add-info">*Est. Price <span class="color-theme">$156.39</span></span>
                            </div>
                            <div class="w-15">
                                <button class="btn price-btn text-center color-red w-75" type="button" @click="deleteStoryPost()">
                                    <i class="ni ni-fat-delete"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-1">
                    <div class="row">
                        <p>
                            Story post is a series of pictures and captions.
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
    import { addProductService } from "../../../services";

    export default {
        name: "AddProductPrice",
        props:  {
            _id :   {
                required:   true
            }
        },
        data() {
            return {
                description: "Lorem ipsum lsefme sidfimpfw sidfwhgwe koerhweos ssjog3wj4ogjwpojmowfej woj efojweogfj wniwent p we oj pojpwejf we",
                single_prices : [

                ],
                multiple_prices : [

                ],
                story_prices    : [

                ],
                single_price_model : {
                    time    :  "'",
                    price  :   "",
                    bio_price: ""
                },
                multiple_price_model : {
                    time    :   "",
                    price  :   "",
                    bio_price: ""
                },
                story_price_model   :  {
                    time    :   "",
                    price  :   "",
                    bio_price: ""
                },

                niche   :   "",
                niche_options: [{"value":"1","text":"Humour & Memes"},{"value":"2","text":"Fashion & Style"},{"value":"3","text":"Fitness & Sports"},{"value":"4","text":"Quotes & Texts"},{"value":"5","text":"Luxury & Motivation"},{"value":"6","text":"Cars & Bikes"},{"value":"7","text":"Outdoor & Travel"},{"value":"8","text":"Food & Nutrition"},{"value":"9","text":"Pets & Animals"},{"value":"10","text":"Models & Lifestyle"},{"value":"11","text":"Personal & Talent"},{"value":"12","text":"Music & Singers"},{"value":"13","text":"Science & Technology"},{"value":"14","text":"Art"},{"value":"15","text":"Beauty, Cosmetic & Personal Care"},{"value":"16","text":"Clip & Movie"},{"value":"17","text":"Drink & Beverage"},{"value":"18","text":"Games & Play"},{"value":"19","text":"Cabin and Wood"},{"value":"20","text":"Interior Design"}],
            }
        },
        methods: {
            addSinglePost () {
                if(this.isEmpty(this.single_price_model.time) ||
                this.isEmpty(this.single_price_model.price) ||
                this.isEmpty(this.single_price_model.bio_price)){
                    return;
                }
                let model = {};

                model.time = parseInt(this.single_price_model.time);
                model.bio_price = parseInt(this.single_price_model.bio_price);
                model.price = parseInt(this.single_price_model.price);

                this.single_prices.push(model);

                this.single_price_model.time = "";
                this.single_price_model.price = "";
                this.single_price_model.bio_price = "";
            },
            addMultiplePost(){
                if(this.isEmpty(this.multiple_price_model.time) ||
                    this.isEmpty(this.multiple_price_model.price) ||
                    this.isEmpty(this.multiple_price_model.bio_price)){
                    return;
                }
                let model = {};

                model.time = parseInt(this.multiple_price_model.time);
                model.bio_price = parseInt(this.multiple_price_model.bio_price);
                model.price = parseInt(this.multiple_price_model.price);

                this.multiple_prices.push(model);

                this.multiple_price_model.time = "";
                this.multiple_price_model.price = "";
                this.multiple_price_model.bio_price = "";
            },
            addStoryPost() {
                if(this.isEmpty(this.story_price_model.time) ||
                    this.isEmpty(this.story_price_model.price) ||
                    this.isEmpty(this.story_price_model.bio_price)){
                    return;
                }
                let model = {};

                model.time = parseInt(this.story_price_model.time);
                model.bio_price = parseInt(this.story_price_model.bio_price);
                model.price = parseInt(this.story_price_model.price);

                this.story_prices.push(model);

                this.story_price_model.time = "";
                this.story_price_model.price = "";
                this.story_price_model.bio_price = "";
            },
            deleteSinglePost(index){
                this.single_prices.splice(index, 1);
            },
            deleteMultiplePost(index){
                this.multiple_prices.splice(index, 1);
            },
            deleteStoryPost(index){
                this.story_prices.splice(index, 1);
            },
            addproduct(){
                let data = this.gatherData();
                console.log(this._id);
                addProductService.addProduct(data, this._id)
                    .then(( { data } ) => {
                        this.$store.dispatch("alert/success", "Successfully added");
                        this.$router.push("/myproducts");
                    })
                    .catch( ( { response } ) => {
                        let msg = response.data.message || "Error Occrred. Please try again.";
                        this.$store.dispatch("auth/checkAuth", response);
                        this.$store.dispatch("alert/error", msg);
                    })

            },
            gatherData(){
                if(!this.description){
                    return false;
                }
                if(!this.niche){
                    return false;
                }
                let categories = {}; let res = false;
                if(this.single_prices.length){
                    categories.Single = this.single_prices;
                    res = true;
                }
                if(this.multiple_prices.length){
                    categories.Multiple = this.multiple_prices;
                    res = true;
                }
                if(this.story_prices.length){
                    categories.Story = this.story_prices;
                    res = true;
                }

                if(res){
                    res = {
                        description :   this.description,
                        niches      :   this.niche,
                        banner_img  :   "",
                        categories  :   [
                            {
                                type    :   "Single",
                                pricing :   this.single_prices
                            },
                            {
                                type    :   "Multiple",
                                pricing :   this.multiple_prices
                            },
                            {
                                type    :   "Story",
                                pricing :   this.story_prices
                            }
                        ]
                    };
                    return res;
                }
                return res;
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