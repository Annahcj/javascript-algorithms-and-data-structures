// 1814. Count Nice Pairs in an Array
// You are given an array nums that consists of non-negative integers. Let us define rev(x) as the reverse of the non-negative integer x. For example, rev(123) = 321, and rev(120) = 21. A pair of indices (i, j) is nice if it satisfies all of the following conditions:
  // 0 <= i < j < nums.length
  // nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
// Return the number of nice pairs of indices. Since that number can be too large, return it modulo 10^9 + 7.


// Solution: Hashmap for nums[i] - rev(nums[i])

// For two numbers nums[i] and nums[j] to match the condition, 
// the difference between nums[i] and rev(nums[i]) must be equal to the difference between nums[j] and rev(nums[j]).
// This is because we are cross-pairing the numbers, so the difference must be the same.

// Use a two-sum like approach using a hashmap.

// l = average length of each number
// Time Complexity: O(n log(l)) 164ms
// Space Complexity: O(n) 51.5MB
var countNicePairs = function(nums) {
  let map = new Map(), ans = 0, mod = 10 ** 9 + 7;
  for (let num of nums) {
    let diff = num - rev(num);
    ans = (ans + (map.get(diff) || 0)) % mod;
    map.set(diff, (map.get(diff) || 0) + 1);
  }
  return ans;
  
  function rev(num) {
    let ans = 0;
    while (num > 0) {
      let digit = num % 10;
      ans = ans * 10 + digit;
      num = Math.floor(num / 10);
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(countNicePairs([42,11,1,97])) // 2
console.log(countNicePairs([13,10,35,24,76])) // 4