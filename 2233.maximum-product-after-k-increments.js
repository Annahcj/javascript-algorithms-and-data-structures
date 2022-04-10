// 2233. Maximum Product After K Increments
// You are given an array of non-negative integers nums and an integer k. In one operation, you may choose any element from nums and increment it by 1.
// Return the maximum product of nums after at most k operations. Since the answer may be very large, return it modulo 109 + 7.


// Solution: Min Heap

// It is always optimal to increase the smallest numbers for the maximum product.
// Use a min heap to keep track of the smallest number.
// After removing a number from the heap, add back the number + 1.
// Repeat this process k times.

// Time Complexity: O(n log(n)) 380ms
// Space Complexity: O(n) 66.5MB
var maximumProduct = function(nums, k) {
  let heap = new PriorityQueue();
  for (let num of nums) heap.add(num);

  for (let i = 0; i < k; i++) {
    let num = heap.remove();
    heap.add(num + 1);
  }

  let res = heap.values[0], mod = 10**9 + 7;
  for (let i = 1; i < heap.values.length; i++) {
    res = (res * heap.values[i]) % mod;
  }
  return res;
};

class PriorityQueue {
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

// Two test cases to run function on
console.log(maximumProduct([0,4], 5)) // 20
console.log(maximumProduct([6,3,3,2], 2)) // 216