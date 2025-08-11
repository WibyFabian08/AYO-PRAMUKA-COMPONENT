let timer = null
export const debounce = (functional, timeout = 300) => {
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      functional.apply(this, args)
    }, timeout)
  }
}