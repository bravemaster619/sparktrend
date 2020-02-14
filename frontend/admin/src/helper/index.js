export const $n = (num, defaultValue = undefined, allowNegative = false) => {
   if (!num) {
      num = 0;
   }
   num = Number(num)
   if (isNaN(num)) {
      if (defaultValue === undefined) {
         throw new Error('Given argument is NaN')
      } else {
         return defaultValue
      }
   }
   if (num === Infinity) {
      if (defaultValue === undefined) {
         throw new Error('Given argument is infinity')
      } else {
         return defaultValue
      }
   }
   if (!allowNegative && num < 0) {
      if (defaultValue === undefined) {
         throw new Error('Given argument is negative')
      } else {
         return defaultValue
      }
   }
   return num
}

export const $b = (val) => {
   if (!val) {
      return false
   }
   if (val === true) {
      return val
   }
   if (val == "true") {
      return true;
   }
   return false;
}

export const historyBack = function() {
   window.history.back()
}

export const numberFormat = function(num, locale="en-US") {
   const numberFormatter = new Intl.NumberFormat(locale)
   return numberFormatter.format(num)
}