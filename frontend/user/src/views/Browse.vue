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
               :pageCount=totalPage
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
      <nav v-if="isLoggedIn" id="bottombar" class="list-unstyled d-block d-lg-none border-top border-primary">
         <div class="row justify-content-around p-3 pb-2 m-0">
            <div class="bottombar-link">
               <router-link to="/browse">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M501 447.9L347.5 294.4c20-30 31.7-66.1 31.7-104.8C379.2 85.1 294.2 0 189.6 0S0 85.1 0 189.6s85.1 189.6 189.6 189.6c38.7 0 74.8-11.7 104.8-31.7L447.9 501c7.1 7.1 16.5 11 26.6 11 10 0 19.5-3.9 26.6-11C515.7 486.4 515.7 462.5 501 447.9zM189.6 359.2c-93.5 0-169.6-76.1-169.6-169.6C20 96.1 96.1 20 189.6 20s169.6 76.1 169.6 169.6S283.1 359.2 189.6 359.2zM486.9 486.9c-3.3 3.3-7.7 5.1-12.4 5.1 -4.7 0-9.1-1.8-12.4-5.1L310.6 335.5c9-7.5 17.3-15.8 24.8-24.8l151.4 151.4C493.7 468.9 493.7 480 486.9 486.9z"></path>
                     <path d="M189.6 45.2c-79.6 0-144.4 64.8-144.4 144.4 0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-68.6 55.8-124.4 124.4-124.4 5.5 0 10-4.5 10-10S195.1 45.2 189.6 45.2z"></path>
                     <path d="M320 127.5c-14.2-29.8-38.5-54-68.2-68.3 -5-2.4-11-0.3-13.3 4.7 -2.4 5-0.3 11 4.7 13.3 25.7 12.3 46.6 33.1 58.8 58.8 1.7 3.6 5.3 5.7 9 5.7 1.4 0 2.9-0.3 4.3-1C320.3 138.4 322.4 132.4 320 127.5z"></path>
                  </svg>
                  <span>{{$t("Browse")}}</span>
               </router-link>
            </div>
            <div class="bottombar-link">
               <router-link to="/dashboard/main">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M332.8 362.7H179.2c-5.1 0-8.5 3.4-8.5 8.5v51.2c0 5.1 3.4 8.5 8.5 8.5h153.6c5.1 0 8.5-3.4 8.5-8.5v-51.2C341.3 366.1 337.9 362.7 332.8 362.7zM324.3 413.9H187.7v-34.1h136.5V413.9z"></path>
                     <path d="M337.1 209.9l-41 24.7c-14.5 8.5-29.9 16.2-44.4 23 -4.3 1.7-9.4 4.3-14.5 6.8 -17.9 9.4-27.3 29-23 48.6 3.4 15.4 16.2 28.2 31.6 31.6 3.4 0.9 6.8 0.9 10.2 0.9 16.2 0 30.7-9.4 38.4-23.9 1.7-4.3 4.3-9.4 6.8-14.5 7.7-14.5 14.5-29.9 23-44.4l24.7-41c1.7-3.4 0.9-6.8-1.7-10.2C344.7 208.2 340.5 208.2 337.1 209.9zM309.8 253.4c-9.4 15.4-17.1 30.7-23.9 46.1 -1.7 5.1-4.3 9.4-6.8 14.5 -5.1 11.1-17.1 16.2-29 13.7 -9.4-1.7-17.1-9.4-18.8-18.8 -2.6-11.9 2.6-23.9 13.7-29 4.3-2.6 9.4-4.3 14.5-6.8 15.4-7.7 31.6-15.4 46.1-23.9l11.1-6.8L309.8 253.4z"></path>
                     <path d="M493.7 208.2c-0.1-0.6-0.3-1.1-0.5-1.7 -0.2-0.6-0.5-1.1-0.8-1.5 -12.8-30.6-31.4-58.3-54.3-81.6 -0.3-0.5-0.7-0.9-1.1-1.4s-0.9-0.8-1.4-1.1C389.2 75.2 325.8 46.9 256 46.9c-33.4 0-65.4 6.5-94.7 18.3 -0.6 0.1-1.1 0.3-1.7 0.5 -0.6 0.2-1.1 0.5-1.5 0.8 -30.6 12.8-58.3 31.4-81.6 54.3 -0.5 0.3-0.9 0.7-1.4 1.1s-0.8 0.9-1.1 1.4C28.3 169.7 0 233.2 0 302.9c0 58 18.8 113.5 55.5 158.7 1.7 2.6 4.3 3.4 6.8 3.4h387.4c2.6 0 5.1-0.9 6.8-3.4C493.2 416.4 512 361 512 302.9 512 269.5 505.5 237.5 493.7 208.2zM446.3 448H66.6c-11.5-14.9-21.1-30.8-28.7-47.6l23.6-9.6c4.3-1.7 6-6.8 4.3-11.1 -1.7-4.3-6.8-6-11.1-4.3l-23.1 9.4c-8.6-23.3-13.4-48-14.3-73.4H76.8c5.1 0 8.5-3.4 8.5-8.5S81.9 294.4 76.8 294.4H17.2c1-26.9 6.4-52.7 15.6-76.7L56.3 227.8c0.9 0.9 2.6 0.9 3.4 0.9 3.4 0 6-1.7 7.7-5.1 1.7-4.3 0-9.4-4.3-11.1l-23.7-10.2c10.7-22.8 24.9-43.7 41.9-62l17.6 17.6c1.7 1.7 3.4 2.6 6 2.6s4.3-0.9 6-2.6c3.4-3.4 3.4-8.5 0-11.9l-17.6-17.6c19.1-17.8 41.1-32.6 65.2-43.4l9.5 23.5c0.9 3.4 4.3 5.1 7.7 5.1 0.9 0 1.7 0 3.4-0.9 4.3-1.7 6-6.8 4.3-11.1l-9.3-23c23-8.5 47.7-13.5 73.3-14.4v59.6c0 5.1 3.4 8.5 8.5 8.5s8.5-3.4 8.5-8.5V64.2c26.9 1 52.7 6.4 76.7 15.6l-10.1 23.4c-1.7 4.3 0 9.4 4.3 11.1 0.9 0.9 2.6 0.9 3.4 0.9 3.4 0 6.8-2.6 7.7-5.1l10.2-23.7c22.8 10.7 43.7 24.9 62 41.9l-17.6 17.6c-3.4 3.4-3.4 8.5 0 11.9 1.7 1.7 3.4 2.6 6 2.6 1.7 0 4.3-0.9 6-2.6l17.6-17.6c17.8 19.1 32.6 41.1 43.4 65.2l-23.5 9.5c-4.3 1.7-6 6.8-4.3 11.1 0.9 3.4 4.3 5.1 7.7 5.1 0.9 0 1.7-0.9 3.4-0.9l23-9.3c8.5 23 13.5 47.7 14.4 73.3H435.2c-5.1 0-8.5 3.4-8.5 8.5s3.4 8.5 8.5 8.5h59.6c-0.9 26.6-6.2 52.5-15.4 76.8l-23.7-10.2c-4.3-1.7-9.4 0-11.1 4.3 -1.7 4.3 0 9.4 4.3 11.1l24 10.4C465.6 419.3 456.8 434.1 446.3 448z"></path>
                  </svg>
                  <span>{{$t("Dashboard")}}</span>
               </router-link>
            </div>
            <div class="bottombar-link">
               <router-link to="/myorders/purchases">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
                     <path d="M11.7 13l-0.8-5h-3C7.4 6.3 5.9 5 4 5 1.8 5 0 6.8 0 9s1.8 4 4 4c1.9 0 3.4-1.3 3.9-3h1.3l0.5 3H9.6l5.2 26c-2.5 0.2-4.5 2.1-4.8 4.5 -0.1 1.4 0.3 2.8 1.3 3.9C12.2 48.4 13.6 49 15 49h2c0 3.3 2.7 6 6 6s6-2.7 6-6h11c0 3.3 2.7 6 6 6s6-2.7 6-6h4c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4.3c-0.8-2.3-3-4-5.6-4s-4.8 1.7-5.6 4h-11.7c-0.8-2.3-3-4-5.6-4s-4.8 1.7-5.6 4H15c-0.8 0-1.7-0.4-2.2-1 -0.6-0.6-0.8-1.5-0.8-2.3 0.2-1.5 1.5-2.7 3.2-2.7h0.8c0 0 0 0 0 0h39C57.8 41 60 38.8 60 36V13H11.7zM4 11c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2S5.1 11 4 11zM46 45c2.2 0 4 1.8 4 4s-1.8 4-4 4 -4-1.8-4-4S43.8 45 46 45zM23 45c2.2 0 4 1.8 4 4s-1.8 4-4 4 -4-1.8-4-4S20.8 45 23 45zM58 36C58 37.7 56.7 39 55 39H16.8l-4.8-24H58V36z"></path>
                  </svg>
                  <span>{{$t("My Purchase")}}</span>
               </router-link>
            </div>
            <div class="bottombar-link">
               <router-link to="/myproducts">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M366.1 0H145.9C65.7 0 0 65.7 0 145.9v220.2C0 446.3 65.7 512 145.9 512h220.2C446.3 512 512 446.3 512 366.1V145.9C512 65.7 446.3 0 366.1 0zM494.9 366.1c0 70.8-58 128.9-128.9 128.9H145.9c-70.8 0-128.9-58-128.9-128.9V145.9c0-70.8 58-128.9 128.9-128.9h220.2c70.8 0 128.9 58 128.9 128.9V366.1z"></path>
                     <path d="M366.1 51.2H145.9c-52.1 0-94.7 42.7-94.7 94.7v220.2c0 52.1 42.7 94.7 94.7 94.7h220.2c52.1 0 94.7-42.7 94.7-94.7V145.9C460.8 93.9 418.1 51.2 366.1 51.2zM443.7 366.1c0 42.7-35 77.7-77.7 77.7H145.9c-42.7 0-77.7-35-77.7-77.7V145.9c0-42.7 35-77.7 77.7-77.7h220.2c42.7 0 77.7 35 77.7 77.7V366.1z"></path>
                     <path d="M256 119.5c-75.1 0-136.5 61.4-136.5 136.5S180.9 392.5 256 392.5 392.5 331.1 392.5 256 331.1 119.5 256 119.5zM256 375.5c-65.7 0-119.5-53.8-119.5-119.5S190.3 136.5 256 136.5 375.5 190.3 375.5 256 321.7 375.5 256 375.5z"></path>
                     <path d="M256 162.1c-52.1 0-93.9 41.8-93.9 93.9 0 52.1 41.8 93.9 93.9 93.9s93.9-41.8 93.9-93.9S308.1 162.1 256 162.1zM256 332.8c-42.7 0-76.8-34.1-76.8-76.8 0-42.7 34.1-76.8 76.8-76.8 42.7 0 76.8 34.1 76.8 76.8C332.8 298.7 298.7 332.8 256 332.8z"></path>
                     <path d="M392.5 93.9c-14.5 0-25.6 11.1-25.6 25.6s11.1 25.6 25.6 25.6c14.5 0 25.6-11.1 25.6-25.6S407 93.9 392.5 93.9z"></path>
                  </svg>
                  <span>{{$t("My Products")}}</span>
               </router-link>
            </div>

         </div>
      </nav>
   </div>
</template>
<script>
   import UsdCircle from './../components/Svg/UsdCircle';
   import ProductItem from "./components/ProductItem";
   import httpService from '../services/http.service'
   import { authService } from '../services/auth.service'
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css';
   import Vue from 'vue'
   import vueDebounce from 'vue-debounce'
   import SearchHint from "./components/SearchHints";

   Vue.use(vueDebounce)

   const defaultState = {
      UsdCircle,
      niches: [{"value": "1", "text": "Humour & Memes", "checked": false}, {
         "value": "2",
         "text": "Fashion & Style",
         "checked": false
      }, {"value": "3", "text": "Fitness & Sports", "checked": false}, {
         "value": "4",
         "text": "Quotes & Texts",
         "checked": false
      }, {"value": "5", "text": "Luxury & Motivation", "checked": false}, {
         "value": "6",
         "text": "Cars & Bikes",
         "checked": false
      }, {"value": "7", "text": "Outdoor & Travel", "checked": false}, {
         "value": "8",
         "text": "Food & Nutrition",
         "checked": false
      }, {"value": "9", "text": "Pets & Animals", "checked": false}, {
         "value": "10",
         "text": "Models & Lifestyle",
         "checked": false
      }, {"value": "11", "text": "Personal & Talent", "checked": false}, {
         "value": "12",
         "text": "Music & Singers",
         "checked": false
      }, {"value": "13", "text": "Science & Technology", "checked": false}, {
         "value": "14",
         "text": "Art",
         "checked": false
      }, {"value": "15", "text": "Beauty, Cosmetic & Personal Care", "checked": false}, {
         "value": "16",
         "text": "Clip & Movie",
         "checked": false
      }, {"value": "17", "text": "Drink & Beverage", "checked": false}, {
         "value": "18",
         "text": "Games & Play",
         "checked": false
      }, {"value": "19", "text": "Cabin and Wood", "checked": false}, {
         "value": "20",
         "text": "Interior Design",
         "checked": false
      }],
      categories: [{"value": "1", "text": "Single", "checked": false}, {
         "value": "2",
         "text": "Multiple",
         "checked": false
      }, {"value": "3", text: "Story", "checked": false}],
      genders: [{"value": "-1", "text": "All", "selected": false}, {
         "value": "1",
         "text": "Male",
         "selected": false
      }, {"value": "2", "text": "Female", "selected": false}],
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
            niches: [{"value": "1", "text": "Humour & Memes", "checked": false}, {
               "value": "2",
               "text": "Fashion & Style",
               "checked": false
            }, {"value": "3", "text": "Fitness & Sports", "checked": false}, {
               "value": "4",
               "text": "Quotes & Texts",
               "checked": false
            }, {"value": "5", "text": "Luxury & Motivation", "checked": false}, {
               "value": "6",
               "text": "Cars & Bikes",
               "checked": false
            }, {"value": "7", "text": "Outdoor & Travel", "checked": false}, {
               "value": "8",
               "text": "Food & Nutrition",
               "checked": false
            }, {"value": "9", "text": "Pets & Animals", "checked": false}, {
               "value": "10",
               "text": "Models & Lifestyle",
               "checked": false
            }, {"value": "11", "text": "Personal & Talent", "checked": false}, {
               "value": "12",
               "text": "Music & Singers",
               "checked": false
            }, {"value": "13", "text": "Science & Technology", "checked": false}, {
               "value": "14",
               "text": "Art",
               "checked": false
            }, {"value": "15", "text": "Beauty, Cosmetic & Personal Care", "checked": false}, {
               "value": "16",
               "text": "Clip & Movie",
               "checked": false
            }, {"value": "17", "text": "Drink & Beverage", "checked": false}, {
               "value": "18",
               "text": "Games & Play",
               "checked": false
            }, {"value": "19", "text": "Cabin and Wood", "checked": false}, {
               "value": "20",
               "text": "Interior Design",
               "checked": false
            }],
            categories: [{"value": "1", "text": "Single", "checked": false}, {
               "value": "2",
               "text": "Multiple",
               "checked": false
            }, {"value": "3", text: "Story", "checked": false}],
            genders: [{"value": "-1", "text": "All", "selected": false}, {
               "value": "1",
               "text": "Male",
               "selected": false
            }, {"value": "2", "text": "Female", "selected": false}],
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
      components: {SearchHint, ProductItem, Loading},
      computed: {
         isLoggedIn() {
            return authService.getCurrentUser();
         },
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
            let tmpQuery = "";
            let tmpArr = [];
            this.niches.forEach(nich => {
               if (nich.checked) {
                  tmpArr.push(`${nich.text.replace(/\s&\s/g, "_")}`)
               }
            });
            if (tmpArr.length) qb.n = tmpArr.join(":"); // { n } for niches
            tmpQuery = "";
            tmpArr = [];
            this.categories.forEach(cat => {
               if (cat.checked) {
                  tmpArr.push(cat.text)
               }
            })
            if (tmpArr.length) qb.cat = tmpArr.join(":"); // { cat } for categories
            let queryString = "";
            for (var key in qb) {
               queryString += `${encodeURI(key)}=${encodeURI(qb[key])}&`
            }
            if (queryString) {
               // prepend quotation mark and remove unnecessary ampersand in the end
               queryString = `?${queryString.substr(0, queryString.length - 1)}`
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
            if (this.filter.username) {
               httpService.get(`/instaaccounts` + this.queryBuilder).then((res) => {
                  if (res.data.data && res.data.data.length) {
                     this.searchHints = res.data.data.slice(0, 5)
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