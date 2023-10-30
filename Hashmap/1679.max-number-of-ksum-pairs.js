// 1679. Max Number of K-Sum Pairs
// You are given an integer array nums and an integer k.
// In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.
// Return the maximum number of operations you can perform on the array.


// Solution 1: Sorting & Two Pointers

// 1. Sort nums
// 2. Use two pointers to get the count of pairs.
  // Start at the start and end of nums.
  // If the sum < k, move the left pointer up.
  // If the sum > k, move the right pointer down.
  // If the sum === k, add to the count and move the left pointer up and right pointer down.

// Time Complexity: O(n log(n)) 274ms
// Space Complexity: O(log(n)) (space for sorting) 52.9MB
var maxOperations = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, ans = 0;
  let i = 0, j = n - 1;
  while (i < j) {
    let sum = nums[i] + nums[j];
    if (sum < k) i++;
    else if (sum > k) j--;
    else {
      ans++;
      i++, j--;
    }
  }
  return ans;
};


// Solution 2: Hashmap

// Keep the occurances of each number in a hashmap.
// When we find a complement number (k - num), subtract 1 from the count of k - num.
// Otherwise, add 1 to the count of num.

// Time Complexity: O(n) 121ms
// Space Complexity: O(n) 56.5MB
var maxOperations = function(nums, k) {
  let map = new Map(), count = 0;
  for (let num of nums) {
    if (map.has(k - num) && map.get(k - num) > 0) {
      count++;
      map.set(k - num, map.get(k - num) - 1);
    } else {
      map.set(num, (map.get(num) || 0) + 1);
    }
  }
  return count;
};

// Two test cases
console.log(maxOperations([1,2,3,4], 5)) // 2
console.log(maxOperations([3,1,3,4,3], 6)) // 1