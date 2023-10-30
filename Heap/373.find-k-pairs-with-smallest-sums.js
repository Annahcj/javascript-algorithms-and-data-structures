// 373. Find K Pairs with Smallest Sums
// You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.
// Define a pair (u, v) which consists of one element from the first array and one element from the second array.
// Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.


// Solution: Heap & Two Pointers

// Use a heap to keep the possible indices [i, j] sorted by their sum.
// Use a set to make sure we don't count the same pair twice.

// Start the heap with [0, 0], since it is guaranteed to be the smallest possible pair (smallest with smallest).
// From there, we try the two possibilities for each pair of indices in the heap:
  // i + 1, j
  // i, j + 1

// Note: If we can't generate k pairs from nums1 and nums2, return all the possible pairs.

// Time Complexity: O(k log(n)) 512ms
// Space Complexity: O(n) 85.2MB
var kSmallestPairs = function(nums1, nums2, k) {
  let heap = new Heap((a, b) => (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));
  let n = nums1.length, m = nums2.length, res = [];
  let seen = new Set();
  heap.add([0, 0]);
  
  while (!heap.isEmpty() && res.length < k) {
    let [i, j] = heap.remove();
    res.push([nums1[i], nums2[j]]);
    if (i < n - 1 && !seen.has(`${i + 1},${j}`)) {
      heap.add([i + 1, j]);
      seen.add(`${i + 1},${j}`);
    }
    if (j < m - 1 && !seen.has(`${i},${j + 1}`)) {
      heap.add([i, j + 1]);
      seen.add(`${i},${j + 1}`);
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
console.log(kSmallestPairs([1,7,11], [2,4,6], 3)) // [[1,2],[1,4],[1,6]]
console.log(kSmallestPairs([1,1,2], [1,2,3], 2)) // [[1,1],[1,1]]