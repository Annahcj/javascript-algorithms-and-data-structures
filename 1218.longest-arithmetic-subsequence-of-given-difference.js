// 1218. Longest Arithmetic Subsequence of Given Difference
// Given an integer array arr and an integer difference, return the length of the longest subsequence in arr which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals difference.
// A subsequence is a sequence that can be derived from arr by deleting some or no elements without changing the order of the remaining elements.


// Solution: DP w/ Hashmap

// Use a hashmap 'dp' to keep track of the longest arithmetic subsequence ending with nums[i].

// Time Complexity: O(n) 125ms
// Space Complexity: O(n) 52.8MB
var longestSubsequence = function(arr, difference) {
  let dp = new Map(), ans = 0;
  for (let num of arr) {
    // get the prev ending number
    let prevEnd = num - difference, len = (dp.get(prevEnd) || 0) + 1; 
    dp.set(num, len);
    ans = Math.max(ans, len);
  }
  return ans;
};

// Three test cases to run function on
console.log(longestSubsequence([1,2,3,4], 1)) // 4
console.log(longestSubsequence([1,3,5,7], 1)) // 1
console.log(longestSubsequence([1,5,7,8,5,3,4,2,1], -2)) // 4