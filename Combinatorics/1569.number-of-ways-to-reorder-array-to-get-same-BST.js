// 1569. Number of Ways to Reorder Array to Get Same BST
// Given an array nums that represents a permutation of integers from 1 to n. We are going to construct a binary search tree (BST) by inserting the elements of nums in order into an initially empty BST. Find the number of different ways to reorder nums so that the constructed BST is identical to that formed from the original array nums.
  // For example, given nums = [2,1,3], we will have 2 as the root, 1 as a left child, and 3 as a right child. The array [2,3,1] also yields the same BST but [3,2,1] yields a different BST.
// Return the number of ways to reorder nums such that the BST formed is identical to the original BST formed from nums.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Combinatorics

// For each dfs(nums), nums represents the nodes in the current subtree.
// nums[0] is the always the root of the subtree.
// Any nodes smaller than the root goes to the left subtree, and nodes that are larger will go to the right subtree.

// 1. Count the number of permutations of putting `left.length` nodes into n-1 positions (using binomial coefficient). All permutations / individual permutations of the left subtree / individual permutations of the right subtree (since we don't care about the individual permutations of subtrees yet).
// 2. Multiply the above^ permutations with the result from the left subtree and right subtree. This takes care of the individual permutations of the subtrees. 

// Note: We use Pascal's triangle to calculate the binomial coefficient.

// Time Complexity: O(n^2) 1990ms
// Space Complexity: O(n^2) 183.5MB
var numOfWays = function(nums) {
  let n = nums.length, MOD = BigInt(10 ** 9 + 7);
  let combs = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    combs[i][0] = 1n;
    combs[i][i] = 1n;
  }
  for (let i = 2; i < n; i++) {
    for (let j = 1; j < i; j++) {
      combs[i][j] = (combs[i - 1][j - 1] + combs[i - 1][j]) % MOD;
    }
  }
  return (dfs(nums) - 1n) % MOD;
  
  function dfs(nums) {
    let n = nums.length;
    if (n < 3) return 1n;
    
    let left = [], right = [], root = nums[0];
    // nums[0] is the root of this subtree
    for (let i = 1; i < n; i++) {
      if (nums[i] < root) left.push(nums[i]);
      else right.push(nums[i]);
    }
    
    let leftCombs = dfs(left) % MOD, rightCombs = dfs(right) % MOD;
    // combs[n - 1][left.length] = number of permutations of ordering nums while eliminating individual permutations of elements in the left subtree and right subtree individually
    // leftCombs * rightCombs: the number of permutations of the left subtree and right subtree individually
    return (((leftCombs * rightCombs) % MOD) * combs[n - 1][left.length]) % MOD;
  }
};

// Three test cases
console.log(numOfWays([2,1,3])) // 1
console.log(numOfWays([3,4,5,1,2])) // 5
console.log(numOfWays([1,2,3])) // 0