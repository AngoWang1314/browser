export const quickSort = (array) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j]
    while (i < j) {
      while (i < j && arr[i].sort <= baseVal.sort) {
        i++
      }
      arr[j] = arr[i]
      while (j > i && arr[j].sort >= baseVal.sort) {
        j--
      }
      arr[i] = arr[j]
    }
    arr[j] = baseVal
    sort(arr, left, j - 1)
    sort(arr, j + 1, right)
  }
  const newArr = array.concat()
  sort(newArr)
  return newArr
}

export const getNowDate = () => {
  var date = new Date()
  var seperator = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator + month + seperator + strDate
  return currentdate
}

export const timestampToDate = (timestamp) => {
  var time = new Date(timestamp)
  var y = time.getFullYear()
  var M = time.getMonth() + 1 <= 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + M + '-' + d
}

export const dateToTimestamp = (date) => {
  return (new Date(date)).setHours(0, 0, 0)
}

export const getQuery = () => {
  let token = document.location.search
  let arr = token.slice(1).split('&')
  let params = {}
  arr.forEach(item => {
    let tmp = item.split('=')
    params[tmp[0]] = tmp[1]
  })
  return params
}
