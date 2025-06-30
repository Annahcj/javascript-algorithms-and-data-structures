// 594. Longest Harmonious Subsequence
// We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
// Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.


// Solution: Counting

// Keep a running count of occurrances of each number.
// Record the maximum sum of the occurrances of current number + one less, or current number + one more.

// Time Complexity: O(n) 40ms
// Space Complexity: O(n) 65MB
function findLHS(nums) {
  const count = {};
  let lhs = 0;
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
    const smaller = count[num - 1] ? count[num] + count[num - 1] : 0;
    const bigger = count[num + 1] ? count[num] + count[num + 1] : 0;
    lhs = Math.max(lhs, smaller, bigger);
  }
  return lhs;
};

// Three test cases
console.log(findLHS([1,3,2,2,5,2,3,7])) // 5
console.log(findLHS([1,2,3,4])) // 2
console.log(findLHS([1,1,1,1])) // 0