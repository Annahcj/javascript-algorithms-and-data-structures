// 1630. Arithmetic Subarrays
// A sequence of numbers is called arithmetic if it consists of at least two elements, and the difference between every two consecutive elements is the same. More formally, a sequence s is arithmetic if and only if s[i+1] - s[i] == s[1] - s[0] for all valid i.
// For example, these are arithmetic sequences:
  // 1, 3, 5, 7, 9
  // 7, 7, 7, 7
  // 3, -1, -5, -9
// The following sequence is not arithmetic:
  // 1, 1, 2, 5, 7
// You are given an array of n integers, nums, and two arrays of m integers each, l and r, representing the m range queries, where the ith query is the range [l[i], r[i]]. All the arrays are 0-indexed.
// Return a list of boolean elements answer, where answer[i] is true if the subarray nums[l[i]], nums[l[i]+1], ... , nums[r[i]] can be rearranged to form an arithmetic sequence, and false otherwise.


// Solution 1: Brute Force w/ Sorting

// For each query, 
  // 1. Get the subarray in range (l, r).
  // 2. Sort the subarray.
  // 3. Check whether the difference between each pair of adjacent elements are the same.

// n = length of nums, m = number of queries
// Time Complexity: O(m * n log(n)) 122ms
// Space Complexity: O(n) 49.6MB
var checkArithmeticSubarrays = function(nums, l, r) {
  let m = l.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [left, right] = [l[i], r[i]];
    let seq = [];
    for (let j = left; j <= right; j++) {
      seq.push(nums[j]);
    }
    seq.sort((a, b) => a - b);
    let diff = seq[1] - seq[0], isArithmetic = true;
    for (let j = 2; j < seq.length; j++) {
      if (seq[j] - seq[j - 1] !== diff) {
        isArithmetic = false;
        break;
      }
    }
    ans[i] = isArithmetic;
  }
  return ans;
};


// Solution 2: Brute Force w/ Hashset

// For each query, 
  // 1. Get a hashset of numbers in range (l, r), and recording the minimum and maximum in the subarray.
  // 2. The difference between each pair of adjacent elements = (max - min) / (r - l).
  // 3. Enumerate each element that's meant to be in the subarray, starting from min and going up by the adjacent diff. Check that each element exists in the hashset.

// n = length of nums, m = number of queries
// Time Complexity: O(mn) 104ms
// Space Complexity: O(n) 48.1MB
var checkArithmeticSubarrays = function(nums, l, r) {
  let m = l.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [left, right] = [l[i], r[i]];
    let hashset = new Set(), min = nums[left], max = nums[right];
    for (let j = left; j <= right; j++) {
      hashset.add(nums[j]);
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
    }
    let adjacentDiff = (max - min) / (right - left);
    if (adjacentDiff === 0) {
      ans[i] = true;
      continue;
    }
    let isArithmetic = true;
    for (let num = min; num <= max; num += adjacentDiff) {
      if (!hashset.has(num)) {
        isArithmetic = false;
        break;
      }
    }
    ans[i] = isArithmetic;
  }
  return ans;
};

// Two test cases
console.log(checkArithmeticSubarrays([4,6,5,9,3,7], [0,0,2], [2,3,5])) // [true,false,true]
console.log(checkArithmeticSubarrays([-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], [0,1,6,4,8,7], [4,4,9,7,9,10])) // [false,true,false,false,true,true]