const safeNumber = (num, allowNegative = false) => {
  if (!num) {
    num = 0;
  }
  num = Number(num)
  if (num === Infinity) {
    console.log(num)
    throw new Error('Given argument is infinity')
  }
  if (!allowNegative && num < 0) {
    console.log(num)
    throw new Error('Given argument is negative')
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
