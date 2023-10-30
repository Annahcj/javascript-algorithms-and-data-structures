// 2659. Make Array Empty
// You are given an integer array nums containing distinct numbers, and you can perform the following operations until the array is empty:
  // If the first element has the smallest value, remove it
  // Otherwise, put the first element at the end of the array.
// Return an integer denoting the number of operations it takes to make nums empty.


// Solution: Segment Tree 

// We can think of it as a circular array.
// The order of the numbers will always stay the same in a circular sense. 
// This means the distance between numbers will always stay the same except for when numbers are removed (even then the order stays the same).
// Based on this understanding, instead of simulating moving the actual element around, we can count the number of moves by the differences in the sorted indexes.
// The distance between two numbers (a, b) will always be the same, with the two possible orders:
  // If a is in front of b: Distance is b - a
  // If b is in front of a: Distance is (n-1 - b) + (a)

// Sort nums and map each nums[i] to the index in the sorted array.
// Fill the segment tree with 1's initially.
// Go through each sorted nums[i] and get the distance difference with the previous index.
  // If index > previous index, count the sum in range (previous index + 1, index).
  // If index < previous index, count the sum in range (previous index + 1, n - 1) + sum in range (0, index)
// After each nums[i], update the element in the segment tree to be 0 to indicate removal.

// Time Complexity: O(n log(n)) 399ms
// Space Complexity: O(n) 95.3MB
var countOperationsToEmptyArray = function(nums) {
  let n = nums.length, segTree = new SegmentTree(Array(n).fill(1));
  nums = nums.map((num, index) => [num, index]).sort((a, b) => a[0] - b[0]);
  let prevIndex = -1, ans = 0;
  for (let [_num, index] of nums) {
    if (index >= prevIndex) {
      ans += segTree.sumRange(prevIndex + 1, index);
    } else {
      ans += segTree.sumRange(prevIndex + 1, n - 1) + segTree.sumRange(0, index);
    }
    segTree.update(index);
    prevIndex = index;
  }
  return ans;
};

class SegmentTree {
  constructor(arr) {
    let n = arr.length;
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
    this.build(arr);
  }
  build(arr) {
    let n = this.size;
    for (let i = n; i < n * 2; i++) {
      this.segTree[i] = arr[i - n]; // populate leaf values
    }
    for (let i = n - 1; i > 0; i--) {
      this.segTree[i] = this.segTree[i * 2] + this.segTree[i * 2 + 1]; // sum
    }
  }
  update(index) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = 0;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  sumRange(left, right) {
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Three test cases
console.log(countOperationsToEmptyArray([3,4,-1])) // 5
console.log(countOperationsToEmptyArray([1,2,4,3])) // 5
console.log(countOperationsToEmptyArray([1,2,3])) // 3