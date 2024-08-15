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
    return new Promise((resolve, reject) => {
      this.fullfillArr.push(() => {
        try {
          let x = fullfillCallback(this.value)
          x instanceof Promise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
      this.rejectedArr.push(() => {
        try {
          let x = rejectedCallback(this.value)
          x instanceof Promise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  static all(promiseArr) {
    let result = []
    let index = 0
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(val => {
          index++
          result[i] = val
          // 全部promise执行完成
          if (index === promiseArr.length) {
            resolve(result)
          }
        }, reject)
      }
    })
  }
}

