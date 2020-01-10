<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-primary">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <form role="form">
                                <h3 class="text-center">{{$t("Sign Up")}}</h3>
                                <hr class="hr-primary short">
                                <base-input alternative
                                            class="mb-3"
                                            addon-left-icon="ni ni-hat-3"
                                            :error="error.full_name">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="name"
                                                :placeholder="$t('Full Name')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            :placeholder="$t('Email')"
                                            addon-left-icon="ni ni-email-83"
                                            :error="error.email">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="email"
                                                :placeholder="$t('Email')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            type="password"
                                            :placeholder="$t('Password')"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            :error="error.password">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="password"
                                                :placeholder="$t('Password')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            type="password"
                                            :placeholder="$t('Confirm Password')"
                                            addon-left-icon="ni ni-check-bold"
                                            :error="error.confirm">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="confirm_pass"
                                                :placeholder="$t('Confirm Password')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            type="select"
                                            :optionlist="genders"
                                            addon-left-icon="ni ni-circle-08"
                                            :error="error.gender">
                                    <template v-slot:slot_input>
                                        <select
                                                class="form-control"
                                                aria-describedby="addon-right addon-left"
                                                v-model="gender">
                                            <option value="0">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </template>
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            type="select"
                                            :optionlist="countries"
                                            addon-left-icon="ni ni-world"
                                            :error="error.country">
                                    <template v-slot:slot_input>
                                        <select
                                                class="form-control"
                                                aria-describedby="addon-right addon-left"
                                                v-model="country">
                                            <option v-for="(option, index) in countries"
                                                    :key="index"
                                                    v-bind:value="option.value">
                                                {{$t(option.text)}}
                                            </option>
                                        </select>
                                    </template>
                                </base-input>
                                <base-input
                                            alternative
                                            class="mb-3"
                                            :placeholder="$t('PayPal E-mail (optional)')"
                                            addon-left-icon="ni ni-credit-card"
                                            type="text"
                                            :error="error.paypal_email">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="paypal_email"
                                                :placeholder="$t('PayPal E-mail (optional)')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>
                                </base-input>
                                <base-input
                                            alternative
                                            class="mb-3"
                                            :placeholder="$t('Referral Code (optional)')"
                                            addon-left-icon="ni ni-like-2"
                                            type="text"
                                            :error="error.referral_code">
                                    <template v-slot:slot_input>
                                        <input
                                                v-model="referral_code"
                                                :placeholder="$t('Referral Code (optional)')"
                                                class="form-control"
                                                aria-describedby="addon-right addon-left">
                                    </template>

                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4 w-100" @click="onSubmit">{{$t("Sign Up")}}</base-button>
                                </div>
                                <div class="text-center">
                                    <p>{{$t("By sign up, you agree to our")}} <router-link to="/policy">{{$t("Privacy Policy")}}</router-link> {{$t("and")}} <router-link to="/tos">{{$t("Terms of Service")}}.</router-link></p>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
   export default {
      name: 'app-footer',
      data() {
         return {
            genders: [
                        { value: "0", text: 'Select Gender' },
                        { value: "male", text: 'Male' },
                        { value: "female", text: 'Female' },
                     ],
             error  : {
                 full_name  :   "",
                 email      :   "",
                 password   :   "",
                 confirm    :   "",
                 paypal_email:  "",
                 referral_code:  "",
                 country    :   "",
                 gender     :   ""
             },

             name   :   "",
             email  :   "",
             password:  "",
             confirm_pass:"",
             country:   "0",
             gender :   "0",
             paypal_email:"",
             referral_code:  "",
            countries: [{"value":"0","text":('Select Country')},{"value":"Afghanistan","text":"Afghanistan"},{"value":"Albania","text":"Albania"},
                {"value":"Algeria","text":"Algeria"},{"value":"American Samoa","text":"American Samoa"},{"value":"Andorra","text":"Andorra"},
                {"value":"Angola","text":"Angola"},{"value":"Anguilla","text":"Anguilla"},{"value":"Antarctica","text":"Antarctica"}
                ,{"value":"Antigua and Barbuda","text":"Antigua and Barbuda"},{"value":"Argentina","text":"Argentina"},{"value":"Armenia","text":"Armenia"},
                {"value":"Aruba","text":"Aruba"},{"value":"Australia","text":"Australia"},{"value":"Austria","text":"Austria"},{"value":"Azerbaijan","text":"Azerbaijan"},
                {"value":"Bahamas","text":"Bahamas"},{"value":"Bahrain","text":"Bahrain"},{"value":"Bangladesh","text":"Bangladesh"},{"value":"Barbados","text":"Barbados"},
                {"value":"Belarus","text":"Belarus"},{"value":"Belgium","text":"Belgium"},{"value":"Belize","text":"Belize"},{"value":"Benin","text":"Benin"},
                {"value":"Bermuda","text":"Bermuda"},{"value":"Bhutan","text":"Bhutan"},{"value":"Bolivia","text":"Bolivia"},{"value":"Bosnia and Herzegowina","text":"Bosnia and Herzegowina"},
                {"value":"Botswana","text":"Botswana"},{"value":"Bouvet Island","text":"Bouvet Island"},{"value":"Brazil","text":"Brazil"},
                {"value":"British Indian Ocean Territory","text":"British Indian Ocean Territory"},{"value":"Brunei Darussalam","text":"Brunei Darussalam"},
                {"value":"Bulgaria","text":"Bulgaria"},{"value":"Burkina Faso","text":"Burkina Faso"},{"value":"Burundi","text":"Burundi"},
                {"value":"Cambodia","text":"Cambodia"},{"value":"Cameroon","text":"Cameroon"},{"value":"Canada","text":"Canada"},{"value":"Cape Verde","text":"Cape Verde"},
                {"value":"Cayman Islands","text":"Cayman Islands"},{"value":"Central African Republic","text":"Central African Republic"},{"value":"Chad","text":"Chad"},
                {"value":"Chile","text":"Chile"},{"value":"China","text":"China"},{"value":"Christmas Island","text":"Christmas Island"},
                {"value":"Cocos (Keeling) Islands","text":"Cocos (Keeling) Islands"},{"value":"Colombia","text":"Colombia"},{"value":"Comoros","text":"Comoros"},
                {"value":"Congo","text":"Congo"},{"value":"Congo, the Democratic Republic of the","text":"Congo, the Democratic Republic of the"},
                {"value":"Cook Islands","text":"Cook Islands"},{"value":"Costa Rica","text":"Costa Rica"},{"value":"Cote d'Ivoire","text":"Cote d'Ivoire"},
                {"value":"Croatia (Hrvatska)","text":"Croatia (Hrvatska)"},{"value":"Cuba","text":"Cuba"},{"value":"Cyprus","text":"Cyprus"},{"value":"Czech Republic","text":"Czech Republic"},
                {"value":"Denmark","text":"Denmark"},{"value":"Djibouti","text":"Djibouti"},{"value":"Dominica","text":"Dominica"},{"value":"Dominican Republic","text":"Dominican Republic"},
                {"value":"East Timor","text":"East Timor"},{"value":"Ecuador","text":"Ecuador"},{"value":"Egypt","text":"Egypt"},{"value":"El Salvador","text":"El Salvador"},
                {"value":"Equatorial Guinea","text":"Equatorial Guinea"},{"value":"Eritrea","text":"Eritrea"},{"value":"Estonia","text":"Estonia"},{"value":"Ethiopia","text":"Ethiopia"},
                {"value":"Falkland Islands (Malvinas)","text":"Falkland Islands (Malvinas)"},{"value":"Faroe Islands","text":"Faroe Islands"},{"value":"Fiji","text":"Fiji"}
                ,{"value":"Finland","text":"Finland"},{"value":"France","text":"France"},{"value":"France, Metropolitan","text":"France, Metropolitan"}
                ,{"value":"French Guiana","text":"French Guiana"},{"value":"French Polynesia","text":"French Polynesia"},
                {"value":"French Southern Territories","text":"French Southern Territories"},{"value":"Gabon","text":"Gabon"},
                {"value":"Gambia","text":"Gambia"},{"value":"Georgia","text":"Georgia"},{"value":"Germany","text":"Germany"},
                {"value":"Ghana","text":"Ghana"},{"value":"Gibraltar","text":"Gibraltar"},{"value":"Greece","text":"Greece"},
                {"value":"Greenland","text":"Greenland"},{"value":"Grenada","text":"Grenada"},{"value":"Guadeloupe","text":"Guadeloupe"},
                {"value":"Guam","text":"Guam"},{"value":"Guatemala","text":"Guatemala"},{"value":"Guinea","text":"Guinea"},{"value":"Guinea-Bissau","text":"Guinea-Bissau"},
                {"value":"Guyana","text":"Guyana"},{"value":"Haiti","text":"Haiti"},{"value":"Heard and Mc Donald Islands","text":"Heard and Mc Donald Islands"},
                {"value":"Holy See (Vatican City State)","text":"Holy See (Vatican City State)"},{"value":"Honduras","text":"Honduras"},{"value":"Hong Kong","text":"Hong Kong"},
                {"value":"Hungary","text":"Hungary"},{"value":"Iceland","text":"Iceland"},{"value":"India","text":"India"},{"value":"Indonesia","text":"Indonesia"},
                {"value":"Iran (Islamic Republic of)","text":"Iran (Islamic Republic of)"},{"value":"Iraq","text":"Iraq"},{"value":"Ireland","text":"Ireland"},
                {"value":"Israel","text":"Israel"},{"value":"Italy","text":"Italy"},{"value":"Jamaica","text":"Jamaica"},{"value":"Japan","text":"Japan"},
                {"value":"Jordan","text":"Jordan"},{"value":"Kazakhstan","text":"Kazakhstan"},{"value":"Kenya","text":"Kenya"},{"value":"Kiribati","text":"Kiribati"}
                ,{"value":"Democratic People's Republic of Korea","text":"Democratic People's Republic of Korea"},{"value":"Republic of Korea","text":"Republic of Korea"},
                {"value":"Kuwait","text":"Kuwait"},{"value":"Kyrgyzstan","text":"Kyrgyzstan"},{"value":"Lao People's Democratic Republic","text":"Lao People's Democratic Republic"}
                ,{"value":"Latvia","text":"Latvia"},{"value":"Lebanon","text":"Lebanon"},{"value":"Lesotho","text":"Lesotho"},{"value":"Liberia","text":"Liberia"},
                {"value":"Libyan Arab Jamahiriya","text":"Libyan Arab Jamahiriya"},{"value":"Liechtenstein","text":"Liechtenstein"},{"value":"Lithuania","text":"Lithuania"},
                {"value":"Luxembourg","text":"Luxembourg"},{"value":"Macau","text":"Macau"},
                {"value":"Macedonia, The Former Yugoslav Republic of","text":"Macedonia, The Former Yugoslav Republic of"},
                {"value":"Madagascar","text":"Madagascar"},{"value":"Malawi","text":"Malawi"},{"value":"Malaysia","text":"Malaysia"},
                {"value":"Maldives","text":"Maldives"},{"value":"Mali","text":"Mali"},{"value":"Malta","text":"Malta"},{"value":"Marshall Islands","text":"Marshall Islands"},
                {"value":"Martinique","text":"Martinique"},{"value":"Mauritania","text":"Mauritania"},{"value":"Mauritius","text":"Mauritius"},{"value":"Mayotte","text":"Mayotte"},
                {"value":"Mexico","text":"Mexico"},{"value":"Micronesia, Federated States of","text":"Micronesia, Federated States of"},
                {"value":"Moldova, Republic of","text":"Moldova, Republic of"},{"value":"Monaco","text":"Monaco"},{"value":"Mongolia","text":"Mongolia"},
                {"value":"Montserrat","text":"Montserrat"},{"value":"Morocco","text":"Morocco"},{"value":"Mozambique","text":"Mozambique"},{"value":"Myanmar","text":"Myanmar"},
                {"value":"Namibia","text":"Namibia"},{"value":"Nauru","text":"Nauru"},{"value":"Nepal","text":"Nepal"},{"value":"Netherlands","text":"Netherlands"},
                {"value":"Netherlands Antilles","text":"Netherlands Antilles"},{"value":"New Caledonia","text":"New Caledonia"},{"value":"New Zealand","text":"New Zealand"},
                {"value":"Nicaragua","text":"Nicaragua"},{"value":"Niger","text":"Niger"},{"value":"Nigeria","text":"Nigeria"},{"value":"Niue","text":"Niue"},
                {"value":"Norfolk Island","text":"Norfolk Island"},{"value":"Northern Mariana Islands","text":"Northern Mariana Islands"},{"value":"Norway","text":"Norway"},
                {"value":"Oman","text":"Oman"},{"value":"Pakistan","text":"Pakistan"},{"value":"Palau","text":"Palau"},{"value":"Panama","text":"Panama"},
                {"value":"Papua New Guinea","text":"Papua New Guinea"},{"value":"Paraguay","text":"Paraguay"},{"value":"Peru","text":"Peru"},{"value":"Philippines","text":"Philippines"},
                {"value":"Pitcairn","text":"Pitcairn"},{"value":"Poland","text":"Poland"},{"value":"Portugal","text":"Portugal"},{"value":"Puerto Rico","text":"Puerto Rico"},
                {"value":"Qatar","text":"Qatar"},{"value":"Reunion","text":"Reunion"},{"value":"Romania","text":"Romania"},{"value":"Russian Federation","text":"Russian Federation"},
                {"value":"Rwanda","text":"Rwanda"},{"value":"Saint Kitts and Nevis","text":"Saint Kitts and Nevis"},{"value":"Saint LUCIA","text":"Saint LUCIA"},
                {"value":"Saint Vincent and the Grenadines","text":"Saint Vincent and the Grenadines"},{"value":"Samoa","text":"Samoa"},{"value":"San Marino","text":"San Marino"},
                {"value":"Sao Tome and Principe","text":"Sao Tome and Principe"},{"value":"Saudi Arabia","text":"Saudi Arabia"},{"value":"Senegal","text":"Senegal"},
                {"value":"Seychelles","text":"Seychelles"},{"value":"Sierra Leone","text":"Sierra Leone"},{"value":"Singapore","text":"Singapore"},
                {"value":"Slovakia (Slovak Republic)","text":"Slovakia (Slovak Republic)"},{"value":"Slovenia","text":"Slovenia"},{"value":"Solomon Islands","text":"Solomon Islands"},
                {"value":"Somalia","text":"Somalia"},{"value":"South Africa","text":"South Africa"},
                {"value":"South Georgia and the South Sandwich Islands","text":"South Georgia and the South Sandwich Islands"},{"value":"Spain","text":"Spain"},
                {"value":"Sri Lanka","text":"Sri Lanka"},{"value":"St. Helena","text":"St. Helena"},{"value":"St. Pierre and Miquelon","text":"St. Pierre and Miquelon"},
                {"value":"Sudan","text":"Sudan"},{"value":"Suriname","text":"Suriname"},{"value":"Svalbard and Jan Mayen Islands","text":"Svalbard and Jan Mayen Islands"},
                {"value":"Swaziland","text":"Swaziland"},{"value":"Sweden","text":"Sweden"},{"value":"Switzerland","text":"Switzerland"},
                {"value":"Syrian Arab Republic","text":"Syrian Arab Republic"},{"value":"Taiwan, Province of China","text":"Taiwan, Province of China"},
                {"value":"Tajikistan","text":"Tajikistan"},{"value":"Tanzania, United Republic of","text":"Tanzania, United Republic of"},{"value":"Thailand","text":"Thailand"},
                {"value":"Togo","text":"Togo"},{"value":"Tokelau","text":"Tokelau"},{"value":"Tonga","text":"Tonga"},{"value":"Trinidad and Tobago","text":"Trinidad and Tobago"},
                {"value":"Tunisia","text":"Tunisia"},{"value":"Turkey","text":"Turkey"},{"value":"Turkmenistan","text":"Turkmenistan"},
                {"value":"Turks and Caicos Islands","text":"Turks and Caicos Islands"},{"value":"Tuvalu","text":"Tuvalu"},{"value":"Uganda","text":"Uganda"},
                {"value":"Ukraine","text":"Ukraine"},{"value":"United Arab Emirates","text":"United Arab Emirates"},{"value":"United Kingdom","text":"United Kingdom"},
                {"value":"United States","text":"United States"},{"value":"United States Minor Outlying Islands","text":"United States Minor Outlying Islands"},
                {"value":"Uruguay","text":"Uruguay"},{"value":"Uzbekistan","text":"Uzbekistan"},{"value":"Vanuatu","text":"Vanuatu"},{"value":"Venezuela","text":"Venezuela"},
                {"value":"Viet Nam","text":"Viet Nam"},{"value":"Virgin Islands (British)","text":"Virgin Islands (British)"},
                {"value":"Virgin Islands (U.S.)","text":"Virgin Islands (U.S.)"},{"value":"Wallis and Futuna Islands","text":"Wallis and Futuna Islands"},
                {"value":"Western Sahara","text":"Western Sahara"},{"value":"Yemen","text":"Yemen"},{"value":"Yugoslavia","text":"Yugoslavia"},{"value":"Zambia","text":"Zambia"},
                {"value":"Zimbabwe","text":"Zimbabwe"}],
         }
      },
       watch  : {
           name(value){
               if(!value){
                   this.error.full_name="Please input full name";
               }else{
                   this.error.full_name="";
               }
           },
           email(value) {
               if(!value){
                   this.error.email="Please input full name";
               }else{
                   this.error.email="";
               }
           },
           password(value){
               if(!value){
                   this.error.password="Please input password";
               }else{
                   this.error.email="";
               }
           },
           confirm_pass(value){
               if(!value) {
                   this.error.confirm = "Please confirm password";
               }else if(value !== this.password){
                   this.error.confirm = "Confirm password is not match";
               }else{
                   this.error.confirm = "";
               }
           },
           paypal_email(value){
               //some validation for paypal email
           },
           country(value){
               if(!value || value === "0"){
                   this.error.country = "Plaase select country";
               }else{
                   this.error.coutry = "";
               }
           },
           gender(value){
               if(!value || value === "0"){
                   this.error.gender = "Please select gender";
               }else{
                   this.error.gender = "";
               }
           }
       },
       methods  :   {
          onSubmit(){
              if(!this.validation()) return;
              console.log("onSubmit");
              this.$store.dispatch("auth/register", {
                  name  :   this.name,
                  email :   this.email,
                  password  :   this.password,
                  country   :   this.country,
                  gender    :   this.gender,
                  paypal_email: this.paypal_email,
              })
          },
           validation(){
              if(!this.name || !this.email || !this.password || !this.confirm_pass || !this.gender || !this.country){
                  console.log("1");
                  return false;
              }
              console.log("2");
               return (!this.error.full_name && !this.error.password && !this.error.password && !this.error.gender
                   && !this.error.country && !this.error.referral_code && !this.error.paypal_email);

           }
       }
   };
</script>
<style>
</style>
