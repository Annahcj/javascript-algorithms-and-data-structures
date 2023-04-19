// 2640. Find the Score of All Prefixes of an Array
// We define the conversion array conver of an array arr as follows:
  // conver[i] = arr[i] + max(arr[0..i]) where max(arr[0..i]) is the maximum value of arr[j] over 0 <= j <= i.
// We also define the score of an array arr as the sum of the values of the conversion array of arr.
// Given a 0-indexed integer array nums of length n, return an array ans of length n where ans[i] is the score of the prefix nums[0..i].


// Solution: Prefix Sum

// Keep track of:
  // the maximum nums[i] so far
  // the current sum of each nums[i] + max

// Time Complexity: O(n) 188ms
// Space Complexity: O(1) (not including output) 67.3MB
var findPrefixScore = function(nums) {
  let n = nums.length, ans = Array(n);
  let max = 0, pSum = 0;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, nums[i]);
    pSum += nums[i] + max;
    ans[i] = pSum;
  }
  return ans;
};

// Two test cases
console.log(findPrefixScore([2,3,7,5,10])) // [4,10,24,36,56]
console.log(findPrefixScore([1,1,2,4,8,16])) // [2,4,8,16,32,64]