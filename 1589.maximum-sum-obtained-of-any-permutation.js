// 1589. Maximum Sum Obtained of Any Permutation
// We have an array of integers, nums, and an array of requests where requests[i] = [starti, endi]. The ith request asks for the sum of nums[starti] + nums[starti + 1] + ... + nums[endi - 1] + nums[endi]. Both starti and endi are 0-indexed.
// Return the maximum total sum of all requests among all permutations of nums.
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Line Sweep w/ Prefix Sum

// 1. Count the number of requests for each index in nums using line sweep and prefix sum.
// 2. Filter out the indexes with at least 1 request and sort them in desc order based on the number of requests.
// 3. Sort nums in desc order.
// 4. Assign each number (from largest to smallest) to the sorted indexes.

// n = length of nums, m = number of requests
// Time Complexity: O(n log(n) + m) 609ms
// Space Complexity: O(n) 80.8MB
var maxSumRangeQuery = function(nums, requests) {
  let n = nums.length, sum = Array(n).fill(0);
  for (let [start, end] of requests) {
    sum[start]++;
    sum[end + 1]--;
  }
  for (let i = 1; i < n; i++) {
    sum[i] += sum[i - 1];
  }

  let indexes = sum.filter((num) => num > 0).sort((a, b) => b - a);
  nums.sort((a, b) => b - a);
  let ans = 0, MOD = 10 ** 9 + 7;
  for (let i = 0, j = 0; i < indexes.length; i++) {
    ans = (ans + indexes[i] * nums[j]) % MOD;
    j++;
  }
  return ans;
};

// Three test cases to run function on
console.log(maxSumRangeQuery([1,2,3,4,5], [[1,3],[0,1]])) // 19
console.log(maxSumRangeQuery([1,2,3,4,5,6], [[0,1]])) // 11
console.log(maxSumRangeQuery([1,2,3,4,5,10], [[0,2],[1,3],[1,1]])) // 47