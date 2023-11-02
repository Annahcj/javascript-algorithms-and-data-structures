// 775. Global and Local Inversions
// You are given an integer array nums of length n which represents a permutation of all the integers in the range [0, n - 1].
// The number of global inversions is the number of the different pairs (i, j) where:
  // 0 <= i < j < n
  // nums[i] > nums[j]
// The number of local inversions is the number of indices i where:
  // 0 <= i < n - 1
  // nums[i] > nums[i + 1]
// Return true if the number of global inversions is equal to the number of local inversions.


// Solution: Segment Tree

// Process nums from right to left.
// Populate the segment tree and count local and global inversions on the fly.
// For each nums[i], count the numbers in the range [0, ..., nums[i] - 1] to get the global inversion.

// Time Complexity: O(n log(n)) 263ms
// Space Complexity: O(n) 57.5MB
var isIdealPermutation = function(nums) {
  let n = nums.length, segTree = new SegmentTree(n);
  let global = 0, local = 0;
  for (let i = n - 1; i >= 0; i--) {
    global += segTree.sumRange(0, nums[i] - 1);
    segTree.update(nums[i], 1);
    if (i < n - 1 && nums[i] > nums[i + 1]) local++; 
  }
  return global === local;
};

class SegmentTree {
  constructor(n) {
    this.segTree = Array(n * 2).fill(0);
    this.n = n;
  }
  update(i, val) {
    let index = i + this.n;
    this.segTree[index] = val;
    index = Math.floor(index / 2);
    while (index > 0) {
      this.segTree[index] = this.segTree[index * 2] + this.segTree[index * 2 + 1];
      index = Math.floor(index / 2);
    }
  }
  sumRange(l, r) {
    let left = l + this.n, right = r + this.n;
    let sum = 0;
    while (left <= right) {
      if (left % 2 === 1) {
        sum += this.segTree[left];
        left++;
      }
      if (right % 2 === 0) {
        sum += this.segTree[right];
        right--;
      }
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }
    return sum;
  }
}

// Two test cases to run function on
console.log(isIdealPermutation([1,0,2])) // true
console.log(isIdealPermutation([1,2,0])) // false