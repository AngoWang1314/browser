const exp = {
  mobile: /^1[3|4|5|7|8]\d{9}$/
}

export const mobileValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!exp.mobile.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

export const isMobile = (value) => {
  return exp.mobile.test(value)
}