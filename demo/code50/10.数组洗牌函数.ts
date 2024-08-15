function shuffle(array) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = array;
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand];
        result[rand] = result[index];
        result[index] = value;
    }
    return result;
}

// [1,2,3]
function shuffle1 (list) {
    const len = list.length
    let result = [...list]
    for (let i = len - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1));
      [result[i], result[swapIndex]] = [result[swapIndex], result[i]]
    }
    return result
  }

  