class EventEmit {
  events={}
  constructor() {
    this.events ={}
  }
  // 订阅-将事件维护起来
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(callback)
  }
  // 订阅-只订阅一次
  once(type, callback) {
    // 执行cb之前，需要移除event
    const func = (...args) => {
      this.off(type, func)
      callback.apply(...args)
    }

    this.on(type, func);
  }
  // 派发-触发事件
  emit(type, ...args) {
    // 没找到事件，直接返回
    if (!this.events[type]) {
      return
    }
    // 找到事件，去执行
    this.events[type].forEach(callback => {
      callback(...args)
    });
  }
  // 解绑
  off(type, callback) {
    // 没找到事件，直接返回
    if (!this.events[type]) {
      return
    }
    // 找到事件，解绑
    this.events[type].filter(event => event !== callback);
  }
}