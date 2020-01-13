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

module.exports = {
  $n: safeNumber,
  $b: safeBoolean
}
