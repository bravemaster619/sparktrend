<template>
    <div class="row">
        <div :v-model="canShowFilter" v-if="canShowFilter" class="filters col-lg-3 col-12 pt-0 border border-light ">
            <div class="filters-header">
                <h6 class="bg-primary text-white text-weight-bold py-3 text-center mb-4">{{$t("Filters")}}</h6>
            </div>
            <div class="filters-body">
                <div class="row mt-0">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-top-0 border-right-0 border-left-0">{{$t("Price")}}</h6>
                    <div class="col-12 mt-2">
                        <base-input
                                class="mb-1"
                                :placeholder="$t('Minimum Price')"
                                :addon-left-svg="UsdCircle"
                        ></base-input>
                    </div>
                    <div class="col-12 mt-2">
                        <base-input
                                class="mb-1"
                                :placeholder="$t('Maximum Price')"
                                :addon-left-svg="UsdCircle"
                        ></base-input>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">{{$t("Niche")}}</h6>
                    <div class="col-12 mt-2">
                        <base-checkbox
                                v-for="(niche, index) in niches"
                                v-bind:value="niche.value"
                                :key="index"
                        >{{$t(niche.text)}}</base-checkbox>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">{{$t("Categories")}}</h6>
                    <div class="col-12 mt-2">
                        <base-checkbox
                                v-for="(category, index) in categories"
                                :key="index"
                                v-bind:value="category.value">
                            {{$t(category.text)}}
                        </base-checkbox>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">{{$t("Gender")}}</h6>
                    <div class="col-12 mt-2">
                        <base-radio
                                v-for="(gender, index) in genders"
                                :key="index"
                                v-bind:value="gender.value">
                            {{$t(gender.text)}}
                        </base-radio>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">{{$t("Country Base")}}</h6>
                    <div class="col-12 mt-2">
                        <v-select multiple
                                  v-model="selected"
                                  :selectable="() => selected.length < 3"
                                  :options="countries">
                        </v-select>
                    </div>
                </div>

            </div>
            <div class="filters-footer pb-4">
                <div class="row mt-4">
                    <div class="col-12">
                        <base-button type="primary" class="w-100" @click="showResult">
                            {{$t("Apply Filter")}}
                        </base-button>
                    </div>
                    <div class="col-12 mt-2">
                        <base-button type="danger" class="w-100">
                            {{$t("Reset Filter")}}
                        </base-button>
                    </div>
                </div>
            </div>
        </div>
        <div :v-model="canShowResult" v-if="canShowResult" class="col-lg-9 col-12 filter-result">
            <div class="filter-result-header">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <div class="input-group">
                                <input class="form-control" :placeholder="$t('Search for instagram username or fullname here...')" type="text">
                                <div class="input-group-append">
                                        <span class="input-group-text p-0">
                                            <i class="btn btn-primary fa fa-search"></i>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter-result-body">
                <div class="row p-2">
                    <product-item
                            v-for="(product, index) in products"
                            :product="product"
                            :key="index"
                    ></product-item>
                </div>
            </div>
        </div>
        <div class="floating-buttons d-flex d-lg-none" v-if="canShowResult">
            <button class="filters-button" @click="showFilter">{{$t("Filters")}}</button>
        </div>
    </div>
</template>
<script>
import UsdCircle from './../components/Svg/UsdCircle';
import ProductItem from "./components/ProductItem";
export default {
   name: 'browse',

   state: {

   },
   data() {
        return {
           showMdFilters: false,
           showMdResults: true,
           isMd: window.innerWidth < 992,
           UsdCircle,
           niches: [{"value":"1","text":"Humour & Memes"},{"value":"2","text":"Fashion & Style"},{"value":"3","text":"Fitness & Sports"},{"value":"4","text":"Quotes & Texts"},{"value":"5","text":"Luxury & Motivation"},{"value":"6","text":"Cars & Bikes"},{"value":"7","text":"Outdoor & Travel"},{"value":"8","text":"Food & Nutrition"},{"value":"9","text":"Pets & Animals"},{"value":"10","text":"Models & Lifestyle"},{"value":"11","text":"Personal & Talent"},{"value":"12","text":"Music & Singers"},{"value":"13","text":"Science & Technology"},{"value":"14","text":"Art"},{"value":"15","text":"Beauty, Cosmetic & Personal Care"},{"value":"16","text":"Clip & Movie"},{"value":"17","text":"Drink & Beverage"},{"value":"18","text":"Games & Play"},{"value":"19","text":"Cabin and Wood"},{"value":"20","text":"Interior Design"}],
           categories: [{"value": "1", "text": "Single"}, {"value": "2", "text": "Multiple"}, {"value": "3", text: "Story"}],
           genders: [{"value": "-1", "text": "All"}, {"value": "1", "text": "Male"}, {"value": "2", "text": "Female"}],
           countries: ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegowina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, the Democratic Republic of the","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia (Hrvatska)","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","France, Metropolitan","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard and Mc Donald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran (Islamic Republic of)","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Democratic People's Republic of Korea","Republic of Korea","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia, The Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Kitts and Nevis","Saint LUCIA","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Seychelles","Sierra Leone","Singapore","Slovakia (Slovak Republic)","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","St. Helena","St. Pierre and Miquelon","Sudan","Suriname","Svalbard and Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands (British)","Virgin Islands (U.S.)","Wallis and Futuna Islands","Western Sahara","Yemen","Yugoslavia","Zambia","Zimbabwe"],
           selected: [],
           products: [
              {
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              },{
                 url: '/product',
                 title: '@sampleaccount',
                 product_banner: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
                 niches: 'Fashion & Style',
                 countries: [
                    {name: 'United States', percent: 89},
                    {name: 'China PRC', percent: 6},
                    {name: 'Italy', percent: 5}
                 ],
                 user: {
                    profile_img: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=fEVef91KN4QAX9wGeOo&oh=6945932cc40d1259189e83411b8f3a3e&oe=5E8D5BFA',
                    follower_count: '598.3K'
                 }
              }
           ]
        }
   },
   components: {ProductItem},
   computed: {
      canShowFilter() {
         return !this.isMd || this.showMdFilters;
      },
      canShowResult() {
         return !this.isMd || this.showMdResults;
      }
   },
   methods: {
      showFilter() {
        this.showMdFilters = true;
        this.showMdResults = false;
      },
      showResult() {
         this.showMdFilters = false;
         this.showMdResults = true;
      },
      onResize() {
         this.isMd = window.innerWidth < 992;
      }
   },
   created() {
      window.addEventListener('resize', this.onResize)
   }
}
</script>
<style>

</style>