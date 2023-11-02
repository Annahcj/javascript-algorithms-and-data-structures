// 2554. Maximum Number of Integers to Choose From a Range I
// You are given an integer array banned and two integers n and maxSum. You are choosing some number of integers following the below rules:
  // The chosen integers have to be in the range [1, n].
  // Each integer can be chosen at most once.
  // The chosen integers should not be in the array banned.
  // The sum of the chosen integers should not exceed maxSum.
// Return the maximum number of integers you can choose following the mentioned rules.


// Solution: Greedy & Hashset

// Turn banned into a hashset for quick lookup.
// It is optimal to take the smallest numbers that are not banned, while the sum doesn't exceed maxSum.
// Go through each number from 1 to n,
  // If it is not banned, take the number.
  // If the sum exceeds maxSum, return the current count of numbers.

// m = length of banned
// Time Complexity: O(n + m) 146ms
// Space Complexity: O(m) 57.8MB
var maxCount = function(banned, n, maxSum) {
  let sum = 0, bannedSet = new Set(banned), count = 0;
  for (let i = 1; i <= n; i++) {
    if (bannedSet.has(i)) continue;
    sum += i;
    if (sum > maxSum) return count;
    count++;
  }
  return count;
};

// Three test cases
console.log(maxCount([1,6,5], 5, 6)) // 2
console.log(maxCount([1,2,3,4,5,6,7], 8, 1)) // 0
console.log(maxCount([11], 7, 50)) // 7