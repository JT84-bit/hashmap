module.exports = class Node {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._next = null;
  }

  insertNext(nextNode) {
    this._next = nextNode;
  }

  changeValue(value) {
    this._value = value;
  }

  get next() {
    return this._next;
  }

  set next(newNext) {
    this._next = newNext;
  }

  get key(){
    return this._key;
  }

  get value(){
    return this._value;
  }

  getPair () {
    return [this._key, this._value];
  }
};
