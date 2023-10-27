// 1054. Distant Barcodes
// In a warehouse, there is a row of barcodes, where the ith barcode is barcodes[i].
// Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any answer, and it is guaranteed an answer exists.


// Solution: Priority Queue

// It is always optimal to use the two most frequent numbers together, since they will have more leftover that we can't use in the future.
// Use a priority queue to keep track of the most frequent number ([number, frequency]).
  // If the most frequent number isn't the same as the previous number, use it.
  // Otherwise, use the second most frequent number.

// Time Complexity: O(n log(n)) 212ms
// Space Complexity: O(n) 53.5MB
var rearrangeBarcodes = function(barcodes) {
  let count = new Map();
  for (let barcode of barcodes) {
    count.set(barcode, (count.get(barcode) || 0) + 1);
  }
  let heap = new Heap((a, b) => b[1] - a[1]); // [number, frequency]
  for (let [num, freq] of count) {
    heap.add([num, freq]);
  }
  
  let res = [];
  while (!heap.isEmpty()) {
    let [num, freq] = heap.remove();
    if (res.length && num === res[res.length - 1]) { // equal adjacent barcode, get next most frequent number
      if (heap.isEmpty()) return res;
      let [secondNum, secondFreq] = heap.remove();
      res.push(secondNum);
      if (secondFreq > 1) heap.add([secondNum, secondFreq - 1]);
      heap.add([num, freq]);
    } else {
      res.push(num);
      if (freq > 1) heap.add([num, freq - 1]);
    }
  }
  return res;
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Two test cases 
console.log(rearrangeBarcodes([1,1,1,2,2,2])) // [1,2,1,2,1,2]
console.log(rearrangeBarcodes([1,1,1,1,2,2,3,3])) // [1,3,1,2,1,3,2,1]