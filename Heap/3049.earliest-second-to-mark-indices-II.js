// 3049. Earliest Second to Mark Indices II
// You are given two 1-indexed integer arrays, nums and, changeIndices, having lengths n and m, respectively.
// Initially, all indices in nums are unmarked. Your task is to mark all indices in nums.
// In each second, s, in order from 1 to m (inclusive), you can perform one of the following operations:
  // Choose an index i in the range [1, n] and decrement nums[i] by 1.
  // Set nums[changeIndices[s]] to any non-negative value.
  // Choose an index i in the range [1, n], where nums[i] is equal to 0, and mark index i.
  // Do nothing.
// Return an integer denoting the earliest second in the range [1, m] when all indices in nums can be marked by choosing operations optimally, or -1 if it is impossible.


// Solution: Binary Search & Heap 

// It's optimal to use the first occurance of changeIndices[i] to set a number to 0 (if nums[changeIndices[i]] is not already 0).

// Go through changeIndices from back to front.
  // Use a min heap to keep track of indices which we have turned to 0 and marked.
  // If changeIndices[i] is the first occurance, mark it if we have capacity to mark it (operations > 0), otherwise we need to revert a zero operation with the minimum value in nums (minimum operations needed to decrement to 0).
  // If changeIndices[i] is not the first occurance, we add to our operations count (we haven't yet decided what to use it on).

// At the end, the values in the heap are the ones that we are able to turn into 0 and mark.
// Check if we have enough operations leftover to turn the remaining values in nums into 0 and mark them.
  // Turn remaining nums into 0: (sum of nums - sum of values in heap).
  // Mark remaining numbers: (the size of nums - the size of the heap)

// n = length of nums, m = length of changeIndices
// Time Complexity: O((m log(n) + n) * log(m)) 116ms
// Space Complexity: O(n + m) 59.8MB
var earliestSecondToMarkIndices = function(nums, changeIndices) {
  changeIndices = changeIndices.map((index) => index - 1);
  let n = nums.length;
  let low = 0, high = changeIndices.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isPossible(mid)) high = mid;
    else low = mid + 1;
  }
  return isPossible(low) ? low + 1 : -1;
  
  function isPossible(s) {
    let first = Array(n).fill(-1);
    for (let i = s; i >= 0; i--) {
      if (nums[changeIndices[i]] > 0) {
        first[changeIndices[i]] = i;
      }
    }
    let heap = new Heap(), operations = 0;
    for (let i = s; i >= 0; i--) {
      if (i === first[changeIndices[i]]) {
        heap.add(nums[changeIndices[i]]);
        if (operations > 0) {
          operations--; // use one operation to mark nums[changeIndices[i]]
        } else {
          heap.remove(); // remove minimum value, since it will take the least number of operations to decrement it to 0
          // add one operation back because this number used one operation to mark the number and one operation to set it to 0.
          // (we only add back one operation because the other is spent on marking the current number)
          operations++;
        }
      } else {
        operations++;
      }
    }
    let numsSum = nums.reduce((sum, num) => sum + num);
    let markedCount = 0, markedSum = 0;
    while (!heap.isEmpty()) {
      markedCount++;
      markedSum += heap.remove();
    }
    let decrementOperations = numsSum - markedSum;
    let markingOperations = n - markedCount;
    return operations >= decrementOperations + markingOperations;
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

// Three test cases
console.log(earliestSecondToMarkIndices([3,2,3], [1,3,2,2,2,2,3])) // 6
console.log(earliestSecondToMarkIndices([0,0,1,2], [1,2,1,2,1,2,1,2])) // 7
console.log(earliestSecondToMarkIndices([1,2,3], [1,2,3])) // -1