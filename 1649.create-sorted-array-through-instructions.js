// 1649. Create Sorted Array through Instructions
// Given an integer array instructions, you are asked to create a sorted array from the elements in instructions. You start with an empty container nums. For each element from left to right in instructions, insert it into nums. The cost of each insertion is the minimum of the following:
  // The number of elements currently in nums that are strictly less than instructions[i].
  // The number of elements currently in nums that are strictly greater than instructions[i].
// For example, if inserting element 3 into nums = [1,2,3,5], the cost of insertion is min(2, 1) (elements 1 and 2 are less than 3, element 5 is greater than 3) and nums will become [1,2,3,3,5].
// Return the total cost to insert all elements from instructions into nums. Since the answer may be large, return it modulo 10^9 + 7


// Solution: Segment Tree

// Use a segment tree to keep track of and update the occurances of each number. 
// For each instructions[i], get the minimum of sumRange(0, instructions[i] - 1) and sumRange(instructions[i] + 1, max(instructions)) 

// n = instructions.length, m = max(instructions)
// Time Complexity: O(n log(m)) 429ms
// Space Complexity: O(m) 59.3MB
var createSortedArray = function(instructions) {
  let n = instructions.length, max = Math.max(...instructions);
  let segTree = new SegmentTree(max + 1);
  let ans = 0, mod = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    let less = segTree.sumRange(1, instructions[i] - 1);
    let more = segTree.sumRange(instructions[i] + 1, max);
    ans = (ans + Math.min(less, more)) % mod;
    segTree.update(instructions[i], 1);
  }
  return ans;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] += val;
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

// Three test cases to run function on
console.log(createSortedArray([1,5,6,2])) // 1
console.log(createSortedArray([1,2,3,6,5,4])) // 3
console.log(createSortedArray([1,3,3,3,2,4,2,1,2])) // 4