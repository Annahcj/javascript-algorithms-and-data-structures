// 996. Number of Squareful Arrays
// An array is squareful if the sum of every pair of adjacent elements is a perfect square.
// Given an integer array nums, return the number of permutations of nums that are squareful.
// Two permutations perm1 and perm2 are different if there is some index i such that perm1[i] != perm2[i].

 
// Solution 1: Brute Force w/ Backtracking

// Brute force using backtracking.
// How to handle duplicate permutations:
  // When we add a new number to the sequence,
  // use a set to keep track of which numbers we have used.
    // For e.g: The current sequence is [5], the remaining numbers left are [2,2]. We never want to take [5,2] more than once.

// Time Complexity: O(n!) 71ms
// Space Complexity: O(n) 42.8MB
var numSquarefulPerms = function(nums) {
  let n = nums.length;
  return backtrack(Array(n).fill(0), []);
  
  function backtrack(seen, arr) {
    if (arr.length === n) return 1;
    
    let lastNum = arr.length > 0 ? arr[arr.length - 1] : -1;
    let ans = 0, used = new Set();
    for (let i = 0; i < n; i++) {
      if (seen[i] || used.has(nums[i])) continue;
      let sum = lastNum + nums[i];
      if (lastNum === -1 || isPerfectSquare(sum)) {
        used.add(nums[i]);
        seen[i] = 1;
        arr.push(nums[i]);
        ans += backtrack(seen, arr);
        arr.pop();
        seen[i] = 0;
      }
    }
    return ans;
  }
};

function isPerfectSquare(num) {
  let squareRoot = Math.sqrt(num);
  return Math.floor(squareRoot) === squareRoot; // if square root is whole, then num is a perfect square
}

// Solution 2: DP w/ Bitmasks

// Memoize each dp(mask, prevNum), where
  // mask = bitmask of numbers we have taken in nums
  // prevNum is the last number in the current permuation

// For each dp(mask, prevNum), 
  // Go through every nums[i] where prevNum + nums[i] is a perfect square
  // Count the number of permuations that are successful

// How to handle duplicate permutations:
  // When we add a new number to the sequence,
  // use a set to keep track of which numbers we have used.
    // For e.g: The current sequence is [5], the remaining numbers left are [2,2]. We never want to take [5,2] more than once.

// Time Complexity: O(2^n * n * n) 67ms
// Space Complexity: O(2^n * n) 41.9MB
var numSquarefulPerms = function(nums) {
  let n = nums.length, allUsed = (1 << n) - 1;
  let memo = new Map(), res = 0, used = new Set();
  for (let i = 0; i < n; i++) {
    if (used.has(nums[i])) continue;
    res += dp(1 << i, nums[i]);
    used.add(nums[i]);
  }
  return res;
  
  function dp(mask, prevNum) {
    if (mask === allUsed) return 1;
    let key = `${mask},${prevNum}`;
    if (memo.has(key)) return memo.get(key);
    
    let ans = 0, used = new Set();
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue; // have already used nums[i]
      if (used.has(nums[i])) continue; // already used this number 
      if (!isPerfectSquare(prevNum + nums[i])) continue; 
      let newMask = mask | (1 << i);
      ans += dp(newMask, nums[i]);
      used.add(nums[i]);
    }
    memo.set(key, ans);
    return ans;
  }
};

// Two test cases
console.log(numSquarefulPerms([1,17,8])) // 2
console.log(numSquarefulPerms([2,2,2])) // 1