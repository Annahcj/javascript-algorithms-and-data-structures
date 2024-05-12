// 786. K-th Smallest Prime Fraction
// You are given a sorted integer array arr containing 1 and prime numbers, where all the integers of arr are unique. You are also given an integer k.
// For every i and j where 0 <= i < j < arr.length, we consider the fraction arr[i] / arr[j].
// Return the kth smallest fraction considered. Return your answer as an array of integers of size 2, where answer[0] == arr[i] and answer[1] == arr[j].


// Solution: Heap

// Add each smallest starting pair ([i, n - 1]) of fractions to a heap, sorted by fraction in asc order.
// Repeat the following k times:
  // 1. Remove the smallest fraction from the heap.
  // 2. Move the right index of the fraction down by 1, to create the next largest fraction for this starting index.
// This works because the heap always removes the smallest fractions first, and add back the next largest fraction for the starting index.
// (It is almost comparable to how Dijkstra's algorithm works).

// n = length of arr
// Time Complexity: O((k + n) log(n)) 498ms
// Space Complexity: O(n) 61.1MB
var kthSmallestPrimeFraction = function(arr, k) {
  let n = arr.length, heap = new Heap((a, b) => (arr[a[0]] / arr[a[1]]) - (arr[b[0]] / arr[b[1]])); // sorted by fraction
  for (let i = 0; i < n - 1; i++) {
    heap.add([i, n - 1]); // [left index in arr, right index in arr]
  }
  let fractions = 0;
  while (fractions < k) {
    let [i, j] = heap.remove();
    fractions++;
    if (fractions === k) return [arr[i], arr[j]];
    
    if (j - 1 > i) {
      heap.add([i, j - 1]);
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
console.log(kthSmallestPrimeFraction([1,2,3,5], 3)) // [2,5]
console.log(kthSmallestPrimeFraction([1,7], 1)) // [1,7]