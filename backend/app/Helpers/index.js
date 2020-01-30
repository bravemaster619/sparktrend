const safeNumber = (num, defaultValue = undefined, allowNegative = false) => {
  if (!num) {
    num = 0;
  }
  num = Number(num)
  if (num === Infinity) {
    if (defaultValue === undefined) {
      console.log(num)
      throw new Error('Given argument is infinity')
    } else {
      return defaultValue
    }
  }
  if (!allowNegative && num < 0) {
    if (defaultValue === undefined) {
      console.log(num)
      throw new Error('Given argument is negative')
    } else {
      return defaultValue
    }
  }
  return num
}

const safeBoolean = (val) => {
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

const hideUsername = (username) => {
  if(!username) {
    username = ''
  } else {
    username = '' + username
  }
  return username.slice(0,3) + "*****"
}

module.exports = {
  $n: safeNumber,
  $b: safeBoolean,
  $h: hideUsername
}
