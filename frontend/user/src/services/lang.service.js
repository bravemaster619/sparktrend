export const setLocale = function(locale) {
   localStorage.setItem('sparktrend-locale', locale)
}

export const getLocale = function() {
   let locale = localStorage.getItem('sparktrend-locale')
   if (!locale) {
      locale = 'en'
      setLocale(locale)
   }
   return locale
}