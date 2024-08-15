// add(1)(2)(3)

// add(1, 2, 3);
// add(1, 2)(3);
// add(1)(2, 3);

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return function (...moreAgrs) {
        return curried(...args, ...moreAgrs)
      }
    }
  }
}