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
                           <input
                              v-model="name"
                              :placeholder="$t('Full Name')"
                              class="form-control"
                              aria-describedby="addon-right addon-left">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    :placeholder="$t('Email')"
                                    addon-left-icon="ni ni-email-83"
                                    :error="error.email">
                           <input
                              v-model="email"
                              :placeholder="$t('Email')"
                              class="form-control"
                              aria-describedby="addon-right addon-left">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    type="password"
                                    :placeholder="$t('Password')"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    :error="error.password">
                           <template>
                              <input
                                 v-model="password"
                                 :placeholder="$t('Password')"
                                 class="form-control"
                                 type="password"
                                 aria-describedby="addon-right addon-left">
                           </template>
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    type="password"
                                    :placeholder="$t('Confirm Password')"
                                    addon-left-icon="ni ni-check-bold"
                                    :error="error.confirm">
                           <input
                              v-model="confirm_pass"
                              :placeholder="$t('Confirm Password')"
                              class="form-control"
                              type="password"
                              aria-describedby="addon-right addon-left">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    type="select"
                                    :optionlist="genders"
                                    addon-left-icon="ni ni-circle-08"
                                    :error="error.gender">
                           <select
                              class="form-control"
                              aria-describedby="addon-right addon-left"
                              v-model="gender">
                              <option value="0">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                           </select>
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    type="select"
                                    :optionlist="countries"
                                    addon-left-icon="ni ni-world"
                                    :error="error.country">
                           <select
                              class="form-control"
                              aria-describedby="addon-right addon-left"
                              v-model="country">
                              <option v-for="(option, index) in countries"
                                      :key="index"
                                      v-bind:value="option.value">
                                 {{option.text}}
                              </option>
                           </select>
                        </base-input>
                        <base-input
                           alternative
                           class="mb-3"
                           :placeholder="$t('PayPal E-mail (optional)')"
                           addon-left-icon="ni ni-credit-card"
                           type="text"
                           :error="error.paypal_email">
                           <input
                              v-model="paypal_email"
                              :placeholder="$t('PayPal E-mail (optional)')"
                              class="form-control"
                              aria-describedby="addon-right addon-left">
                        </base-input>
                        <base-input
                           alternative
                           class="mb-3"
                           :placeholder="$t('Referral Code (optional)')"
                           addon-left-icon="ni ni-like-2"
                           type="text"
                           :error="error.referral_code">
                           <input
                              v-model="referral_code"
                              :placeholder="$t('Referral Code (optional)')"
                              class="form-control"
                              aria-describedby="addon-right addon-left">

                        </base-input>
                        <div class="text-center">
                           <base-button type="primary" class="my-4 w-100" @click="onSubmit">{{$t("Sign Up")}}
                           </base-button>
                        </div>
                        <div class="text-center">
                           <p>{{$t("By sign up, you agree to our")}}
                              <router-link to="/policy">{{$t("Privacy Policy")}}</router-link>
                              {{$t("and")}}
                              <router-link to="/terms">{{$t("Terms of Service")}}.</router-link>
                           </p>
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
   import httpService from '../services/http.service'
   import countries from '../config/countries'
   export default {
      name: 'app-footer',
      data() {
         return {
            genders: [
               {value: "0", text: 'Select Gender'},
               {value: "male", text: 'Male'},
               {value: "female", text: 'Female'},
            ],
            error: {
               full_name: "",
               email: "",
               password: "",
               confirm: "",
               paypal_email: "",
               referral_code: "",
               country: "",
               gender: ""
            },

            name: "",
            email: "",
            password: "",
            confirm_pass: "",
            country: "0",
            gender: "0",
            paypal_email: "",
            referral_code: "",
            countries: [{"value": "0", "text": ('Select Country')}, ...countries.map(c => { return { value: c, text: c } })],
         }
      },
      watch: {
         name(value) {
            if (!value) {
               this.error.full_name = "Please input full name";
            } else {
               this.error.full_name = "";
            }
         },
         email(value) {
            if (!value) {
               this.error.email = "Please input full name";
            } else {
               this.error.email = "";
            }
         },
         password(value) {
            if (!value) {
               this.error.password = "Please input password";
            } else {
               this.error.email = "";
            }
         },
         confirm_pass(value) {
            if (!value) {
               this.error.confirm = "Please confirm password";
            } else if (value !== this.password) {
               this.error.confirm = "Confirm password is not match";
            } else {
               this.error.confirm = "";
            }
         },
         paypal_email(value) {
            //some validation for paypal email
         },
         country(value) {
            if (!value || value === "0") {
               this.error.country = "Plaase select country";
            } else {
               this.error.coutry = "";
            }
         },
         gender(value) {
            if (!value || value === "0") {
               this.error.gender = "Please select gender";
            } else {
               this.error.gender = "";
            }
         }
      },
      methods: {
         onSubmit() {
            if (!this.validation()) {
               this.$toastr.error(this.$t("Please input fields correctly"))
               return
            }
            httpService.post('auth/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                country: this.country,
                gender: this.gender,
                paypal_email: this.paypal_email,
            }).then(res => {
                if(res.status === 201) {
                    this.$toastr.success(this.$t("Registered successfully. Please check your inbox to verify your email address"))
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000)
                } else {
                    if (res.errors && res.errors.length) {
                        let message = res.errors[0].message
                        this.$toastr.error(this.$t(message))
                    } else {
                        this.$toastr.error(this.$t('error.default'))
                    }
                }
            }).catch(e => {
               let res = e.response
               if (res.data.errors && res.data.errors.length) {
                  let message = res.data.errors[0].message
                  this.$toastr.error(this.$t(message))
               } else {
                  this.$toastr.error(this.$t('error.default'))
               }
            })
         },
         validation() {
            if (!this.name || !this.email || !this.password || !this.confirm_pass || !this.gender || !this.country) {
               return false;
            }
            return (!this.error.full_name && !this.error.password && !this.error.password && !this.error.gender
               && !this.error.country && !this.error.referral_code && !this.error.paypal_email);

         }
      }
   };
</script>
<style>
</style>
