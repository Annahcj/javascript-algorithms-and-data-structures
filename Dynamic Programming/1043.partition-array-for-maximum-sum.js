// 1043. Partition Array for Maximum Sum
// Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray.
// Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.


// Solution: Recursion w/ Memoization

// memo[i] = maximum sum between [i, ..., arr.length] 

// Time Complexity: O(nk) 84ms
// Space Complexity: O(n) 40.1MB
var maxSumAfterPartitioning = function(arr, k) {
  let n = arr.length, memo = Array(n);
  return dfs(0);
  
  function dfs(start) {
    if (start === arr.length) return 0;
    if (memo[start] !== undefined) return memo[start];
    
    let max = 0, ans = 0;
    for (let i = start; i < Math.min(start + k, n); i++) { // try out all window sizes from 1 to k
      max = Math.max(max, arr[i]); 
      let len = i - start + 1, sum = max * len; // len = window size, sum is the sum of the new values
      ans = Math.max(ans, sum + dfs(i + 1));
    }
    return memo[start] = ans;
  }  
};

// Three test cases 
console.log(maxSumAfterPartitioning([1,15,7,9,2,5,10], 3)) // 84
console.log(maxSumAfterPartitioning([1,4,1,5,7,3,6,1,9,9,3], 4)) // 83
console.log(maxSumAfterPartitioning([1], 1)) // 1