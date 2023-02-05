// 2558. Take Gifts From the Richest Pile
// You are given an integer array gifts denoting the number of gifts in various piles. Every second, you do the following:
  // Choose the pile with the maximum number of gifts.
  // If there is more than one pile with the maximum number of gifts, choose any.
  // Leave behind the floor of the square root of the number of gifts in the pile. Take the rest of the gifts.
// Return the number of gifts remaining after k seconds.


// Solution: Max Heap

// Maintain a max heap of gifts.
// For each second, remove the maximum gift and add back the floor of the square root.
// Repeat this for k seconds and return the sum of the remaining values in the heap.

// Time Complexity: O(n log(n)) 103ms
// Space Complexity: O(n) 48.3MB
var pickGifts = function(gifts, k) {
  let heap = new Heap((a, b) => b - a);
  let n = gifts.length;
  for (let i = 0; i < n; i++) {
    heap.add(gifts[i]);
  }
  for (let i = 0; i < k; i++) {
    let max = heap.remove();
    let remain = Math.floor(Math.sqrt(max));
    heap.add(remain);
  }
  return heap.values.reduce((sum, val) => sum + val, 0);
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
console.log(pickGifts([25,64,9,4,100], 4)) // 29
console.log(pickGifts([1,1,1,1], 4)) // 4