function pAll(_promises) {
  return new Promise((resolve, reject) => {
    let allPromise = Array.from(_promises)
    let resultArr: any = []
    let count = 0
    for (let i = 0; i < allPromise.length; i++) {
      const curPromise = allPromise[i];
      Promise.resolve(curPromise).then(result => {
        resultArr[i] = result
        count++
        // 全部promise返回，resolve
        if (count === allPromise.length) {
          return resolve(resultArr)
        }
      }).catch(e => reject(e))
    }
  })
}

function promiseRace(_promises) {
  return new Promise((resolve, reject) => {
    let promises = Array.from(_promises)
    for (let i = 0; i < promises.length; i++) {
      const curPromise = promises[i];
      Promise.resolve(curPromise).then(result => {
        return resolve(result)
      }).catch(e => {
        return reject(e)
      })
    }
  })
}


