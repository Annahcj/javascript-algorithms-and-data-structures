// 3264. Final Array State After K Multiplication Operations I
// You are given an integer array nums, an integer k, and an integer multiplier.
// You need to perform k operations on nums. In each operation:
  // Find the minimum value x in nums. If there are multiple occurrences of the minimum value, select the one that appears first.
  // Replace the selected minimum value x with x * multiplier.
// Return an integer array denoting the final state of nums after performing all k operations.


// Solution: Heap

// Store the numbers in a min heap.
// For every operation, pull out the smallest value from the heap and multiply it before adding it back to the heap.
// As we multiply the numbers, update nums too.

// At the end, we return the final state of nums.

// n = length of nums
// Time Complexity: O(k log(n)) 84ms
// Space Complexity: O(n) 56.5MB
var getFinalState = function(nums, k, multiplier) {
  let n = nums.length;
  let heap = new Heap((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  for (let i = 0; i < n; i++) {
    heap.add([nums[i], i]);
  }
  for (let i = 0; i < k; i++) {
    let [_num, index] = heap.remove();
    nums[index] *= multiplier;
    heap.add([nums[index], index]);
  }
  return nums;
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
console.log(getFinalState([2,1,3,5,6], 5, 2)) // [8,4,6,5,6]
console.log(getFinalState([1,2], 3, 4)) // [16,8]