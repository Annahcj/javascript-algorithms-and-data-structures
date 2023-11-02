// 264. Ugly Number II
// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
// Given an integer n, return the nth ugly number.


// Solution: Min Heap 

// For a number to be ugly, it must be a product of 2, 3, or 5's.
// Use a min heap to keep track of the next element.
// Until we find n numbers,
  // 1. Remove the minimum number from the heap.
  // 2. Create three new numbers and add them to the heap: x * 2, x * 3, x * 5

// Note: 1 will always be the first ugly number and is a special case, so we handle it separately.

// Time Complexity: O(n log(n)) 160ms
// Space Complexity: O(n) 50.2MB
var nthUglyNumber = function(n) {
  if (n === 1) return 1;
  let heap = new Heap();
  for (let num of [2, 3, 5]) {
    heap.add(num);
  }
  n--; // for the 1
  
  let seen = new Set([2, 3, 5]);
  while (n > 0) {
    let min = heap.remove();
    n--;
    if (n === 0) return min;
    for (let factor of [2, 3, 5]) {
      let nextNum = min * factor;
      if (seen.has(nextNum)) continue;
      seen.add(nextNum);
      heap.add(nextNum);
    }
  }
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
console.log(nthUglyNumber(10)) // 12
console.log(nthUglyNumber(1)) // 1