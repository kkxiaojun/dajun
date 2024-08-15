class PromiseM {
  constructor(exectorCallback) {
    this.status = 'pending'
    this.value = undefined
    this.fullfillArr = []
    this.rejectedArr = []
    
    // 执行
    let resolve = (result) => {
      if (this.status !== 'pending') {
        return
      }
      setTimeout(() => {
        this.status = 'fullfilled'
        this.value = result
        this.fullfillArr.forEach(item => item(this.value))
      }, 0)
    }

    let reject = (reason) => {
      this.status = 'rejected'
      this.value = reason
      this.rejectedArr.forEach(item => item(this.value))
    }
    try {
      exectorCallback(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(fullfillCallback, rejectedCallback) {
    this.fullfillArr.push(fullfillCallback)
    this.rejectedArr.push(rejectedCallback)
  }
}

function compose(...funcs) {
  funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function curry(fn) {
  return function(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return curry(fn.bind(null, ...args))
    }
  }
}
