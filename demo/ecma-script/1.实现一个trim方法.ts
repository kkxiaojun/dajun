String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
}

console.log('')