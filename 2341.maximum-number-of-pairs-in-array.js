// 2341. Maximum Number of Pairs in Array
// You are given a 0-indexed integer array nums. In one operation, you may do the following:
  // Choose two integers in nums that are equal.
  // Remove both integers from nums, forming a pair.
// The operation is done on nums as many times as possible.
// Return a 0-indexed integer array answer of size 2 where answer[0] is the number of pairs that are formed and answer[1] is the number of leftover integers in nums after doing the operation as many times as possible.


// Solution: Count Frequency of Numbers

// Get the frequency of each number in nums.
// If the frequency is not divisible by 2, we have a leftover number.
// Count the number of leftover numbers.

// Time Complexity: O(n) 100ms
// Space Complexity: O(max(nums)) 42.8MB
var numberOfPairs = function(nums) {
  let count = Array(Math.max(...nums) + 1).fill(0);
  for (let num of nums) count[num]++;
  let leftover = 0;
  for (let i = 0; i < count.length; i++) {
    if (count[i] % 2 === 1) leftover++;
  }
  return [(nums.length - leftover) / 2, leftover];
};

// Two test cases to run function on
console.log(numberOfPairs([1,3,2,1,3,2,2])) // [3,1]
console.log(numberOfPairs([1,1])) // [1,0]