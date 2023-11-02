// 2470. Number of Subarrays With LCM Equal to K
// Given an integer array nums and an integer k, return the number of subarrays of nums where the least common multiple of the subarray's elements is k.
// A subarray is a contiguous non-empty sequence of elements within an array.
// The least common multiple of an array is the smallest positive integer that is divisible by all the array elements.


// Solution: Count Subarrays Ending at Index i

// Consider the valid subarrays of nums (split by invalid numbers (lcm(nums[i], k) !== k)).
// For nums[i] to be part of a valid subarray, lcm(nums[i], k) must be k.

// Store the index of the last occurance of K within the current subarray.
// Count the number of subarrays ending at each nums[i], where nums[i] is part of a valid subarray.
  // However, at least one K must be part of the subarray.
  // So, subtract counts of subarrays that don't have an occurance of K (i - lastK).

// Time Complexity: O(n log(n)) 89ms
  // O(log(n)) to find lcm for each nums[i]
// Space Complexity: O(1) 42.4MB
var subarrayLCM = function(nums, k) {
  let ans = 0, n = nums.length, count = 0, lastK = -1;
  for (let i = 0; i < n; i++) {
    if (nums[i] === k) lastK = i; // record last index of a K
    if (lcm(nums[i], k) !== k) { // invalid num, can't be part of subarray
      lastK = -1;
      count = 0;
    } else {
      count++;
    }

    if (lastK !== -1) {
      ans += count - (i - lastK); // add subarrays ending at index i, subtract subarrays with no K
    }
  }  
  return ans;
};

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases
console.log(subarrayLCM([3,6,2,7,1], 6)) // 4
console.log(subarrayLCM([3], 2)) // 0