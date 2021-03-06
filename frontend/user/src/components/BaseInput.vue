<template>
    <div class="form-group"
         :class="[
       {'input-group': hasIcon},
       {'has-danger': error},
       {'focused': focused},
       {'input-group-alternative': alternative},
       {'has-label': label || $slots.label},
       {'has-success': valid === true},
       {'has-danger': valid === false}
       ]">
        <slot name="label">
            <label v-if="label" :class="labelClasses">
                {{label}}
                <span v-if="required">*</span>
            </label>
        </slot>
        <div v-if="addonLeftIcon || addonLeftSvg || $slots.addonLeft"
             :class="[{'pt-1': $attrs.type==='select'}]"
             class="input-group-prepend">
            <span class="input-group-text">
                <slot name="addonLeft">
                <i :class="addonLeftIcon" v-if="addonLeftIcon"></i>
                <div class="addon-svg" v-html="addonLeftSvg" v-if="addonLeftSvg"></div>
              </slot>
            </span>
        </div>
        <slot v-bind="slotData">
            <select v-if="$attrs.type==='select'"
                    v-bind="$attrs"
                    v-on="listeners"
                    class="form-control"
                    :class="[{'is-valid': valid === true}, {'is-invalid': valid === false}, inputClasses]"
                    aria-describedby="addon-right addon-left">
                <option v-for="(option, index) in $attrs.optionlist"
                        :key="index"
                        v-bind:value="option.value">
                    {{option.text}}
                </option>
            </select>
            <input
                    v-else
                    :value="value"
                    v-bind="$attrs"
                    v-on="listeners"
                    class="form-control"
                    :class="[{'is-valid': valid === true}, {'is-invalid': valid === false}, inputClasses]"
                    aria-describedby="addon-right addon-left">
        </slot>
        <div v-if="addonRightIcon || $slots.addonRight"
             class="input-group-append">
          <span class="input-group-text">
              <slot name="addonRight">
                  <i :class="addonRightIcon"></i>
              </slot>
          </span>
        </div>
        <slot name="infoBlock"></slot>
        <slot name="helpBlock">
            <div class="text-danger invalid-feedback" style="display: block;" :class="{'mt-2': hasIcon}" v-if="error">
                {{ error }}
            </div>
        </slot>
    </div>
</template>
<script>
   export default {
      inheritAttrs: false,
      name: "base-input",
      props: {
         required: {
            type: Boolean,
            description: "Whether input is required (adds an asterix *)"
         },
         valid: {
            type: Boolean,
            description: "Whether is valid",
            default: undefined
         },
         alternative: {
            type: Boolean,
            description: "Whether input is of alternative layout"
         },
         label: {
            type: String,
            description: "Input label (text before input)"
         },
         error: {
            type: String,
            description: "Input error (below input)"
         },
         labelClasses: {
            type: String,
            description: "Input label css classes"
         },
         inputClasses: {
            type: String,
            description: "Input css classes"
         },
         value: {
            type: [String, Number],
            description: "Input value"
         },
         addonRightIcon: {
            type: String,
            description: "Addon right icon"
         },
         addonLeftIcon: {
            type: String,
            description: "Addont left icon"
         },
         addonLeftSvg: {
            type: String,
            description: "Addon left svg"
         },
         options: {
            type: Array,
            description: "Array of object elements, if given input is select"
         }
      },
      data() {
         return {
            focused: false
         };
      },
      computed: {
         listeners() {
            return {
               ...this.$listeners,
               input: this.updateValue,
               focus: this.onFocus,
               blur: this.onBlur
            };
         },
         slotData() {
            return {
               focused: this.focused,
               ...this.listeners
            };
         },
         hasIcon() {
            const {addonRight, addonLeft, addonLeftSvg} = this.$slots;
            return (
               addonRight !== undefined ||
               addonLeft !== undefined ||
               addonLeftSvg !== undefined ||
               this.addonRightIcon !== undefined ||
               this.addonLeftIcon !== undefined ||
               this.addonLeftSvg !== undefined
            );
         }
      },
      methods: {
         updateValue(evt) {
            let value = evt.target.value;
            this.$emit("input", value);
         },
         onFocus(value) {
            this.focused = true;
            this.$emit("focus", value);
         },
         onBlur(value) {
            this.focused = false;
            this.$emit("blur", value);
         }
      },
   };
</script>
<style>
</style>
