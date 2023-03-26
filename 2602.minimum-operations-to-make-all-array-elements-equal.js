// 2602. Minimum Operations to Make All Array Elements Equal
// You are given an array nums consisting of positive integers.
// You are also given an integer array queries of size m. For the ith query, you want to make all of the elements of nums equal to queries[i]. You can perform the following operation on the array any number of times:
  // Increase or decrease an element of the array by 1.
// Return an array answer of size m where answer[i] is the minimum number of operations to make all elements of nums equal to queries[i].
// Note that after each query the array is reset to its original state.

 
// Solution: Sorting, Binary Search & Prefix Sum

// 1. Sort nums in asc order.
// 2. Get the prefix sum from the left and right of nums.
// 3. For each query, binary search for the split point - the first element where nums[i] >= query
  // From there, we can calculate the absolute difference of the two segments of nums.
  // Segment one: query * (i + 1) - leftSum[i - 1]
  // Segment two: rightSum[i] - query * (i + 1)

// n = length of nums, m = number of queries
// Time Complexity: O(n log(n) + m log(n)) 334ms
// Space Complexity: O(n + m) 75.6MB
var minOperations = function(nums, queries) {
  nums.sort((a, b) => a - b);
  let n = nums.length, left = [...nums], right = [...nums];
  for (let i = 1; i < n; i++) left[i] += left[i - 1];
  for (let i = n - 2; i >= 0; i--) right[i] += right[i + 1];
  let ans = [];
  for (let query of queries) {
    let splitIndex = getSplitIndex(query);
    let leftDiff = splitIndex > 0 ? query * splitIndex - left[splitIndex - 1] : 0;
    let rightDiff = splitIndex < n ? right[splitIndex] - query * (n - splitIndex) : 0;
    ans.push(leftDiff + rightDiff);
  }
  return ans;
  
  function getSplitIndex(query) {
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (nums[mid] >= query) high = mid;
      else low = mid + 1;
    }
    return nums[low] >= query ? low : n;
  }
};

// Two test cases
console.log(minOperations([3,1,6,8], [1,5])) // [14,10]
console.log(minOperations([2,9,6,3], [10])) // [20]