<template>
    <div>
        <base-input addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker slot-scope="{focus, blur}"
                         @on-open="focus"
                         @on-close="blur"
                         :config="{allowInput: true, dateFormat: 'Y-m-d H:i:S', minDate}"
                         class="form-control datepicker"
                         v-model="orderDate">
            </flat-picker>
        </base-input>
    </div>
</template>
<script>
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    export default {
        components: {
            flatPicker
        },
        computed: {
            minDate: function() {
                return new Date((new Date).getTime() + 1000 * 3600 * 24 * 2)
            }
        },
        data() {
            return {
                orderDate: new Date
            }
        }
    }
</script>