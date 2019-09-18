export function getItem (key) {
  let item = localStorage.getItem(key)
  if (item && (item.charAt(0) === '[' || item.charAt(0) === '{')) {
    return JSON.parse(item)
  }
  // console.log(key)
  // console.log(item)
  return item
}

export function setItem (key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}

export function removeItem (key) {
  return localStorage.removeItem(key)
}
