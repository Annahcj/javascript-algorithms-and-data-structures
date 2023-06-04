// 2717. Semi-Ordered Permutation
// You are given a 0-indexed permutation of n integers nums.
// A permutation is called semi-ordered if the first number equals 1 and the last number equals n. You can perform the below operation as many times as you want until you make nums a semi-ordered permutation:
  // Pick two adjacent elements in nums, then swap them.
// Return the minimum number of operations to make nums a semi-ordered permutation.
// A permutation is a sequence of integers from 1 to n of length n containing each number exactly once.


// Solution: Greedy

// First, count the number of moves to swap 1 to position 0: index of 1
// Secondly, count the number of moves to swap n to position n-1: n - 1 - index of n 
// Note: If the original index of 1 > the original index of n, we can take one less move to swap n to position n-1. This is because as we swap 1 to position 0, we end up swapping n one position to the right, thus making it one position closer to the end position. Try dry running an example.

// Time Complexity: O(n) 105ms
// Space Complexity: O(1) 46MB
var semiOrderedPermutation = function(nums) {
  let n = nums.length, posOne, posN;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) posOne = i;
    else if (nums[i] === n) posN = i;
  }
  return posOne + (n - 1 - posN) - (posOne > posN ? 1 : 0);
};

// Three test cases
console.log(semiOrderedPermutation([2,1,4,3])) // 2
console.log(semiOrderedPermutation([2,4,1,3])) // 3
console.log(semiOrderedPermutation([1,3,4,2,5])) // 0