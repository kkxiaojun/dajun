// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

class LruCashe {
  limit = 0;
  cache;
  constructor(cap) {
    this.limit = cap
    this.cache = new Map()
  }
  get(key) {
    if (this.cache.get(key)) {
      // 存在即更新
      const temp = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
    }
    return - 1
  }
  put(key,  value) {
    if (this.cache.get(key)) {
      // 存在，更新
      this.cache.delete(key)
    } else if(this.cache.size>=this.limit) {
      // 缓存超过最大值,则移除最近没有使用的
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}