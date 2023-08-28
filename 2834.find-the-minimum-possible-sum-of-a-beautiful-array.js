// 2834. Find the Minimum Possible Sum of a Beautiful Array
// You are given positive integers n and target.
// An array nums is beautiful if it meets the following conditions:
  // nums.length == n.
  // nums consists of pairwise distinct positive integers.
  // There doesn't exist two distinct indices, i and j, in the range [0, n - 1], such that nums[i] + nums[j] == target.
// Return the minimum possible sum that a beautiful array could have.


// Solution: Greedy

// Take the smallest numbers possible.
// Store numbers we have used in a hashset.
// If the set contains (target - current number), we can't use the current number.

// Reasoning: 
  // If we have pairs of numbers which add up to target, it's always optimal to use the smaller one of the pairs. 
  // Numbers in a pair will never exist in another pair, since the target and numbers are positive.

// Time Complexity: O(n) 98ms
// Space Complexity: O(n) 60.2MB
var minimumPossibleSum = function(n, target) {
  let used = new Set(), num = 1, sum = 0;
  while (used.size < n) {
    if (!used.has(target - num)) {
      used.add(num);
      sum += num;
    }
    num++;
  }
  return sum;
};

// Three test cases
console.log(minimumPossibleSum(2, 3)) // 4
console.log(minimumPossibleSum(3, 3)) // 8
console.log(minimumPossibleSum(1, 1)) // 1