<template>
   <div>
      <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                   style="min-height: 200px; background-image: url(/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
         <!-- Mask -->
         <span class="mask bg-gradient-success opacity-8"></span>
         <!-- Header container -->
      </base-header>
      <div class="container-fluid mt--150 vld-parent">
         <loading
            :active="loading"
            :is-full-page="false"
            loader="dots"
            color="#5e72e4"/>
         <div class="row" v-if="user">
            <div class="col-12">
               <div class="card shadow">
                  <div class="card-header">
                     <h3>User: {{user.name}}</h3>
                  </div>
                  <div class="card-body">
                     <form role="form" class="form">
                        <div class="row">
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Full Name
                                 </label>
                                 <input class="form-control" v-model="user.name" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Email
                                 </label>
                                 <input class="form-control" v-model="user.email" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Gender
                                 </label>
                                 <select class="form-control" v-model="user.gender">
                                    <option v-for="(gender, index) in genders" :value="gender.value" :key="index">{{gender.text}}</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Country
                                 </label>
                                 <select class="form-control" v-model="user.country">
                                    <option v-for="(country, index) in countries" :value="country.text" :key="index">{{country.text}}</option>
                                 </select>
                              </div>
                           </div>
                           <template v-if="user.role !== 'admin'">
                              <div class="col-12 col-md-6">
                                 <div class="form-group has-label">
                                    <label class="form-control-label">
                                       Password
                                    </label>
                                    <input class="form-control" v-model="model.password" type="password" placeholder="************" @change="passwordChanged=true">
                                 </div>
                              </div>
                              <div class="col-12 col-md-6" v-if="passwordChanged">
                                 <div class="form-group has-label">
                                    <label class="form-control-label">
                                       Password Confirmation
                                    </label>
                                    <input class="form-control" v-model="model.password_confirm"  type="password">
                                 </div>
                              </div>
                           </template>
                           <div class="col-12 col-md-6">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Paypal Email
                                 </label>
                                 <input class="form-control" v-model="user.paypal_email" type="text">
                              </div>
                           </div>
                           <div class="col-12 col-md-6" v-if="user.role !== 'admin'">
                              <div class="form-group has-label">
                                 <label class="form-control-label">
                                    Verified
                                 </label>
                                 <select class="form-control" v-model="user.verified">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
                  <div class="card-footer d-flex justify-content-end">
                     <button class="btn btn-default" @click="historyBack">Back</button>
                     <button class="btn btn-primary" disabled v-if="saving">Saving...</button>
                     <button class="btn btn-primary" v-else @click="saveUser">Save</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import httpService from "../services/http"
   import Loading from 'vue-loading-overlay'
   import {$n, historyBack} from '../helper'

   export default {
      name: 'edit-user',
      components: {
         Loading
      },
      data() {
         return {
            loading: true,
            saving: false,
            user: null,
            passwordChanged: false,
            model: {
               password: '',
               password_confirm: ''
            },
            genders: [
               {value: "0", text: 'Select Gender'},
               {value: "male", text: 'Male'},
               {value: "female", text: 'Female'},
            ],
            countries: [{"value": "0", "text": ('Select Country')}, {
               "value": "Afghanistan",
               "text": "Afghanistan"
            }, {"value": "Albania", "text": "Albania"},
               {"value": "Algeria", "text": "Algeria"}, {
                  "value": "American Samoa",
                  "text": "American Samoa"
               }, {"value": "Andorra", "text": "Andorra"},
               {"value": "Angola", "text": "Angola"}, {"value": "Anguilla", "text": "Anguilla"}, {
                  "value": "Antarctica",
                  "text": "Antarctica"
               }
               , {"value": "Antigua and Barbuda", "text": "Antigua and Barbuda"}, {
                  "value": "Argentina",
                  "text": "Argentina"
               }, {"value": "Armenia", "text": "Armenia"},
               {"value": "Aruba", "text": "Aruba"}, {"value": "Australia", "text": "Australia"}, {
                  "value": "Austria",
                  "text": "Austria"
               }, {"value": "Azerbaijan", "text": "Azerbaijan"},
               {"value": "Bahamas", "text": "Bahamas"}, {"value": "Bahrain", "text": "Bahrain"}, {
                  "value": "Bangladesh",
                  "text": "Bangladesh"
               }, {"value": "Barbados", "text": "Barbados"},
               {"value": "Belarus", "text": "Belarus"}, {"value": "Belgium", "text": "Belgium"}, {
                  "value": "Belize",
                  "text": "Belize"
               }, {"value": "Benin", "text": "Benin"},
               {"value": "Bermuda", "text": "Bermuda"}, {"value": "Bhutan", "text": "Bhutan"}, {
                  "value": "Bolivia",
                  "text": "Bolivia"
               }, {"value": "Bosnia and Herzegowina", "text": "Bosnia and Herzegowina"},
               {"value": "Botswana", "text": "Botswana"}, {
                  "value": "Bouvet Island",
                  "text": "Bouvet Island"
               }, {"value": "Brazil", "text": "Brazil"},
               {
                  "value": "British Indian Ocean Territory",
                  "text": "British Indian Ocean Territory"
               }, {"value": "Brunei Darussalam", "text": "Brunei Darussalam"},
               {"value": "Bulgaria", "text": "Bulgaria"}, {
                  "value": "Burkina Faso",
                  "text": "Burkina Faso"
               }, {"value": "Burundi", "text": "Burundi"},
               {"value": "Cambodia", "text": "Cambodia"}, {"value": "Cameroon", "text": "Cameroon"}, {
                  "value": "Canada",
                  "text": "Canada"
               }, {"value": "Cape Verde", "text": "Cape Verde"},
               {"value": "Cayman Islands", "text": "Cayman Islands"}, {
                  "value": "Central African Republic",
                  "text": "Central African Republic"
               }, {"value": "Chad", "text": "Chad"},
               {"value": "Chile", "text": "Chile"}, {"value": "China", "text": "China"}, {
                  "value": "Christmas Island",
                  "text": "Christmas Island"
               },
               {"value": "Cocos (Keeling) Islands", "text": "Cocos (Keeling) Islands"}, {
                  "value": "Colombia",
                  "text": "Colombia"
               }, {"value": "Comoros", "text": "Comoros"},
               {"value": "Congo", "text": "Congo"}, {
                  "value": "Congo, the Democratic Republic of the",
                  "text": "Congo, the Democratic Republic of the"
               },
               {"value": "Cook Islands", "text": "Cook Islands"}, {
                  "value": "Costa Rica",
                  "text": "Costa Rica"
               }, {"value": "Cote d'Ivoire", "text": "Cote d'Ivoire"},
               {"value": "Croatia (Hrvatska)", "text": "Croatia (Hrvatska)"}, {
                  "value": "Cuba",
                  "text": "Cuba"
               }, {"value": "Cyprus", "text": "Cyprus"}, {"value": "Czech Republic", "text": "Czech Republic"},
               {"value": "Denmark", "text": "Denmark"}, {"value": "Djibouti", "text": "Djibouti"}, {
                  "value": "Dominica",
                  "text": "Dominica"
               }, {"value": "Dominican Republic", "text": "Dominican Republic"},
               {"value": "East Timor", "text": "East Timor"}, {
                  "value": "Ecuador",
                  "text": "Ecuador"
               }, {"value": "Egypt", "text": "Egypt"}, {"value": "El Salvador", "text": "El Salvador"},
               {"value": "Equatorial Guinea", "text": "Equatorial Guinea"}, {
                  "value": "Eritrea",
                  "text": "Eritrea"
               }, {"value": "Estonia", "text": "Estonia"}, {"value": "Ethiopia", "text": "Ethiopia"},
               {
                  "value": "Falkland Islands (Malvinas)",
                  "text": "Falkland Islands (Malvinas)"
               }, {"value": "Faroe Islands", "text": "Faroe Islands"}, {"value": "Fiji", "text": "Fiji"}
               , {"value": "Finland", "text": "Finland"}, {
                  "value": "France",
                  "text": "France"
               }, {"value": "France, Metropolitan", "text": "France, Metropolitan"}
               , {"value": "French Guiana", "text": "French Guiana"}, {
                  "value": "French Polynesia",
                  "text": "French Polynesia"
               },
               {"value": "French Southern Territories", "text": "French Southern Territories"}, {
                  "value": "Gabon",
                  "text": "Gabon"
               },
               {"value": "Gambia", "text": "Gambia"}, {"value": "Georgia", "text": "Georgia"}, {
                  "value": "Germany",
                  "text": "Germany"
               },
               {"value": "Ghana", "text": "Ghana"}, {"value": "Gibraltar", "text": "Gibraltar"}, {
                  "value": "Greece",
                  "text": "Greece"
               },
               {"value": "Greenland", "text": "Greenland"}, {
                  "value": "Grenada",
                  "text": "Grenada"
               }, {"value": "Guadeloupe", "text": "Guadeloupe"},
               {"value": "Guam", "text": "Guam"}, {"value": "Guatemala", "text": "Guatemala"}, {
                  "value": "Guinea",
                  "text": "Guinea"
               }, {"value": "Guinea-Bissau", "text": "Guinea-Bissau"},
               {"value": "Guyana", "text": "Guyana"}, {
                  "value": "Haiti",
                  "text": "Haiti"
               }, {"value": "Heard and Mc Donald Islands", "text": "Heard and Mc Donald Islands"},
               {
                  "value": "Holy See (Vatican City State)",
                  "text": "Holy See (Vatican City State)"
               }, {"value": "Honduras", "text": "Honduras"}, {"value": "Hong Kong", "text": "Hong Kong"},
               {"value": "Hungary", "text": "Hungary"}, {"value": "Iceland", "text": "Iceland"}, {
                  "value": "India",
                  "text": "India"
               }, {"value": "Indonesia", "text": "Indonesia"},
               {"value": "Iran (Islamic Republic of)", "text": "Iran (Islamic Republic of)"}, {
                  "value": "Iraq",
                  "text": "Iraq"
               }, {"value": "Ireland", "text": "Ireland"},
               {"value": "Israel", "text": "Israel"}, {"value": "Italy", "text": "Italy"}, {
                  "value": "Jamaica",
                  "text": "Jamaica"
               }, {"value": "Japan", "text": "Japan"},
               {"value": "Jordan", "text": "Jordan"}, {"value": "Kazakhstan", "text": "Kazakhstan"}, {
                  "value": "Kenya",
                  "text": "Kenya"
               }, {"value": "Kiribati", "text": "Kiribati"}
               , {
                  "value": "Democratic People's Republic of Korea",
                  "text": "Democratic People's Republic of Korea"
               }, {"value": "Republic of Korea", "text": "Republic of Korea"},
               {"value": "Kuwait", "text": "Kuwait"}, {
                  "value": "Kyrgyzstan",
                  "text": "Kyrgyzstan"
               }, {"value": "Lao People's Democratic Republic", "text": "Lao People's Democratic Republic"}
               , {"value": "Latvia", "text": "Latvia"}, {"value": "Lebanon", "text": "Lebanon"}, {
                  "value": "Lesotho",
                  "text": "Lesotho"
               }, {"value": "Liberia", "text": "Liberia"},
               {"value": "Libyan Arab Jamahiriya", "text": "Libyan Arab Jamahiriya"}, {
                  "value": "Liechtenstein",
                  "text": "Liechtenstein"
               }, {"value": "Lithuania", "text": "Lithuania"},
               {"value": "Luxembourg", "text": "Luxembourg"}, {"value": "Macau", "text": "Macau"},
               {
                  "value": "Macedonia, The Former Yugoslav Republic of",
                  "text": "Macedonia, The Former Yugoslav Republic of"
               },
               {"value": "Madagascar", "text": "Madagascar"}, {
                  "value": "Malawi",
                  "text": "Malawi"
               }, {"value": "Malaysia", "text": "Malaysia"},
               {"value": "Maldives", "text": "Maldives"}, {"value": "Mali", "text": "Mali"}, {
                  "value": "Malta",
                  "text": "Malta"
               }, {"value": "Marshall Islands", "text": "Marshall Islands"},
               {"value": "Martinique", "text": "Martinique"}, {
                  "value": "Mauritania",
                  "text": "Mauritania"
               }, {"value": "Mauritius", "text": "Mauritius"}, {"value": "Mayotte", "text": "Mayotte"},
               {"value": "Mexico", "text": "Mexico"}, {
                  "value": "Micronesia, Federated States of",
                  "text": "Micronesia, Federated States of"
               },
               {"value": "Moldova, Republic of", "text": "Moldova, Republic of"}, {
                  "value": "Monaco",
                  "text": "Monaco"
               }, {"value": "Mongolia", "text": "Mongolia"},
               {"value": "Montserrat", "text": "Montserrat"}, {
                  "value": "Morocco",
                  "text": "Morocco"
               }, {"value": "Mozambique", "text": "Mozambique"}, {"value": "Myanmar", "text": "Myanmar"},
               {"value": "Namibia", "text": "Namibia"}, {"value": "Nauru", "text": "Nauru"}, {
                  "value": "Nepal",
                  "text": "Nepal"
               }, {"value": "Netherlands", "text": "Netherlands"},
               {"value": "Netherlands Antilles", "text": "Netherlands Antilles"}, {
                  "value": "New Caledonia",
                  "text": "New Caledonia"
               }, {"value": "New Zealand", "text": "New Zealand"},
               {"value": "Nicaragua", "text": "Nicaragua"}, {"value": "Niger", "text": "Niger"}, {
                  "value": "Nigeria",
                  "text": "Nigeria"
               }, {"value": "Niue", "text": "Niue"},
               {"value": "Norfolk Island", "text": "Norfolk Island"}, {
                  "value": "Northern Mariana Islands",
                  "text": "Northern Mariana Islands"
               }, {"value": "Norway", "text": "Norway"},
               {"value": "Oman", "text": "Oman"}, {"value": "Pakistan", "text": "Pakistan"}, {
                  "value": "Palau",
                  "text": "Palau"
               }, {"value": "Panama", "text": "Panama"},
               {"value": "Papua New Guinea", "text": "Papua New Guinea"}, {
                  "value": "Paraguay",
                  "text": "Paraguay"
               }, {"value": "Peru", "text": "Peru"}, {"value": "Philippines", "text": "Philippines"},
               {"value": "Pitcairn", "text": "Pitcairn"}, {"value": "Poland", "text": "Poland"}, {
                  "value": "Portugal",
                  "text": "Portugal"
               }, {"value": "Puerto Rico", "text": "Puerto Rico"},
               {"value": "Qatar", "text": "Qatar"}, {"value": "Reunion", "text": "Reunion"}, {
                  "value": "Romania",
                  "text": "Romania"
               }, {"value": "Russian Federation", "text": "Russian Federation"},
               {"value": "Rwanda", "text": "Rwanda"}, {
                  "value": "Saint Kitts and Nevis",
                  "text": "Saint Kitts and Nevis"
               }, {"value": "Saint LUCIA", "text": "Saint LUCIA"},
               {
                  "value": "Saint Vincent and the Grenadines",
                  "text": "Saint Vincent and the Grenadines"
               }, {"value": "Samoa", "text": "Samoa"}, {"value": "San Marino", "text": "San Marino"},
               {"value": "Sao Tome and Principe", "text": "Sao Tome and Principe"}, {
                  "value": "Saudi Arabia",
                  "text": "Saudi Arabia"
               }, {"value": "Senegal", "text": "Senegal"},
               {"value": "Seychelles", "text": "Seychelles"}, {
                  "value": "Sierra Leone",
                  "text": "Sierra Leone"
               }, {"value": "Singapore", "text": "Singapore"},
               {"value": "Slovakia (Slovak Republic)", "text": "Slovakia (Slovak Republic)"}, {
                  "value": "Slovenia",
                  "text": "Slovenia"
               }, {"value": "Solomon Islands", "text": "Solomon Islands"},
               {"value": "Somalia", "text": "Somalia"}, {"value": "South Africa", "text": "South Africa"},
               {
                  "value": "South Georgia and the South Sandwich Islands",
                  "text": "South Georgia and the South Sandwich Islands"
               }, {"value": "Spain", "text": "Spain"},
               {"value": "Sri Lanka", "text": "Sri Lanka"}, {
                  "value": "St. Helena",
                  "text": "St. Helena"
               }, {"value": "St. Pierre and Miquelon", "text": "St. Pierre and Miquelon"},
               {"value": "Sudan", "text": "Sudan"}, {
                  "value": "Suriname",
                  "text": "Suriname"
               }, {"value": "Svalbard and Jan Mayen Islands", "text": "Svalbard and Jan Mayen Islands"},
               {"value": "Swaziland", "text": "Swaziland"}, {
                  "value": "Sweden",
                  "text": "Sweden"
               }, {"value": "Switzerland", "text": "Switzerland"},
               {"value": "Syrian Arab Republic", "text": "Syrian Arab Republic"}, {
                  "value": "Taiwan, Province of China",
                  "text": "Taiwan, Province of China"
               },
               {"value": "Tajikistan", "text": "Tajikistan"}, {
                  "value": "Tanzania, United Republic of",
                  "text": "Tanzania, United Republic of"
               }, {"value": "Thailand", "text": "Thailand"},
               {"value": "Togo", "text": "Togo"}, {"value": "Tokelau", "text": "Tokelau"}, {
                  "value": "Tonga",
                  "text": "Tonga"
               }, {"value": "Trinidad and Tobago", "text": "Trinidad and Tobago"},
               {"value": "Tunisia", "text": "Tunisia"}, {"value": "Turkey", "text": "Turkey"}, {
                  "value": "Turkmenistan",
                  "text": "Turkmenistan"
               },
               {"value": "Turks and Caicos Islands", "text": "Turks and Caicos Islands"}, {
                  "value": "Tuvalu",
                  "text": "Tuvalu"
               }, {"value": "Uganda", "text": "Uganda"},
               {"value": "Ukraine", "text": "Ukraine"}, {
                  "value": "United Arab Emirates",
                  "text": "United Arab Emirates"
               }, {"value": "United Kingdom", "text": "United Kingdom"},
               {"value": "United States", "text": "United States"}, {
                  "value": "United States Minor Outlying Islands",
                  "text": "United States Minor Outlying Islands"
               },
               {"value": "Uruguay", "text": "Uruguay"}, {
                  "value": "Uzbekistan",
                  "text": "Uzbekistan"
               }, {"value": "Vanuatu", "text": "Vanuatu"}, {"value": "Venezuela", "text": "Venezuela"},
               {"value": "Viet Nam", "text": "Viet Nam"}, {
                  "value": "Virgin Islands (British)",
                  "text": "Virgin Islands (British)"
               },
               {
                  "value": "Virgin Islands (U.S.)",
                  "text": "Virgin Islands (U.S.)"
               }, {"value": "Wallis and Futuna Islands", "text": "Wallis and Futuna Islands"},
               {"value": "Western Sahara", "text": "Western Sahara"}, {
                  "value": "Yemen",
                  "text": "Yemen"
               }, {"value": "Yugoslavia", "text": "Yugoslavia"}, {"value": "Zambia", "text": "Zambia"},
               {"value": "Zimbabwe", "text": "Zimbabwe"}],
         }
      },
      methods: {
         historyBack,
         updateData: function () {
            this.loading = true
            return httpService.get(`/users/${this.$route.params.id}`).then(res => {
               this.user = res.data.data
            }).catch(e => {
               this.$noty.error("Cannot read user data")
            })
         },
         saveUser: function() {
            this.$swal({
               title: 'Are you sure?',
               showCancelButton: true
            }).then(result => {
               if (result.value) {
                  if(this.passwordChanged) {
                     if(!this.model.password) {
                        return this.$noty.error("Please input a valid password!")
                     }
                     if(this.model.password != this.model.password_confirm) {
                        return this.$noty.error("Password mismatch!")
                     }
                     if(this.model.password.length < 6) {
                        return this.$noty.error("Password is too short!")
                     }
                     this.user.password = this.model.password
                  }
                  this.saving = true
                  httpService.put(`/users/${this.$route.params.id}`, this.user).then(res => {
                     this.$noty.success("User saved")
                     this.user = res.data.data
                  }).catch(e => {
                     this.$noty.error("Cannot save user data")
                  }).finally(() => {
                     this.saving = false
                  })
               }
            })
         }
      },
      mounted() {
         this.updateData().finally(() => {
            this.loading = false
         })
      }
   }
</script>