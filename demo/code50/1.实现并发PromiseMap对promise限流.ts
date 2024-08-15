// 实现一个promise.map并发队列
// 1. 核心是promise.all
// 2. 每个task包含，{fn, resolve, reject} = task
// 3. limit 控制并发数，count控制当前在执行的数量，queue控制队列
class TaskQueue {
  public limit = 10
  public task = []
  public runningCount = 0
  constructor(limit = 10) {
    this.limit = limit
  }
  addTask(task) {
    return new Promise((resolve, reject) => {
      this.task.push({task, resolve, reject})
      this.runTasks()
    })
  }
  runTasks() {
    if (this.runningCount >= this.limit) {
      return
    }
    if (this.task.length === 0) {
      return
    }

    this.runningCount++
    const {task, resolve, reject} = this.task.shift()

    task()
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        this.runningCount--
        this.runTasks()
      })

  }
}

// 创建一个最高并发量为 10 的 Promise 队列
const queue = new TaskQueue(10);

// 添加任务到队列
for (let i = 0; i < 30; i++) {
  const task = () =>
    new Promise((resolve) => {
      // 模拟异步操作
      setTimeout(() => {
        console.log(`Task ${i} completed`);
        resolve('');
      }, Math.random() * 1000);
    });

  queue.addTask(task);
}

class TaskLimit {
  // 任务数限制
  limit = 0
  // 当前运行的任务数
  count = 0
  // 任务队列
  queue = []
  constructor(n) {
    this.limit = n
    this.count = this.count
    this.queue = this.queue
  }
  // 入队
  enqueue(fn) {
    new Promise((resolve, reject) => {
      this.queue.push({fn, resolve, reject})
    })
  }
  // 出队执行
  dequeue() {
    if (this.count < this.limit && this.queue.length) {
      const {fn, resolve, reject} = this.queue.shift()
      this.run(fn).then(resolve).catch(reject)
    }
  }
  // 执行
  async run (fn) {
    this.count ++ 
    const value = await fn()
    // 检查未执行队列
    this.dequeue()
    this.count--
    return value
  }
  // 初始化构建
  build(fn) {
    // 未达到并发数量， 直接执行
    if (this.count < this.limit) {
      return this.run(fn)
    } else {
      // 入队等待
      return this.enqueue(fn)
    }
  }
}

 function pMap(list, fn, concurrency) {
  const limit = new TaskLimit(concurrency)
  return Promise.all(list.map(() => (...args) => {
    return limit.build(() => fn(args))
  }))
}


class TaskLimit1 {
  limit = 0,
  count = 0,
}