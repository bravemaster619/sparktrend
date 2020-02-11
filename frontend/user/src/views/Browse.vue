<template>
    <div class="row">
        <div :v-model="canShowFilter" v-if="canShowFilter" class="filters col-lg-3 col-12 pt-0 border border-light ">
            <div class="filters-header">
                <h6 class="bg-primary text-white text-weight-bold py-3 text-center mb-4">{{$t("Filters")}}</h6>
            </div>
            <div class="filters-body">
                <div class="row mt-0">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-top-0 border-right-0 border-left-0">
                        {{$t("Price")}}</h6>
                    <div class="col-12 mt-2">
                        <base-input
                                class="mb-1"
                                :placeholder="$t('Minimum Price')"
                                :addon-left-svg="UsdCircle"
                                v-model="filter.price.min"
                        ></base-input>
                    </div>
                    <div class="col-12 mt-2">
                        <base-input
                                class="mb-1"
                                :placeholder="$t('Maximum Price')"
                                :addon-left-svg="UsdCircle"
                                v-model="filter.price.max"
                        ></base-input>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">
                        {{$t("Niche")}}</h6>
                    <div class="col-12 mt-2">
                        <base-checkbox
                                v-for="(niche, index) in niches"
                                :key="index"
                                v-model="niche.checked"
                        >{{$t(niche.text)}}
                        </base-checkbox>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">
                        {{$t("Categories")}}</h6>
                    <div class="col-12 mt-2">
                        <base-checkbox
                                v-for="(category, index) in categories"
                                :key="index"
                                v-model="category.checked">
                            {{$t(category.text)}}
                        </base-checkbox>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">
                        {{$t("Gender")}}</h6>
                    <div class="col-12 mt-2">
                        <base-radio v-for="(gender, index) in genders"
                                :key="index"
                                v-bind:name="gender.text"
                                v-model="filter.gender_selected"
                        >
                            {{$t(gender.text)}}
                        </base-radio>
                    </div>
                </div>
                <div class="row mt-4">
                    <h6 class="col-12 py-2 font-weight-bold border border-light border-right-0 border-left-0">
                        {{$t("Country Base")}}</h6>
                    <div class="col-12 mt-2">
                        <v-select multiple
                                  v-model="filter.country_selected"
                                  :selectable="() => filter.country_selected.length < 3"
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
                        <base-button type="danger" class="w-100" @click="resetFilter">
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
                                <input class="form-control"
                                       :placeholder="$t('Search for instagram username here...')"
                                       v-model="filter.username"
                                       v-debounce:300ms.lock="showSearchHints"
                                       type="text">
                                <div class="input-group-append">
                                        <span class="input-group-text p-0" @click="showResult">
                                            <i class="btn btn-primary fa fa-search"></i>
                                        </span>
                                </div>
                            </div>
                        </div>
                        <search-hint
                           v-if="searchHints.length"
                           :hints="searchHints"
                        />
                    </div>
                </div>
            </div>
            <div class="filter-result-body vld-parent">
                <loading
                        :active="loading"
                        :is-full-page="true"
                        loader="dots"
                        color="#5e72e4"
                ></loading>
                <div class="row p-2" v-if="instaaccounts.length">
                    <product-item
                            v-for="(instaaccount, index) in instaaccounts"
                            :instaaccount="instaaccount"
                            :key="index"
                    ></product-item>
                </div>
                <div class="row p-2" v-if="(!instaaccounts || !instaaccounts.length) && !loading">
                    <div class="col-12 text-center p-3">
                        <img src="/img/nodata.png" style="max-width: 125px">
                        <h6 class="mt-2">{{$t("Oops!")}}</h6>
                        <p>{{$t("Looks like there's nothing here...")}}</p>
                    </div>
                </div>
            </div>
            <paginate
                :paginate-count="filter.page_length"
                :pageCount = totalPage
                :prev-text="'&laquo;'"
                :next-text="'&raquo;'"
                :container-class="'pagination browse-pagination'"
                :click-handler="onPageNavigate"

                v-model=filter.page
                ></paginate>
        </div>
        <div class="floating-buttons d-flex d-lg-none" v-if="canShowResult">
            <button class="filters-button" @click="showFilter">{{$t("Filters")}}</button>
        </div>
    </div>
</template>
<script>
   import UsdCircle from './../components/Svg/UsdCircle';
   import ProductItem from "./components/ProductItem";
   import httpService from '../services/http.service'
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css';
   import Vue from 'vue'
   import vueDebounce from 'vue-debounce'
   import SearchHint from "./components/SearchHints";
   Vue.use(vueDebounce)

   const defaultState = {
      UsdCircle,
      niches: [{"value":"1","text":"Humour & Memes","checked":false},{"value":"2","text":"Fashion & Style","checked":false},{"value":"3","text":"Fitness & Sports","checked":false},{"value":"4","text":"Quotes & Texts","checked":false},{"value":"5","text":"Luxury & Motivation","checked":false},{"value":"6","text":"Cars & Bikes","checked":false},{"value":"7","text":"Outdoor & Travel","checked":false},{"value":"8","text":"Food & Nutrition","checked":false},{"value":"9","text":"Pets & Animals","checked":false},{"value":"10","text":"Models & Lifestyle","checked":false},{"value":"11","text":"Personal & Talent","checked":false},{"value":"12","text":"Music & Singers","checked":false},{"value":"13","text":"Science & Technology","checked":false},{"value":"14","text":"Art","checked":false},{"value":"15","text":"Beauty, Cosmetic & Personal Care","checked":false},{"value":"16","text":"Clip & Movie","checked":false},{"value":"17","text":"Drink & Beverage","checked":false},{"value":"18","text":"Games & Play","checked":false},{"value":"19","text":"Cabin and Wood","checked":false},{"value":"20","text":"Interior Design","checked":false}],
      categories: [{"value": "1", "text": "Single", "checked": false}, {"value": "2", "text": "Multiple", "checked": false}, {"value": "3", text: "Story", "checked":false }],
      genders: [{"value": "-1", "text": "All", "selected": false}, {"value": "1", "text": "Male", "selected": false}, {"value": "2", "text": "Female", "selected": false}],
      countries: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Democratic People's Republic of Korea", "Republic of Korea", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint LUCIA", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
      filter: {
         price: {
            min: null,
            max: null
         },
         page_length: 20,
         gender_selected: 'All',
         country_selected: [],
         username: '',
      },
   }
   export default {
      name: 'browse',
      state: {},
      data() {
         return {
            loading: true,
            showMdFilters: false,
            showMdResults: true,
            isMd: window.innerWidth < 992,
            UsdCircle,
            niches: [{"value":"1","text":"Humour & Memes","checked":false},{"value":"2","text":"Fashion & Style","checked":false},{"value":"3","text":"Fitness & Sports","checked":false},{"value":"4","text":"Quotes & Texts","checked":false},{"value":"5","text":"Luxury & Motivation","checked":false},{"value":"6","text":"Cars & Bikes","checked":false},{"value":"7","text":"Outdoor & Travel","checked":false},{"value":"8","text":"Food & Nutrition","checked":false},{"value":"9","text":"Pets & Animals","checked":false},{"value":"10","text":"Models & Lifestyle","checked":false},{"value":"11","text":"Personal & Talent","checked":false},{"value":"12","text":"Music & Singers","checked":false},{"value":"13","text":"Science & Technology","checked":false},{"value":"14","text":"Art","checked":false},{"value":"15","text":"Beauty, Cosmetic & Personal Care","checked":false},{"value":"16","text":"Clip & Movie","checked":false},{"value":"17","text":"Drink & Beverage","checked":false},{"value":"18","text":"Games & Play","checked":false},{"value":"19","text":"Cabin and Wood","checked":false},{"value":"20","text":"Interior Design","checked":false}],
            categories: [{"value": "1", "text": "Single", "checked": false}, {"value": "2", "text": "Multiple", "checked": false}, {"value": "3", text: "Story", "checked":false }],
            genders: [{"value": "-1", "text": "All", "selected": false}, {"value": "1", "text": "Male", "selected": false}, {"value": "2", "text": "Female", "selected": false}],
            countries: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Democratic People's Republic of Korea", "Republic of Korea", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint LUCIA", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
            instaaccounts: [],
            total_count: 0,
            filter: {
               page: this.$route.query.page ? this.$route.query.page : 1,
               page_length: 20,
               price: {
                  min: this.$route.query.lp,
                  max: this.$route.query.hp
               },
               gender_selected: ['All', 'Male', 'Female'].includes(this.$route.query.g) ? this.$route.query.g : 'All',
               country_selected: this.$route.query.c ? this.$route.query.c.split(":") : [],
            },
             searchHints: []
         }
      },
      components: {SearchHint, ProductItem, Loading },
      computed: {
         canShowFilter() {
            return !this.isMd || this.showMdFilters;
         },
         canShowResult() {
            return !this.isMd || this.showMdResults;
         },
         totalPage() {
             return parseInt((this.total_count + this.filter.page_length - 1) / this.filter.page_length)
         },
         queryBuilder() {
            const qb = {};
            if (this.filter.page && parseInt(this.filter.page) > 1) {
               qb.page = this.filter.page // { page } for page
            }
            if (this.filter.price.min) {
               qb.lp = this.filter.price.min; // { lp } for minimum price
            }
            if (this.filter.price.max) {
               qb.hp = this.filter.price.max; // { hp } for maximum price
            }
            if (this.filter.gender_selected !== "All") {
               qb.g = this.filter.gender_selected // { g } for gender
            }
            if (this.filter.country_selected.length) {
               qb.c = this.filter.country_selected.join(":") // { c } for country
            }
            if (this.filter.username) {
               qb.u = this.filter.username // { u } for username
            }
            let tmpQuery = ""; let tmpArr = [];
            this.niches.forEach(nich => {
               if (nich.checked) {
                  tmpArr.push(`${nich.text.replace(/\s&\s/g, "_")}`)
               }
            });
            if (tmpArr.length) qb.n = tmpArr.join(":"); // { n } for niches
            tmpQuery = ""; tmpArr = [];
            this.categories.forEach(cat => {
               if (cat.checked) {
                  tmpArr.push(cat.text)
               }
            })
            if (tmpArr.length) qb.cat = tmpArr.join(":"); // { cat } for categories
            let queryString = "";
            for(var key in qb) {
               queryString += `${encodeURI(key)}=${encodeURI(qb[key])}&`
            }
            if (queryString) {
               // prepend quotation mark and remove unnecessary ampersand in the end
               queryString = `?${queryString.substr(0, queryString.length-1)}`
            }
            return queryString
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
            location.href = this.$route.path + this.queryBuilder
         },
         resetFilter() {
            Object.assign(this.$data, defaultState)
         },
         onResize() {
            this.isMd = window.innerWidth < 992;
         },
         onPageNavigate(pageNum) {
            location.href = this.$route.path + this.queryBuilder
         },
         showSearchHints() {
             if(this.filter.username) {
                 httpService.get(`/instaaccounts` + this.queryBuilder).then((res) => {
                     if(res.data.data && res.data.data.length) {
                         this.searchHints = res.data.data.slice(0,5)
                     } else {
                         this.searchHints = []
                     }
                 }).catch(e => {
                     this.searchHints = []
                 })
             } else {
                 this.searchHints = []
             }

         }
      },
      created() {
         window.addEventListener('resize', this.onResize)
      },
      mounted() {
         if (this.$route.query.n) {
            const qn = this.$route.query.n.split(":")
            this.niches.forEach(niche => {
                if (qn.includes(niche.text.replace(/\s&\s/g, "_"))) {
                   niche.checked = true
                }
            })
         }
         if (this.$route.query.cat) {
            const qc = this.$route.query.cat.split(":")
            this.categories.forEach(cat => {
               if (qc.includes(cat.text)) {
                  cat.checked = true
               }
            })
         }
         httpService.get(`instaaccounts/${window.location.search}`).then((resp) => {
            if (resp.status === 200) {
                this.instaaccounts = resp.data.data
                if (resp.meta && resp.meta.total) {
                   this.total_count = resp.meta.total
                }
                this.loading = false
            } else {
                toastr.error('Something is wrong')
            }
         }).catch((err, data) => {
            toastr.error('Something is wrong. Try again later.')
         })
      }
   }
</script>
<style>

</style>