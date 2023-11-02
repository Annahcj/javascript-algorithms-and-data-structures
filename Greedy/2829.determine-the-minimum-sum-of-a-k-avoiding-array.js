// 2829. Determine the Minimum Sum of a k-avoiding Array
// You are given two integers, n and k.
// An array of distinct positive integers is called a k-avoiding array if there does not exist any pair of distinct elements that sum to k.
// Return the minimum possible sum of a k-avoiding array of length n.


// Solution: Greedy w/ Hashset

// Incrementally try to take the smallest possible numbers which don't result in any pairs that sum to k.
// This is optimal because if we have a pair of numbers, say (1,3) and k = 4, it's always better to take the smaller number of the pair, 1. Whichever number we take, it won't affect future elements because it will never be part of another k-sum pair.

// Time Complexity: O(n) 91ms
// Space Complexity: O(n) 46.5MB
var minimumSum = function(n, k) {
  let sum = 0, set = new Set(), num = 1;
  while (set.size < n) {
    if (!set.has(k - num)) {
      set.add(num);
      sum += num;
    }
    num++;
  }
  return sum;
};

// Two test cases
console.log(minimumSum(5, 4)) // 18
console.log(minimumSum(2, 6)) // 3