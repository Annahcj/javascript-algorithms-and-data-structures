// 303. Range Sum Query - Immutable
// Given an integer array nums, handle multiple queries of the following type:
// Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.


// Solution: Dynamic Programming

// keep an array of accumulative sums
// for e.g: [1,2,3,4,5]
// sums = [1,3,6,10,15]

// to find the sum between two indexes, simply return sums[right] - sums[left - 1] (or zero if left is 0)

// Runtime on LeetCode: 108ms
// Memory Usage on LeetCode: 45.7MB

// NumArray:
// Time Complexity: O(n)
// Space Complexity: O(n)

// sumRange:
// Time Complexity: O(1)
// Space Complexity: O(1)
  var NumArray = function(nums) {
    this.arr = [];
    let sum = 0;
    for (var num of nums) {
      sum += num;
      this.arr.push(sum);
    }
  };
  
  NumArray.prototype.sumRange = function(left, right) {
    left--;
    return this.arr[right] - (this.arr[left] || 0);
  };
  
  // A few test cases
  let numArray = new NumArray([-2,0,3,-5,2,-1]);
  console.log(numArray.sumRange(0, 2)) // 1
  console.log(numArray.sumRange(2, 5)) // -1
  console.log(numArray.sumRange(0, 5)) // -3