export class ArraySet {
  // value[]
  forEachIndex = 0;
  constructor(value = []) {
    this.value = value;
  }

  add(item) {
    if (!this.has(item)) {
      this.value.push(item);
    }
  }

  has(item) {
    return this.value.indexOf(item) > -1;
  }

  delete(item) {
    const findIndex = this.value.indexOf(item);
    if (findIndex > -1) {
      this.value.splice(findIndex, 1);
      if (findIndex <= this.forEachIndex) {
        this.forEachIndex -= 1;
      }
    }
  }

  forEach(callback) {
    if (this.value.length === 0) return;
    this.forEachIndex = 0;
    for (; this.forEachIndex < this.value.length; this.forEachIndex++) {
      callback(this.value[this.forEachIndex]);
    }
  }

  batchDelete(callback) {
    if (this.value.length === 0) return;
    this.forEachIndex = 0;
    for (; this.forEachIndex < this.value.length; this.forEachIndex++) {
      const value = this.value[this.forEachIndex];
      this.value.splice(this.forEachIndex, 1);
      this.forEachIndex--;
      callback(value);
    }
  }

  clear() {
    this.value.length = 0;
  }
}
