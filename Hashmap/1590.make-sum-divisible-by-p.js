// 1590. Make Sum Divisible by P
// Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.
// Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.
// A subarray is defined as a contiguous block of elements in the array.


// Solution: Hashmap & Prefix Sum

// We need to find the shortest subarray with subarray sum % p === totalSum % p
// If we remove a subarray with subarray sum % p === totalSum % p, the remaining sum will be divisible by p.
// Store the latest index for a sum's mod value.
// To get the compliment of a sum,
  // Look for (mod + p - target) % p
    // mod - target -> get the mod we need for the current subarray to have mod equal to target.
    // +p -> avoid going into negative values

// Time Complexity: O(n) 216ms
// Space Complexity: O(n) 64.1MB
var minSubarray = function(nums, p) {
  let totalSum = nums.reduce((acc, num) => acc + num, 0);
  let target = totalSum % p;
  if (target === 0) return 0;
  let map = new Map(), n = nums.length;
  let ans = Infinity, sum = 0;
  map.set(0, -1);
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    let mod = sum % p, compliment = (mod + p - target) % p; // get the inverse mod value
    if (map.has(compliment)) {
      ans = Math.min(ans, i - map.get(compliment));
    }
    map.set(mod, i);
  }
  return ans >= n ? -1 : ans;
};

// Two test cases
console.log(minSubarray([3,1,4,2], 6)) // 1
console.log(minSubarray([4,4,2], 7)) // -1